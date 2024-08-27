import { User } from '@prisma/client';
import { Actions } from './Actions';
import { NavBarLogo } from './NavBarLogo';
import { SearchInput } from './Search';

export const NavBar = ({ selfUser }: { selfUser: User | null }) => {
    return (
        <nav className='sticky top-0 w-full sm:h-[calc(4rem_+_2rem)] z-[70] bg-[var(--navbar-bg-primary)] px-2 lg:px-4 py-4 flex sm:flex-row flex-col justify-between  gap-4 shadow-sm'>
            <div className='flex justify-between items-center flex-grow gap-4'>
                <NavBarLogo />
                <div className='sm:block hidden flex-grow'>
                    <SearchInput />
                </div>
                <Actions selfUser={selfUser} />
            </div>
            <div className='sm:hidden block flex-grow'>
                <SearchInput />
            </div>
        </nav>
    );
};
