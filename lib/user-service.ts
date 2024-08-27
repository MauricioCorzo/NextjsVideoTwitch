import { prisma_db } from './db';

export const getUserByUserName = async (username: string) => {
    const user = await prisma_db.user.findUnique({
        where: {
            username: username,
        },
        include: { blockedBy: true },
    });

    return user;
};
