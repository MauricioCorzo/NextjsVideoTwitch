/* eslint-disable @next/next/no-img-element */
import React from 'react';

export const Logo = () => {
    return (
        <div className='grid place-items-center gap-4'>
            <div
                className='flex items-center rounded-full p-1 dark:bg-white bg-slate-50 outline-2
            outline outline-offset-4 hover:outline-offset-8 outline-[var(--ring)] transition-all duration-300'
            >
                <img src='/spooky.svg' alt='Spooky Logo' className='w-20 aspect-square ' />
            </div>

            <div className='grid place-items-center'>
                <p className='text-xl font-semibold'>GameHub</p>
                <p className='text-sm text-muted-foreground'>Let&apos;s Play</p>
            </div>
        </div>
    );
};
