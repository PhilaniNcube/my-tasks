"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  async function signIn(prevState: any, formData:FormData) {


  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validatedFields = schema.safeParse({

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
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { message: error.message, data: null }
  }



  return { message: "Signed in", data }


}
