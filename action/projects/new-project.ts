"use server"

import { Database } from "@/schema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {z} from "zod"

const schema = z.object({
  title: z.string(),
})

type PrevState = {
  errors: {
    [key: string]: string[]
  } | null,
  task: Database["public"]["Tables"]['tasks'] | null
}

const createProject = async ( formData:FormData) => {

  const validatedFields = schema.safeParse({
    title: formData.get("title"),
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

  const {data, error} = await supabase.from("projects").insert({
    title: validatedFields.data.title,
    user_id
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

  revalidatePath("/dashboard/projects")

  return {
    errors: null,
    project: data
  }

};


export default createProject;
