import { prisma_db } from './db';
import { getSelfUser } from './auth-service';
import { User } from '@prisma/client';

export const isBlockedByUser = async (id: string, selfUser?: User) => {
    try {
        const self = selfUser ?? (await getSelfUser());

        const blockerUser = await prisma_db.user.findUnique({
            where: { id },
        });

        if (!blockerUser) throw new Error('User not Found');

        if (blockerUser.id === self.id) return false;

        const existingBlock = await prisma_db.block.findUnique({
            where: {
                // blockerId_blockedId se genera por el @@unique([]) en el model de prisma
                blockerId_blockedId: {
                    blockerId: blockerUser.id,
                    blockedId: self.id,
                },
            },
        });

        return !!existingBlock;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const blockUser = async (id: string, selfUser?: User) => {
    const self = selfUser ?? (await getSelfUser());

    if (self.id === id) throw new Error('Cannot block yourself');

    const user_ToBlock = await prisma_db.user.findUnique({
        where: { id },
    });

    if (!user_ToBlock) throw new Error('User not found!');

    const existingBlock = await prisma_db.block.findUnique({
        where: {
            // blockerId_blockedId se genera por el @@unique([]) en el model de prisma
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: user_ToBlock.id,
            },
        },
    });

    if (existingBlock) throw new Error('User Already blocked');

    const blockUser = await prisma_db.block.create({
        data: {
            blockerId: self.id,
            blockedId: user_ToBlock.id,
        },
        include: { blocked: true },
    });

    return blockUser;
};

export const unBlockUser = async (id: string, selfUser?: User) => {
    const self = selfUser ?? (await getSelfUser());

    if (self.id === id) throw new Error('Cannot unblock yourself');

    const user_to_unBlock = await prisma_db.user.findUnique({
        where: { id },
    });

    if (!user_to_unBlock) throw new Error('User not found!');

    const existingBlock = await prisma_db.block.findUnique({
        where: {
            // blockerId_blockedId se genera por el @@unique([]) en el model de prisma
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: user_to_unBlock.id,
            },
        },
    });

    if (!existingBlock) throw new Error('User Is not blocked yet');

    const unBlockUser = await prisma_db.block.delete({
        where: {
            id: existingBlock.id,
        },
        include: { blocked: true },
    });

    return unBlockUser;
};
