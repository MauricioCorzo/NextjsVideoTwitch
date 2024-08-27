'use client';
import { cn } from '@/lib/utils';
import { useCreatorSideBarStore } from '@/store/use-creator-sidebar';
import React, { ReactNode } from 'react';

type ContainerProps = {
    children: ReactNode;
};

// El calc + 8px en margin left es por el box-shadow del SideBar

export const Container = ({ children }: ContainerProps) => {
    const { collapsed } = useCreatorSideBarStore((state) => state);
    return (
        <div
            className={cn(
                'flex-1 transition-all duration-200 ease-out col-start-2',
                collapsed ? 'ml-[calc(70px_+_8px)]' : 'ml-[calc(70px_+_8px)] lg:ml-[calc(15rem_+_8px)]'
            )}
        >
            {children}
        </div>
    );
};
