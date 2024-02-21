import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";


export default async function Home() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
			data: { user },
			error,
		} = await supabase.auth.getUser();



  return (
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				{!user ? <SignIn /> : <p>Welcome {user.email}</p>}
			</main>
		);
}
