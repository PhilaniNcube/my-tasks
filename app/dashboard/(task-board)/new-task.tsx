"use client"

import createTask from "@/action/tasks/create";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Database } from "@/schema";
import useTaskModalStore from "@/stores/taskModalStore";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";


const initialState = {
	errors: {},
  task: null
};

type CreateTaskProps = {
  projects: Database["public"]["Tables"]["projects"]["Row"][]
}

const CreateTask = ({projects}:CreateTaskProps) => {

const {isOpen, toggleOpen} = useTaskModalStore()

  return (
			<Dialog open={isOpen} onOpenChange={toggleOpen}>
				<DialogTrigger asChild>
					<Button className="bg-blue-500 flex space-x-3 items-center text-white px-4 py-2 rounded-md">
						<PlusIcon />
						Create Task
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>Create Task</DialogTitle>
					{projects.length === 0 ? (
					<div className="flex items-center justify-center">
						<h1 className="text-2xl font-semibold">Create a project first</h1>
					</div>
					) : (
					<div className="w-full">
						<form
							action={async (formData: FormData) => {
								await createTask(formData);
								toggleOpen();
							}}
						>
							<div className="flex flex-col space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input name="title" id="title" type="text" />
							</div>
							<div className="flex flex-col space-y-2 mt-4">
								<Label htmlFor="description">Description</Label>
								<Textarea name="description" id="description" />
							</div>
							<div className="flex flex-col space-y-2 mt-4">
								<Label htmlFor="project">Project</Label>
								<Select name="project">
									<SelectTrigger className="w-[280px]">
										<SelectValue placeholder="Project" />
									</SelectTrigger>
									<SelectContent>
										{projects.map((project) => (
											<SelectItem key={project.id} value={project.id}>
												{project.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="mt-3">
								<SubmitButton />
							</div>
						</form>
					</div>
					) }
				</DialogContent>
			</Dialog>
		);
};
export default CreateTask;
