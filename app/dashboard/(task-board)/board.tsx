"use client"

import { Database } from "@/schema";
import Column from "./column";
import { useOptimistic } from "react";

type Task = Database["public"]["Tables"]["tasks"]["Row"];


type BoardProps = {
  tasks: Database["public"]["Tables"]["tasks"]["Row"][];
};

const Board = ({ tasks }: BoardProps) => {


	return (
		<div className="w-full grid grid-cols-3 gap-3">
			<Column
				status="Pending"
				tasks={tasks}

			/>
			<Column
				status="In Progress"
				tasks={tasks}

			/>
			<Column
				status="Completed"
				tasks={tasks}

			/>
		</div>
	);
};
export default Board;
