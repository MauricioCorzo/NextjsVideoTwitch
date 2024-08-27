'use server';

import { blockUser, unBlockUser } from '@/lib/block-service';
import { revalidatePath } from 'next/cache';

export const onBlock = async (id: string) => {
    try {
        const blockedUser = await blockUser(id);

        if (blockedUser) {
            revalidatePath('/');
            revalidatePath(`/${blockedUser.blocked.username}`);
        }
        return blockedUser;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const onUnBlock = async (id: string) => {
    try {
        const unBlockedUser = await unBlockUser(id);

        if (unBlockedUser) {
            revalidatePath('/');
            revalidatePath(`/${unBlockedUser.blocked.username}`);
        }
        return unBlockedUser;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
