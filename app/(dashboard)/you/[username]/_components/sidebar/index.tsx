import { CreatorSideWrapper } from './CreatorSideBarWrapper';
import { Navigation } from './Navigation';
import { Toggle } from './Toggle';

export const SideBar = () => {
    return (
        <CreatorSideWrapper>
            <Toggle />
            <Navigation />
        </CreatorSideWrapper>
    );
};
