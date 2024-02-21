import { Database } from "@/schema";
import {create} from "zustand";

type TaskStatus = "Pending" | "In Progress" | "Completed" | "Cancelled";

export type Task = Database["public"]["Tables"]["tasks"]["Row"];

export type TaskState = {
  tasks: Task[];
}

export type Actions = {
  // addTask: (title:string, description:string) => void;
  updateTaskStatus: (task_id: number, status: TaskStatus) => void;
  updateTask: (task: Task) => void;
  removeTask: (id: number) => void;
};

export const useTaskStore = create<TaskState & Actions>()((set) => ({
tasks: [],
updateTaskStatus: (task_id, status) => set((state) => ({tasks: state.tasks.map((task) => task.id === task_id ? {...task, status} : task)})),
updateTask: (task) => set((state) => ({tasks: state.tasks.map((t) => t.id === task.id ? task : t)})),
removeTask: (id) => set((state) => ({tasks: state.tasks.filter((task) => task.id !== id)}))
}))
