import { Database } from "@/schema";
import {create} from "zustand";

export type ProjectsState = {
  projects: Database["public"]["Tables"]["projects"]["Row"][],
  selectedProject: Database["public"]["Tables"]["projects"]["Row"] | null
}

export type Actions = {
  setSelectedProject: (project: Database["public"]["Tables"]["projects"]["Row"]) => void;
}

export const useProjectsStore = create<ProjectsState & Actions>()((set) => ({

  projects: [],
  selectedProject: null,
  setSelectedProject: (project) => set({selectedProject: project})
}))
