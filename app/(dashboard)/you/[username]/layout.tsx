import { NavBar } from '@/components/navbar';
import { getSelfByUsername } from '@/lib/auth-service';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { SideBar } from './_components/sidebar';
import { Container } from './_components/Container';

type CreatorLayoutProps = {
    params: { username: string };
    children: ReactNode;
};

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
    let self;
    try {
        self = await getSelfByUsername(params.username);
    } catch (error) {
        console.log(error);
        self = null;
    }

    if (!self) redirect('/');

    return (
        <>
            <NavBar selfUser={self} showSearchInput={false} subtitle='Creator Dashboard' />

            <div className='grid grid-cols-[auto_minmax(0,1fr)] h-full'>
                <SideBar />
                <Container>{children}</Container>
            </div>
        </>
    );
};

export default CreatorLayout;
