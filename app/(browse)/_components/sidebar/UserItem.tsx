'use client';

import { type User } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useSideBarStore } from '@/store/usesidebar';
import Link from 'next/link';
import { UserAvatar } from '@/components/UserAvatar';
import { LiveBadge } from '@/components/LiveBadge';
import { Skeleton } from '@/components/ui/skeleton';

type UserItemProps = {
    user: User;
    isLive?: boolean;
    pathname: string;
};

export const UserItem = ({ user, isLive, pathname }: UserItemProps) => {
    const { collapsed } = useSideBarStore((state) => state);

    const href = `/${user.username}`;
    const isActive = pathname === href;

    return (
        <>
            <li>
                <Button
                    asChild
                    variant={'ghost'}
                    className={cn(`w-full h-12`, collapsed ? 'justify-center' : 'justify-start', isActive && 'bg-accent')}
                >
                    <Link href={href}>
                        <div
                            className={cn(
                                'flex items-center w-full gap-4 lg:justify-start justify-center',
                                collapsed && 'lg:justify-center justify-center'
                            )}
                        >
                            <UserAvatar
                                imageUrl={user.imageUrl}
                                username={user.username}
                                isLive={isLive}
                                showBadge
                                size={'default'}
                                collapsed={collapsed}
                            />
                            {!collapsed && <p className='truncate min-w-0 hidden lg:block'>{user.username}</p>}
                            {!collapsed && isLive && <LiveBadge className='ml-auto lg:block hidden' />}
                        </div>
                    </Link>
                </Button>
            </li>
        </>
    );
};

export const UserItemSkeleton = () => {
    return (
        <li className='flex items-center gap-4 px-3 py-2'>
            <Skeleton className='min-h-[32px] min-w-[32px] rounded-full' />
            <div className='w-full'>
                <Skeleton className='h-6' />
            </div>
        </li>
    );
};
