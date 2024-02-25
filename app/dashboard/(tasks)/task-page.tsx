import { getTask } from "@/utils/fetchers/tasks";

const TaskPage = async ({id}:{id:number}) => {

  const {error, task} = await getTask(id)

  if (error || !task) {
    return <div>{error}</div>
  }


  return <article className="w-full">
    <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
    <p>{task.description}</p>
  </article>;
};
export default TaskPage;
