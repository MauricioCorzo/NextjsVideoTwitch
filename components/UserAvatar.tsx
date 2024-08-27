import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LiveBadge } from './LiveBadge';

const avatarSizes = cva('', {
    variants: {
        size: {
            default: 'w-8 h-8',
            lg: 'w-12 h-12',
            xl: 'w-16 h-16',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

type UserAvatarProps = {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
    collapsed?: boolean;
} & VariantProps<typeof avatarSizes>;

export const UserAvatar = ({ username, imageUrl, isLive, showBadge, size, collapsed }: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;

    return (
        <div className='relative'>
            <Avatar className={cn(isLive && 'outline outline-2 outline-rose-500 outline-offset-2', avatarSizes({ size }))}>
                <AvatarImage src={imageUrl} className='object-cover' />
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className={cn('absolute -bottom-3 left-1/2 transform -translate-x-1/2', collapsed ? 'block' : 'lg:hidden block')}>
                    <LiveBadge />
                </div>
            )}
        </div>
    );
};

type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes>;

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return (
        <>
            <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />
        </>
    );
};
