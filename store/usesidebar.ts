import { create } from 'zustand';

type SideBarStore = {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
};

export const useSideBarStore = create<SideBarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
}));
