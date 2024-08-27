'use client';

import { onBlock, onUnBlock } from '@/actions/block';
import { onFollow, onUnFollow } from '@/actions/follow';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/button';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

type ActionsProps = {
    userId: string;
    isFollowing: boolean;
    userIsBlocked: boolean;
};

export const Actions = ({ userId, isFollowing, userIsBlocked }: ActionsProps) => {
    const [isFollowingPending, starFollowTransition] = useTransition();
    const [isBlockingPendig, startBlockTransition] = useTransition();

    const handleFollow = () => {
        starFollowTransition(async () => {
            try {
                const followedUser = await onFollow(userId);
                toast(`You are now following ${followedUser.following.username}`);
            } catch (error) {
                toast.error((error as Error).message);
            }
        });
    };
    const handleUnFollow = () => {
        starFollowTransition(async () => {
            try {
                const unFollowedUser = await onUnFollow(userId);
                toast(`You unfollow ${unFollowedUser.following.username}`);
            } catch (error) {
                toast.error((error as Error).message);
            }
        });
    };

    const handleBlock = () => {
        startBlockTransition(async () => {
            try {
                const blockedUser = await onBlock(userId);
                toast(`You block user ${blockedUser.blocked.username}`);
            } catch (error) {
                toast.error((error as Error).message);
            }
        });
    };

    const handleUnBlock = () => {
        startBlockTransition(async () => {
            try {
                const blockedUser = await onUnBlock(userId);
                toast(`You unblock user ${blockedUser.blocked.username}`);
            } catch (error) {
                toast.error((error as Error).message);
            }
        });
    };

    return (
        <>
            <Button disabled={isFollowingPending} variant={'primary'} onClick={isFollowing ? handleUnFollow : handleFollow} className=''>
                {isFollowingPending ? <Loader /> : isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
            <Button onClick={userIsBlocked ? handleUnBlock : handleBlock} disabled={isBlockingPendig} variant={'destructive'}>
                {isBlockingPendig ? <Loader /> : userIsBlocked ? 'Unblock' : 'Block'}
            </Button>
        </>
    );
};
