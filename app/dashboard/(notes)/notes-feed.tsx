"use client"

import {useOptimistic, useRef} from "react"
import {createNewNote} from "@/action/notes/new-note"
import { Database } from "@/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { Separator } from "@/components/ui/separator";
import { add } from "date-fns";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

type Notes = Database["public"]["Tables"]["notes"]["Row"][];

type NoteFeedProps = {
  task_id: number;
  notes: {
    text:string
  }[];
}

type Note = {
  text: string;
}

export const NotesFeed = ({task_id, notes}: {task_id:number, notes:Note[]}) => {

  const router = useRouter()

  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticNotes, addOptimisticNote] = useOptimistic<{ text: string }[]>(
        notes,
      //@ts-ignore
			(currState:Note[], newNote:string) => [...currState, {text: newNote}],
		);



  return (
			<div>
				<div>
					{optimisticNotes.map((note, k) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={k}>
							<pre>{JSON.stringify(note, null, 2)}</pre>
						</div>
					))}
				</div>
        <Separator className="my-3" />
        <form className="" ref={formRef} action={async (formData:FormData) => {
          const text = formData.get("text") as string
          addOptimisticNote(text);
          await createNewNote(formData)
          formRef.current?.reset()
          router.refresh()
          // revalidatePath(`dashboard/tasks/${task_id}`);

          // console.log({errors, note})
        }}>
          <div className="w-[400px] mb-3 flex flex-col space-y-3">
           <Label htmlFor="text" >New Note</Label>
           <Textarea name="text" id="text" className="" />
          </div>
          <input type="hidden" name="task_id" value={task_id} />
          <SubmitButton />
        </form>
			</div>
		);
}


