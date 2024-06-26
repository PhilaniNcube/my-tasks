"use client"

import { archiveTask } from "@/action/tasks/archive";
import updateTaskStatus from "@/action/tasks/update-task-status";
import completeTask from "@/action/tasks/update-task-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Database } from "@/schema";
import { useTaskStore } from "@/stores/taskStore";
import { format } from "date-fns";
import { CheckIcon, HourglassIcon, TimerOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";


type TaskCardProps = {
	task: Database["public"]["Tables"]["tasks"]["Row"];
};

const TaskCard = ({ task }: TaskCardProps) => {

  const [pending, setPending] = useState(false)
  const router = useRouter()

  const dragTask = useTaskStore(state => state.dragTask)
  const draggedTask = useTaskStore(state => state.draggedTask)


	return (
		<Card
			className={cn(
				"bg-slate-100 border-2 cursor-grab",
				draggedTask === task.id
					? "opacity-50 animate-pulse pointer-events-none"
					: "opacity-100",
				task.status === "Completed"
					? "border-green-600"
					: task.status === "In Progress"
						? "border-sky-600"
						: "border-orange-300",
			)}
			draggable={true}
			onDrag={() => dragTask(task.id)}
			id={`${task.id}`}
		>
			<CardHeader
				className={cn("flex justify-between w-full flex-row items-center")}
			>
				{" "}
				<Link
					className=""
					prefetch={false}
					href={`/dashboard/tasks/${task.id}`}
				>
					<Button type="button" size="sm">
						View Task
					</Button>
				</Link>
				<div className="flex space-x-2 w-full justify-end items-end">
					<Button
						onClick={async () => {
							setPending(true);
							await updateTaskStatus(task.id, "In Progress");
							setPending(false);
						}}
						type="button"
						variant="outline"
						className="bg-sky-600 text-white"
						size="icon"
						aria-disabled={pending}
						disabled={pending}
					>
						<HourglassIcon size={24} />
					</Button>
					<Button
						onClick={async () => {
							setPending(true);
							await updateTaskStatus(task.id, "Completed");
							setPending(false);
						}}
						type="button"
						variant="outline"
						className="bg-green-600 text-white"
						size="icon"
						aria-disabled={pending}
						disabled={pending}
					>
						<CheckIcon size={24} />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<CardTitle className="text-lg">{task.title}</CardTitle>
				<p className="text-sm mb-4">{task.description}</p>
			</CardContent>
			<CardFooter>
				{task.updated_at !== null ? (
					<div className="flex justify-between items-center w-full">
						<small>Updated On: {format(task.updated_at, "Pp")}</small>
						<form
							action={() => {
								startTransition(() => {
									archiveTask(task.id);
                  router.refresh()
								});
							}}
						>
							<Button variant="outline" size="sm">
								Archive <TimerOff />
							</Button>
						</form>
					</div>
				) : (
					<div className="flex justify-between items-center w-full">
						<small>Created On: {format(task.created_at, "Pp")}</small>
						<form
							action={() => {
								startTransition(() => {
									archiveTask(task.id);
                  router.refresh();
								});
							}}
						>
							<Button variant="outline" size="sm">
								Archive <TimerOff />
							</Button>
						</form>
					</div>
				)}
			</CardFooter>
		</Card>
	);
};
export default TaskCard;
