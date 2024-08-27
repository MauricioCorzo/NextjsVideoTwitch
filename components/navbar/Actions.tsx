'use client';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { ClapperboardIcon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Actions = ({ selfUser }: { selfUser: User | null }) => {
    const pathname = usePathname();

    const isUserDashboard = pathname.startsWith('/you');
    return (
        <>
            <div className='flex items-center gap-2 lg:ml-0'>
                {!selfUser ? (
                    <SignInButton>
                        <Button variant={'primary'}>LogIn</Button>
                    </SignInButton>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Button title='Dashboard' asChild size={'sm'} variant={'ghost'} className='text-muted-foreground hover:text-primary'>
                            {!isUserDashboard ? (
                                <Link href={`/you/${selfUser.username}`}>
                                    <ClapperboardIcon className='w-5 lg:mr-2' /> <span className='hidden lg:block'>Dashboard</span>
                                </Link>
                            ) : (
                                <Link href={'/'}>
                                    <LogOut className='w-5 lg:mr-2' /> <span className='hidden lg:block'>Exit</span>
                                </Link>
                            )}
                        </Button>
                        <UserButton afterSignOutUrl='/sign-in' />
                    </div>
                )}
            </div>
        </>
    );
};
