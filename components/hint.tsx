import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

type HintProps = {
    label: string;
    children: ReactNode;
    asChild?: boolean;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    open?: boolean;
    className?: string;
};

export const Hint = ({ label, children, asChild, side, align, open, className }: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0} open={open}>
                <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
                <TooltipContent className={`text-black bg-white ${className}`} side={side} align={align}>
                    <p className='font-semibold'>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
