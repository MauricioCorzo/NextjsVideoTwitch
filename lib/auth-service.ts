import { currentUser } from '@clerk/nextjs';
import { prisma_db } from '@/lib/db';

export const getSelfUser = async () => {
    const selfUser = await currentUser();

    if (!selfUser || !selfUser.username) {
        throw new Error('Unauthorized! Please Login');
    }

    const user = await prisma_db.user.findUnique({
        where: {
            externalUserId: selfUser.id,
        },
    });

    if (!user) {
        throw new Error('Not Found');
    }

    return user;
};

export const getSelfByUsername = async (username: string) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const self = await currentUser();

    if (!self || !self.username) throw new Error('Unauthorized');

    const user = await prisma_db.user.findUnique({
        where: { username },
    });

    if (!user) throw new Error('User not Found!');

    if (self.username !== user.username) throw new Error('Unauthorized');

    return user;
};
