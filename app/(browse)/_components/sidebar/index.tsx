import { getRecommended } from '@/lib/recomended-service';
import { Recommended, RecommendedSkeleton } from './Recommended';
import { SideBarWrapper } from './SideBarWrapper';
import { Toggle, ToggleSkeleton } from './Toggle';
import { getFollowedUsers } from '@/lib/follow-service';
import { Following, FollowingSkeleton } from './Following';

export const SideBar = async () => {
    const recommended = await getRecommended();
    const users_IFollow = await getFollowedUsers();

    return (
        <SideBarWrapper>
            <Toggle />
            <div className='space-y-4 pt-4 lg:pt-0'>
                <Following data={users_IFollow} />
                <Recommended data={recommended} />
            </div>
        </SideBarWrapper>
    );
};

export const SideBarSkeleton = () => {
    return (
        <aside className='fixed left-0 grid grid-cols-1 content-start h-full w-[70px] lg:w-60 bg-background [box-shadow:4px_0px_3px_0px_var(--sidebar-border)] z-50 transition-all duration-200 ease-out'>
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </aside>
    );
};
