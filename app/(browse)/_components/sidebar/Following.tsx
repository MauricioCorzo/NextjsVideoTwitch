'use client';

import { useSideBarStore } from '@/store/usesidebar';
import { Follow, User } from '@prisma/client';
import { UserItem, UserItemSkeleton } from './UserItem';
import { usePathname } from 'next/navigation';

type FollowingProps = {
    data: Array<Follow & { following: User }>;
};
export const Following = ({ data }: FollowingProps) => {
    const { collapsed } = useSideBarStore();
    const pathname = usePathname();

    if (data.length === 0) return null;

    return (
        <>
            <div>
                {!collapsed && (
                    <div className='pl-6 mb-4 lg:block hidden'>
                        <p className='text-muted-foreground text-sm'>Follwing</p>
                    </div>
                )}
                <ul className='space-y-2 px-2'>
                    {data.map((follow) => (
                        <UserItem key={follow.following.id} user={follow.following} pathname={pathname} isLive={true} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export const FollowingSkeleton = () => {
    return (
        <ul className='px-2'>
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    );
};
