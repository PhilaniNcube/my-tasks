"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const schema = z.object({
  username: z.string(),
  full_name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  async function signUp(prevState: any, formData:FormData) {

  const username = formData.get('username') as string
  const full_name = formData.get('full_name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validatedFields = schema.safeParse({
    username,
    full_name,
    email,
    password,
  })

  // check if any of the fields are empty
  if (!validatedFields.success) {
    console.log(validatedFields.error)
    return { message: "Please check the fields you entered", data: null }
  }

  // get cookieStore
  const cookieStore = cookies()
  // get supabase server client
  const supabase = createClient(cookieStore)

  // sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        full_name,
        avatar_url: "",
        website: "",
      }
    }
  })

  if (error) {
    return { message: error.message, data: null }
  }



  return { message: "User created, please check your email address for a confirmation email", data }


}
