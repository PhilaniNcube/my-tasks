import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function getTasks() {
          const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const tasksQuery = supabase
          .from("tasks")
          .select("*")

         type Tasks = QueryData<typeof tasksQuery>

          const { data: tasks, error } = await tasksQuery

          if (error) {
            return {
               error : error.message
            }
          }

          return {
             tasks
          }

}


export async function getTask(id: number) {
          const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const taskQuery =  supabase
          .from("tasks")
          .select("*")
          .eq("id", id)
          .single()

          type Task = QueryData<typeof taskQuery>

          const { data: task, error } = await taskQuery

              if (error) {
            return {
               error : error.message
            }
          }

          return {
             task
          }


}


export async function getTasksByProjectId(project_id: string) {
          const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const tasksQuery = supabase
          .from("tasks")
          .select("*")
          .eq("project_id", project_id)

         type Tasks = QueryData<typeof tasksQuery>

          const { data: tasks, error } = await tasksQuery

          if (error) {
            return {
               error : error.message
            }
          }

          return {
             tasks
          }

}
