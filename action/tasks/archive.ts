"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function archiveTask(id: number) {
    const cookieStore = cookies();
				const supabase = createClient(cookieStore);

        const { data, error } = await supabase.from("tasks").update({ archived: true }).eq("id", id).single()

        revalidatePath("/dashboard", "layout")
}
