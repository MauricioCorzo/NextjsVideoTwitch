'use client';
import { cn } from '@/lib/utils';
import { useSideBarStore } from '@/store/usesidebar';
import React, { ReactNode } from 'react';

type ContainerProps = {
    children: ReactNode;
};

// El calc + 8px en margin left es por el box-shadow del SideBar

export const Container = ({ children }: ContainerProps) => {
    const { collapsed } = useSideBarStore((state) => state);

    return (
        <div
            className={cn(
                'flex-1 transition-all duration-200 ease-out',
                collapsed ? 'ml-[calc(70px_+_8px)]' : 'ml-[calc(70px_+_8px)] lg:ml-[calc(15rem_+_8px)]'
            )}
        >
            {children}
        </div>
    );
};
