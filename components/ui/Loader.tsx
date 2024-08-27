/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
export const Loader = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center justify-center w-6 aspect-square', className)}>
            <img src='/assets/icons/loader.svg' alt='loader' />
        </div>
    );
};
