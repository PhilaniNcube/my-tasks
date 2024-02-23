"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

async function signOut() {
    const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    return;
  }

}

export default signOut;
