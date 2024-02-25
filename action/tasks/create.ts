"use server"

import { Database } from "@/schema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {z} from "zod"

const schema = z.object({
  title: z.string(),
  description: z.string(),
  project: z.string()
})

type PrevState = {
  errors: {
    [key: string]: string[]
  } | null,
  task: Database["public"]["Tables"]['tasks'] | null
}

const createTask = async ( formData:FormData) => {

  const validatedFields = schema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    project: formData.get("project")
  })

   console.log(validatedFields)

    if (!validatedFields.success) {

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const user = await supabase.auth.getUser()

  const user_id = user.data.user?.id

  if (!user_id) {
    return {
      errors: {
        user: ["User not found"]
      },
      task: null
    }
  }

  const {data, error} = await supabase.from("tasks").insert({
    title: validatedFields.data.title,
    description: validatedFields.data.description,
    user_id,
    project_id: validatedFields.data.project
  }).select("*").single()

  console.log({data, error})

  if (error) {
    return {
      errors: {
        server: [error.message]
      },
      task: null
    }
  }

  revalidatePath("/dashboard?view=tasks")

  return {
    errors: null,
    task: data
  }




};


export default createTask;
