/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export const NavBarLogo = ({ subtitle }: { subtitle: string }) => {
    return (
        <Link href={'/'} className='pl-2'>
            <div className='flex items-center gap-4 hover:opacity-100 hover:brightness-110 opacity-90 transition'>
                <div
                    className='flex items-center rounded-full p-1 dark:bg-white bg-slate-50 outline-2
                    outline outline-offset-4 outline-[var(--ring)]'
                >
                    <img src='/spooky.svg' alt='Spooky Logo' className='w-7 sm:w-10 aspect-square' />
                </div>
                <div className='hidden lg:block'>
                    <p className='text-lg font-semibold'>GameHub</p>
                    <p className='text-sm text-muted-foreground'>{subtitle}</p>
                </div>
            </div>
        </Link>
    );
};
