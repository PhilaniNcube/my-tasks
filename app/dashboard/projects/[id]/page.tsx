import ProjectPage from "../../(projects)/project-page";
import Board from "../../(task-board)/board";

const page = ({params: {id}}:{params:{id:string}}) => {
  return <div>
    <ProjectPage id={id} />
  </div>;
};
export default page;
