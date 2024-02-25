"use client"
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/action/auth/sign-up";
import { SubmitButton } from "../ui/submit-button";
import { toast } from "sonner";

const initialState = {
	message: "",
  data: null,
};

export default function SignUp() {

 const [state, formAction] = useFormState(signUp, initialState);

 if(state.data === null) {
    toast(state.message)
 }

if (state.data?.user) {
    toast(state.message);
  }


	return (
		<div className="mx-auto max-w-sm space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Sign Up</h1>
				<p className="text-gray-500 dark:text-gray-400">
					Enter your information to create an account
				</p>
			</div>
			<form action={formAction} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="full_name">Full name</Label>
					<Input id="full_name" name="full_name" placeholder="John Doe" required />
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" name="email" placeholder="m@example.com" required type="email" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" name="password" required type="password" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="username">Username</Label>
					<Input id="username" name="username" required type="text" />
				</div>
			  <SubmitButton />
			</form>
		</div>
	);
}

