'use server';

import { followUserAction, unFollowUserAction } from '@/lib/follow-service';
import { revalidatePath } from 'next/cache';

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUserAction(id);

        revalidatePath('/');

        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }
        return followedUser;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const onUnFollow = async (id: string) => {
    try {
        const unFollowedUser = await unFollowUserAction(id);

        revalidatePath('/');

        if (unFollowedUser) {
            revalidatePath(`/${unFollowedUser.following.username}`);
        }
        return unFollowedUser;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
