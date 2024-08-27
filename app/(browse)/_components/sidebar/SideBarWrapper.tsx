'use client';
import { useSideBarStore } from '@/store/usesidebar';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SideWrapperProps = {
    children: ReactNode;
};

export const SideBarWrapper = ({ children }: SideWrapperProps) => {
    const { collapsed } = useSideBarStore((state) => state);

    return (
        <aside
            className={cn(
                `fixed left-0 grid grid-cols-1 content-start  h-full bg-background [box-shadow:4px_0px_3px_0px_var(--sidebar-border)] z-50 transition-all duration-200 ease-out`,
                collapsed ? 'w-[70px]' : 'w-[70px] lg:w-60'
            )}
        >
            {children}
        </aside>
    );
};
