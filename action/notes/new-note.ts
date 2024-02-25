"use server"

import { Database } from "@/schema";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import {z} from "zod"

const schema = z.object({
  text: z.string(),
  task_id: z.string(),
})


export  const createNewNote = async ( formData:FormData) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const validatedFields = schema.safeParse({
    text: formData.get("text"),
    task_id: formData.get("task_id")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      note: null
    }
  }

 const {data, error} = await supabase.from("notes").insert({
    text: validatedFields.data.text,
    task_id: Number(validatedFields.data.task_id)
 }).select("*").single()

  if (error) {
    return {
      errors: {
        note: [error.message]
      },
      note: null
    }
  }

  return {
    errors: null,
    note: data
  }

}
