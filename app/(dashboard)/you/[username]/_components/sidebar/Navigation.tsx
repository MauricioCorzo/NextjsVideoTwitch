'use client';

import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react';
import { NavItem } from './NavItem';
import { Skeleton } from '@/components/ui/skeleton';

export const Navigation = () => {
    const pathname = usePathname();

    const { isLoaded, user } = useUser();

    const routes = [
        {
            label: 'Stream',
            href: `/you/${user?.username}`,
            icon: Fullscreen,
        },
        {
            label: 'Keys',
            href: `/you/${user?.username}/keys`,
            icon: KeyRound,
        },
        {
            label: 'Chat',
            href: `/you/${user?.username}/chat`,
            icon: MessageSquare,
        },
        {
            label: 'Community',
            href: `/you/${user?.username}/community`,
            icon: Users,
        },
    ];

    if (!user?.username || !isLoaded) {
        return (
            <ul className='space-y-2'>
                {[...Array(4)].map((_, i) => (
                    <NavItemSkeleton key={i} />
                ))}
            </ul>
        );
    }

    return (
        <>
            <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
                {routes.map((route) => (
                    <NavItem key={route.href} route={route} isActive={pathname === route.href} />
                ))}
            </ul>
        </>
    );
};

export const NavItemSkeleton = () => {
    return (
        <li className='flex items-center gap-4 px-3 py-2'>
            <Skeleton className='min-w-12 min-h-12 rounded-md' />
            <div className='flex-1 hidden lg:block'>
                <Skeleton className='h-6' />
            </div>
        </li>
    );
};
