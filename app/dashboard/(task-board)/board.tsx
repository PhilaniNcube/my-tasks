import { Database } from "@/schema";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import CreateTask from "./new-task";
import { Separator } from "@/components/ui/separator";
import Column from "./column";

type Task = Database["public"]["Enums"]["Status"];

const Board = async () => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: tasks, error } = await supabase.from("tasks").select("*").order("updated_at", { ascending: false })

  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  return (
			<div className="w-full grid grid-cols-3 gap-3">
				<Column status="Pending" tasks={tasks} />
				<Column status="In Progress" tasks={tasks} />
				<Column status="Completed" tasks={tasks} />
			</div>
		);
};
export default Board;
