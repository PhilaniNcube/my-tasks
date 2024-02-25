import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function getProjects() {
          const cookieStore = cookies();
				const supabase = createClient(cookieStore);

				const projectsQuery = supabase
					.from("projects")
					.select("*")


          type Projects = QueryData<typeof projectsQuery>

          const { data: projects, error } = await projectsQuery



         if (error) {
           return {
              error : error.message
           }
         }

         return {
            projects
         }
}


export async function getProject(id: string) {
          const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const projectQuery =  supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single()

          type Project = QueryData<typeof projectQuery>

          const { data: project, error } = await projectQuery


          if (error) {
            return {
              error : error.message
            }
          }

          return {
            project,
          }
}
