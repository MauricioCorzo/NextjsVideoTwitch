'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCreatorSideBarStore } from '@/store/use-creator-sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type NavItemProps = {
    route: {
        label: string;
        href: string;
        icon: LucideIcon;
    };
    isActive: boolean;
};

export const NavItem = ({ route: { href, icon: Icon, label }, isActive }: NavItemProps) => {
    const { collapsed } = useCreatorSideBarStore((state) => state);
    return (
        <li>
            <Button
                asChild
                variant={'ghost'}
                className={cn('w-full h-12', collapsed ? 'justify-center' : 'lg:justify-start justify-center', isActive && 'bg-accent')}
            >
                <Link href={href}>
                    <div className='flex items-center gap-4'>
                        <Icon className={cn('w-4')} />
                        {!collapsed && <p className='truncate min-w-0 hidden lg:block'>{label}</p>}
                    </div>
                </Link>
            </Button>
        </li>
    );
};
