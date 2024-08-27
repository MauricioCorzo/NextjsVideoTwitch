import React, { ReactNode, Suspense } from 'react';
import { Loader } from '@/components/ui/Loader';

export const SuspenseWithLoaderFallback = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense
            fallback={
                <div className='flex justify-center items-center w-full h-full'>
                    <Loader />
                </div>
            }
        >
            {children}
        </Suspense>
    );
};
