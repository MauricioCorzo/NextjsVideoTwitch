import { prisma_db } from './db';
import { getSelfUser } from './auth-service';
import { User } from '@prisma/client';

export const getFollowedUsers = async () => {
    try {
        const self = await getSelfUser();

        const users_IFollow = await prisma_db.follow.findMany({
            where: {
                followerId: self.id,

                // Buscamos en la tabla follow la relacion following - User y en ese User la columna relacion User - blocking
                // y que en ese blocking NO este en la columna blockedId, mi Id. Entonces en mi lista de seguidos no me aparece el que me bloqueó
                // aunque ya lo haya estado siguiendo antes de que me bloqueé
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id,
                        },
                    },
                },
            },
            include: { following: true },
        });
        return users_IFollow;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const isFollowingUser = async (id: string, selfUser?: User) => {
    try {
        const self = selfUser ?? (await getSelfUser());

        const searchedUser = await prisma_db.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!searchedUser) {
            throw new Error('User not found');
        }

        if (searchedUser.id === self.id) {
            return true;
        }

        const existingFollow = await prisma_db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: self.id,
                    followingId: searchedUser.id,
                },
            },
        });

        return !!existingFollow;
    } catch (error) {
        return false;
    }
};

export const followUserAction = async (id: string) => {
    const self = await getSelfUser();

    const searchedUser = await prisma_db.user.findUnique({
        where: { id },
    });

    if (!searchedUser) {
        throw new Error('User not found');
    }

    if (searchedUser.id === self.id) {
        throw new Error('Cannot follow yourself');
    }

    const existingFollow = await prisma_db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: searchedUser.id,
        },
    });

    if (existingFollow) {
        throw new Error('Already following this User');
    }

    const follow = await prisma_db.follow.create({
        data: {
            followerId: self.id,
            followingId: searchedUser.id,
        },
        include: { follower: true, following: true },
    });

    return follow;
};

export const unFollowUserAction = async (id: string) => {
    const self = await getSelfUser();

    const searchedUser = await prisma_db.user.findUnique({
        where: { id },
    });

    if (!searchedUser) {
        throw new Error('User not found');
    }

    if (searchedUser.id === self.id) {
        throw new Error('Cannot unFollow yourself');
    }

    const existingFollow = await prisma_db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: searchedUser.id,
        },
    });

    if (!existingFollow) {
        throw new Error('Not following this User');
    }

    const follow = await prisma_db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: { following: true },
    });

    return follow;
};
