// create a modal store to open and close task modals

import {create} from "zustand";

interface TaskModalState {
  isOpen: boolean;
  toggleOpen: () => void;
}

const useTaskModalStore = create<TaskModalState>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useTaskModalStore;
