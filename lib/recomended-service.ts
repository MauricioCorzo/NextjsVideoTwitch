import { prisma_db } from '@/lib/db';

import { getSelfUser } from '@/lib/auth-service';

export const getRecommended = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 155000));
    let userId;
    try {
        const self = await getSelfUser();
        userId = self.id;
    } catch (error) {
        console.log(error);
        userId = null;
    }

    let users = [];

    if (userId) {
        // Recomend users
        users = await prisma_db.user.findMany({
            where: {
                AND: [
                    {
                        // Not Recomend yourself
                        NOT: {
                            id: userId,
                        },
                    },
                    {
                        NOT: {
                            // No Recomendar usuarios que en sus seguidores este mi id
                            followedBy: {
                                some: {
                                    followerId: userId,
                                },
                            },
                        },
                    },
                    {
                        NOT: {
                            // No Recomendar usuarios que en sus blockeados este mi id
                            blocking: {
                                some: {
                                    blockedId: userId,
                                },
                            },
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    } else {
        users = await prisma_db.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    return users;
};
