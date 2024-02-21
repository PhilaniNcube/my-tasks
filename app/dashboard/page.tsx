import { Database } from "@/schema";
import Board from "./(task-board)/board";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";



const Dashboard = async () => {

        const cookieStore = cookies();
				const supabase = createClient(cookieStore);

				const { data: tasks, error } = await supabase
					.from("tasks")
					.select("*")
					.order("updated_at", { ascending: false });

				return (
					<div>
            {tasks && <Board tasks={tasks} />}
						{/* <Board /> */}
					</div>
				);
};
export default Dashboard;
