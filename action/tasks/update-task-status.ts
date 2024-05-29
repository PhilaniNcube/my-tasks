"use server"

import type{ Database } from "@/schema";

import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";



const updateTaskStatus = async (id: number, status: Database['public']['Enums']['Status']) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // take the current timestamp and convert to a date string
  const now = new Date().toUTCString()



  const { data, error } = await supabase.from("tasks").update({ status: status, updated_at:now }).eq("id", id).single()

  if (error) {
    console.error(error)
    return {
      error: error,
      task: null
    }
  }

  revalidatePath("/dashboard")



  return {
    error: null,
    task: data
  }
}

export default updateTaskStatus
