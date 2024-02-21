import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ReactNode } from "react";
import CreateTask from "./(task-board)/new-task";

const layout = ({children}:{children: ReactNode}) => {
  return (
			<main className="">
				<div className="h-16 w-full flex items-center border-b">
					<div className="container flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-semibold">My Tasks</h1>
						</div>
						<div className="flex space-x-2 items-center">
							<CreateTask />
							<Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
								Log Out
							</Button>
						</div>
					</div>
				</div>
				<div className="w-full flex flex-row h-[calc(100vh-64px)]">
					<aside className="w-[250px] border-r h-full">
						<nav className="flex flex-col space-y-3 mt-3">
							<Link
								href="/dashboard?view=tasks"
								className="px-4 py-2 font-medium"
							>
								Tasks
							</Link>
						</nav>
					</aside>
					<ScrollArea className="w-full">
						<div className="flex-1 px-4 py-2 w-full">{children}</div>
						<ScrollBar />
					</ScrollArea>
				</div>
			</main>
		);
};
export default layout;
