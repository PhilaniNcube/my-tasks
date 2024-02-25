import Board from "./(task-board)/board";
import { getTasks } from "@/utils/fetchers/tasks";

const Dashboard = async () => {

    const taskData = await getTasks()

		return (
			<div>
        {taskData.tasks && <Board tasks={taskData.tasks} />}
			</div>
				);
};
export default Dashboard;
