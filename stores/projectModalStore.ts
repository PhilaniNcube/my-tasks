// create a modal store to open and close task modals

import {create} from "zustand";

interface ProjectModalState {
  isOpen: boolean;
  toggleOpen: () => void;
}

const useProjectModalStore = create<ProjectModalState>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useProjectModalStore;
