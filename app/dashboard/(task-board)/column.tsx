import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Database } from "@/schema";
import { Scroll } from "lucide-react";
import TaskCard from "./task-card";

type ColumnProps = {
  status: Database["public"]["Enums"]["Status"];
  tasks: Database['public']['Tables']['tasks']['Row'][];
}

const Column = ({status, tasks}:ColumnProps) => {

  const filteredTasks = tasks.filter(task => task.status === status)

  return (
			<div  className="h-[calc(100vh-80px)] border-zinc-300 shadow-md rounded-sm px-2 py-3 border-2">
				<h2 className="font-medium text-xl">{status}</h2>
				<Separator className="my-2" />
				<ScrollArea className="w-full h-[calc(100vh-150px)] overflow-hidden">
					<div  className=" px-4 py-3 ">
						<div className="flex flex-col space-y-2">
							{filteredTasks.map((task) => (
								<div  key={task.id} className="flex flex-col space-y-1">
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
