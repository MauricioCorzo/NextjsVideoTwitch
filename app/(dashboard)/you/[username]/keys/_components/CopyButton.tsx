'use client';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { CheckCheck, Copy } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
    value?: string;
}
export const CopyButton = ({ value }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const [label, setLabel] = useState('Copy');
    console.log(isCopied);

    const onCopy = () => {
        if (!value) return;

        setIsCopied(true);
        setLabel('¡Copied!');
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
        setTimeout(() => {
            setLabel('Copy');
            // setIsCopied 1000ms + Radix Tooltip exit animation duration
        }, 150);
    };

    const Icon = isCopied ? CheckCheck : Copy;

    return (
        <Hint asChild label={label} open={isCopied || undefined}>
            <Button onClick={onCopy} disabled={!value} variant={'ghost'} size={'sm'}>
                <Icon className='size-4 cursor-pointer' />
            </Button>
        </Hint>
    );
};
