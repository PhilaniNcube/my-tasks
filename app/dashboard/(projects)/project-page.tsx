import { getProject } from "@/utils/fetchers/projects";
import { getTasksByProjectId } from "@/utils/fetchers/tasks";
import Board from "../(task-board)/board";

const ProjectPage = async ({id}:{id:string}) => {

  const projectData =  getProject(id)
  const projectTaskData = getTasksByProjectId(id)

  const [{project, error:projectError}, {tasks, error:tasksError}] = await Promise.all([projectData, projectTaskData])

  if(projectError) {
    return <div>{projectError}</div>
  }

  return (
			<div>
				<h1 className="text-2xl font-semibold">{project?.title}</h1>
				{tasks && <Board tasks={tasks} />}
			</div>
		);
};
export default ProjectPage;
