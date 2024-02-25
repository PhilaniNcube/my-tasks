import { getProjects } from "@/utils/fetchers/projects";
import ProjectCard from "../(projects)/project-card";

const Projects = async () => {

  const projectsData = await getProjects()

   if(projectsData.error) {
      return <div>{projectsData.error}</div>
   }


  return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{projectsData.projects
					? projectsData.projects.map((project) => {
							return <ProjectCard key={project.id} project={project} />;
					  })
					: null}
			</div>
		);
};
export default Projects;
