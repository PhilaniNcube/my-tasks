"use client"

import {useOptimistic, useRef} from "react"
import {createNewNote} from "@/action/notes/new-note"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

type Note = {
  text: string;
}

export const NotesFeed = ({task_id, notes}: {task_id:number, notes:Note[]}) => {

  const router = useRouter()

  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticNotes, addOptimisticNote] = useOptimistic<{ text: string }[]>(
        notes,
      //@ts-ignore
			(currState:Note[], newNote:string) => [{text: newNote},...currState ],
		);



  return (
			<div className="flex space-x-3">
				<div className="flex-1 max-w-[700px]">
					{optimisticNotes.map((note, k) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<article key={k} className="flex flex-col space-y-4">
							<div className="p-4 my-2 border border-slate-200 shadow rounded-md">
                <p className="">{note.text}</p>
							</div>
						</article>
					))}
				</div>
				<Separator orientation="vertical" className="mx-3" />
				<form
					className=""
					ref={formRef}
					action={async (formData: FormData) => {
						const text = formData.get("text") as string;
						addOptimisticNote(text);
						await createNewNote(formData);
						formRef.current?.reset();
						router.refresh();
						// revalidatePath(`dashboard/tasks/${task_id}`);

						// console.log({errors, note})
					}}
				>
					<h2 className="text-2xl mb-2 font-medium">Add a note</h2>
					<div className="w-[400px] mb-3 flex flex-col space-y-3">
						<Label htmlFor="text">New Note</Label>
						<Textarea name="text" id="text" className="" />
					</div>
					<input type="hidden" name="task_id" value={task_id} />
					<SubmitButton />
				</form>
			</div>
		);
}


