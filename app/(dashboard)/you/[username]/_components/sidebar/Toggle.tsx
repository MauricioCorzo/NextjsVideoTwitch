'use client';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useCreatorSideBarStore } from '@/store/use-creator-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

export const Toggle = () => {
    const { collapsed, onExpand, onCollapse } = useCreatorSideBarStore((state) => state);

    const label = collapsed ? 'Expand' : 'Collapse';
    return (
        <>
            {!collapsed ? (
                <div className='hidden lg:flex p-3 pl-6 mb-2 items-center w-full'>
                    <p className='font-semibold text-primary'>For you</p>
                    <Hint label={label} side='right' asChild className='ml-2'>
                        <Button onClick={onCollapse} variant={'ghost'} className='p-2 ml-auto' title={label}>
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
