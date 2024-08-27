'use client';

import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { updateStream } from '@/actions/stream';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

type ToggleCardProps = {
    label: string;
    value: boolean;
    field: FieldTypes;
};

export const ToggleCard = ({ field, label, value = false }: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition();

    const onChange = () => {
        startTransition(async () => {
            try {
                await updateStream({ [field]: !value });
                toast('Chat settings updated');
            } catch (error) {
                toast.error((error as Error).message);
            }
        });
    };

    return (
        <div className='rounded-xl bg-muted p-6'>
            <div className='flex items-center justify-between gap-4 md:flex-row flex-col'>
                <p className='font-semibold shrink-0 text-center'>{label}</p>
                <div className={cn('flex items-center gap-2', isPending && 'mr-[calc(24px_+_8px)] md:mr-0')}>
                    <>
                        {isPending && <Loader className='animate-spin [animation-duration:_8s]' />}
                        <Switch onCheckedChange={onChange} disabled={isPending} checked={value} title={value ? 'On' : 'Off'}>
                            {value ? 'On' : 'Off'}
                        </Switch>
                    </>
                </div>
            </div>
        </div>
    );
};

export const ToggleCardSkeleton = () => {
    return <Skeleton className='rounded-xl p-10 w-full' />;
};
