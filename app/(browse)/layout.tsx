import { ReactNode, Suspense } from 'react';
import { SideBar, SideBarSkeleton } from './_components/sidebar';
import { Container } from './_components/Container';
import { getSelfUser } from '@/lib/auth-service';
import { NavBar } from '@/components/navbar';

const BrowseLayout = async ({ children }: { children: ReactNode }) => {
    let self;
    try {
        self = await getSelfUser();
    } catch (error) {
        console.log(error);
        self = null;
    }

    return (
        <>
            <NavBar selfUser={self ?? null} subtitle="Let's Play" />
            <div className='flex h-full'>
                <Suspense fallback={<SideBarSkeleton />}>
                    <SideBar />
                </Suspense>
                <Container>{children}</Container>
            </div>
        </>
    );
};

export default BrowseLayout;
