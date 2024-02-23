import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ReactNode } from "react";
import CreateTask from "./(task-board)/new-task";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import signOut from "@/action/auth/sign-out";
import SignIn from "@/components/auth/sign-in";
import { ArrowBigRightIcon } from "lucide-react";

const layout = async ({children}:{children: ReactNode}) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const userData = await supabase.auth.getUser();

  if (!userData.data.user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <SignIn />
      </div>
    );
  }


  return (
			<main className="">
				<div className="h-16 w-full flex items-center border-b">
					<div className="px-6 w-full flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-semibold">My Tasks</h1>
						</div>
						<div className="flex space-x-2 items-center">
							<CreateTask />
							<form action={signOut}>
								<Button
									type="submit"
									className="bg-red-600 flex items-center justify-center space-x-3 text-white px-4 py-2 rounded-md"
								>
                  <ArrowBigRightIcon size={24} />
									<span>Log Out</span>
								</Button>
							</form>
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
							<Link
								href="/dashboard/projects"
								className="px-4 py-2 font-medium"
							>
								Projects
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
