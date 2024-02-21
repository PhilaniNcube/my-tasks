"use client"

import createTask from "@/action/tasks/create";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import useTaskModalStore from "@/stores/taskModalStore";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
	errors: {},
  task: null
};

const CreateTask = () => {


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
					<div className="w-full">
						<form action={async (formData:FormData) => {
              await createTask(formData)
              toggleOpen()
            }}>
							<div className="flex flex-col space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input name="title" id="title" type="text" />
							</div>
							<div className="flex flex-col space-y-2 mt-4">
								<Label htmlFor="description">Description</Label>
								<Textarea name="description" id="description" />
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
export default CreateTask;
