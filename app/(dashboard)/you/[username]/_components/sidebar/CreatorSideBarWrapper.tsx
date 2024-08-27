'use client';
import { cn } from '@/lib/utils';
import { useCreatorSideBarStore } from '@/store/use-creator-sidebar';
import { ReactNode } from 'react';

type CreatorSideWrapperProps = {
    children: ReactNode;
};

export const CreatorSideWrapper = ({ children }: CreatorSideWrapperProps) => {
    const { collapsed } = useCreatorSideBarStore((state) => state);
    return (
        <>
            <aside
                className={cn(
                    'fixed left-0 grid grid-cols-1 content-start h-full bg-background [box-shadow:4px_0px_3px_0px_var(--sidebar-border)] z-50 transition-all duration-200 ease-out]',
                    collapsed ? 'w-[70px]' : 'w-[70px] lg:w-60'
                )}
            >
                {children}
            </aside>
        </>
    );
};
