import TaskPage from "../../(tasks)/task-page";

const page = async ({params: {id}}:{params:{id:string}}) => {

  return <div>
    <TaskPage id={Number(id)} />
  </div>;
};
export default page;
