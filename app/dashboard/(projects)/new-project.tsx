"use client";

import createProject from "@/action/projects/new-project";
import createTask from "@/action/tasks/create";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import useProjectModalStore from "@/stores/projectModalStore";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";


const initialState = {
	errors: {},
	task: null,
};

const CreateProject = () => {
	const { isOpen, toggleOpen } = useProjectModalStore();

	return (
		<Dialog open={isOpen} onOpenChange={toggleOpen}>
			<DialogTrigger asChild>
				<Button className="bg-teal-500 flex space-x-3 items-center text-white px-4 py-2 rounded-md">
					<PlusIcon />
					Create Project
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Create Project</DialogTitle>
				<div className="w-full">
					<form
						action={async (formData: FormData) => {
							await createProject(formData);
							toggleOpen();
						}}
					>
						<div className="flex flex-col space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input name="title" id="title" type="text" />
						</div>


						<div className="mt-3">
							<SubmitButton />
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default CreateProject;
