'use client';

import { Button } from '@/components/ui/button';
import { useSideBarStore } from '@/store/usesidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { Hint } from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';

export const Toggle = () => {
    const { collapsed, onCollapse, onExpand } = useSideBarStore((state) => state);

    const label = collapsed ? 'Expand' : 'Collapse';

    return (
        <>
            {!collapsed ? (
                <div className='hidden lg:flex p-3 pl-6 mb-2 items-center w-full'>
                    <p className='font-semibold text-primary'>For you</p>
                    <Hint label={label} side='right' asChild className='ml-2'>
                        <Button className='p-2 ml-auto' variant={'ghost'} onClick={onCollapse} title={label}>
                            <ArrowLeftFromLine className='w-4' />
                        </Button>
                    </Hint>
                </div>
            ) : (
                <div className='hidden lg:flex w-full items-center justify-center py-4'>
                    <Hint label={label} side='right' asChild className='ml-2'>
                        <Button onClick={onExpand} variant={'ghost'} className='p-2' title={label}>
                            <ArrowRightFromLine className='w-4' />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
};

export const ToggleSkeleton = () => {
    return (
        <div className='px-5 py-6 pl-6  hidden lg:flex items-center justify-between'>
            <Skeleton className='h-6 w-24' />
            <Skeleton className='h-6 w-6' />
        </div>
    );
};
