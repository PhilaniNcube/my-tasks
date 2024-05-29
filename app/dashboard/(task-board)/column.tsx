"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Database } from "@/schema";
import { Scroll } from "lucide-react";
import TaskCard from "./task-card";
import { useMemo } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";


type ColumnProps = {
	status: Database["public"]["Enums"]["Status"];
	tasks: Database["public"]["Tables"]["tasks"]["Row"][];
};

const Column = ({ status, tasks }: ColumnProps) => {

  const router = useRouter()

  //use the supabase client
  const supabase = createClient()

	const filteredTasks = useMemo(
		() => tasks.filter((task) => task.status === status),
		[tasks, status],
	);
  ;

  const updateTaskStatus = useTaskStore(state => state.updateTaskStatus)
  const draggedTask = useTaskStore(state => state.draggedTask)
  const dragTask = useTaskStore(state => state.dragTask)

  const handleDrop = async(e: React.DragEvent<HTMLDivElement>) => {
    const now = new Date().toUTCString();
    if(!draggedTask) return;
    updateTaskStatus(draggedTask, status);
    await supabase.from("tasks").update({status, updated_at:now}).eq("id", draggedTask)
    dragTask(null)
    router.refresh()
  }

	return (
		<div
			onDrop={handleDrop}
			onDragOver={(e) => e.preventDefault()}
			className="h-[calc(100vh-80px)] border-zinc-300 shadow-md rounded-sm px-2 py-3 border-2"
		>
			<h2 className="font-medium text-xl">{status}</h2>
			<Separator className="my-2" />
			<ScrollArea className="w-full h-[calc(100vh-150px)] overflow-hidden">
				<div className=" px-4 py-3 ">
					<div className="flex flex-col space-y-2">
						{filteredTasks.map((task) => (
							<div key={task.id} className="flex flex-col space-y-2">
								<TaskCard task={task} />
							</div>
						))}
					</div>
				</div>
				<ScrollBar />
			</ScrollArea>
		</div>
	);
};
export default Column;
