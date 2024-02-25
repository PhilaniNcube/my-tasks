import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getTaskNotes(task_id: number) {
          const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const taskNotesQuery =  supabase
          .from("notes")
          .select("text")
          .eq("task_id", task_id)


          type TaskNotes = QueryData<typeof taskNotesQuery>

          const { data: notes, error } = await taskNotesQuery

              if (error) {
            return {
               error : error.message
            }
          }


          return {
             notes
          }

}
