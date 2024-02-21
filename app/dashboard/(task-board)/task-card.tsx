"use client"

import updateTaskStatus from "@/action/tasks/update-task-status";
import completeTask from "@/action/tasks/update-task-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Database } from "@/schema";
import { format } from "date-fns";
import { CheckIcon, HourglassIcon } from "lucide-react";
import { useOptimistic, useState } from "react";

type TaskCardProps = {
	task: Database["public"]["Tables"]["tasks"]["Row"];

};

const TaskCard = ({ task }: TaskCardProps) => {

  const [pending, setPending] = useState(false)


	return (
		<Card className={cn("bg-slate-100",
      pending ? "opacity-50 animate-pulse" : "opacity-100"
    )} draggable={true} id={`${task.id}`}>
			<CardHeader className="flex items-center justify-between flex-row-reverse">
				<div className="flex space-x-2 w-full justify-end items-end">
					<form
						action={async () => {
							setPending(true);
							await updateTaskStatus(task.id, "In Progress");
							setPending(false);
						}}
					>
						<Button
							type="submit"
							variant="outline"
							className="bg-sky-600 text-white"
							size="icon"
							aria-disabled={pending}
							disabled={pending}
						>
							<HourglassIcon size={24} />
						</Button>
					</form>
					<form
						action={async () => {
							await updateTaskStatus(task.id, "Completed");
						}}
					>
						<Button
							type="submit"
							variant="outline"
							className="bg-green-600 text-white"
							size="icon"
							aria-disabled={pending}
							disabled={pending}
						>
							<CheckIcon size={24} />
						</Button>
					</form>
				</div>
				<CardTitle>{task.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-lg">{task.description}</p>
			</CardContent>
			<CardFooter>
				{task.updated_at ? (
					<small>Updated On: {format(task.updated_at, "Pp")}</small>
				) : (
					<small>Created On: {format(task.created_at, "Pp")}</small>
				)}
			</CardFooter>
		</Card>
	);
};
export default TaskCard;
