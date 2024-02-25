import { getTaskNotes } from "@/utils/fetchers/notes";
import { getTask } from "@/utils/fetchers/tasks";
import { NotesFeed } from "../(notes)/notes-feed";

const TaskPage = async ({id}:{id:number}) => {

  const {error, task} = await getTask(id)
  const {error:notesError, notes} = await getTaskNotes(id)

  if (error || !task) {
    return <div>{error}</div>
  }


  return <article className="w-full">
    <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
    <p>{task.description}</p>
    <h2 className="text-2xl font-bold mt-8">Notes</h2>
    {notesError && <div>{notesError}</div>}
    {notes && notes !== undefined && <NotesFeed task_id={id} notes={notes} />}
    </article>;
};
export default TaskPage;
