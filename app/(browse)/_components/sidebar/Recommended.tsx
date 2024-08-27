'use client';
import { useSideBarStore } from '@/store/usesidebar';
import { type User } from '@prisma/client';
import { UserItem, UserItemSkeleton } from './UserItem';
import { usePathname } from 'next/navigation';

// User type viene de prisma al hacer npx prisma generate que crea los tipos de acuerdo al schema que creamos
type RecommendedProps = {
    data: User[];
};

export const Recommended = ({ data }: RecommendedProps) => {
    const { collapsed } = useSideBarStore((state) => state);

    const showLabel = !collapsed && data.length > 0;

    const pathname = usePathname();

    return (
        <div>
            {showLabel && (
                <div className='pl-6 pb-4 hidden lg:block'>
                    <p className='text-muted-foreground text-sm'>Recommended</p>
                </div>
            )}
            <ul className='space-y-2 px-2'>
                {data.map((user) => (
                    <UserItem key={user.id} user={user} isLive={false} pathname={pathname} />
                ))}
            </ul>
        </div>
    );
};

export const RecommendedSkeleton = () => {
    return (
        <ul className='px-2'>
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    );
};
