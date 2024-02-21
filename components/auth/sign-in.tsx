"use client"
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../ui/submit-button";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { signIn } from "@/action/auth/sign-in";

const initialState = {
	message: "",
	data: null,
};

export default function SignIn() {

   const [state, formAction] = useFormState(signIn, initialState);

			if (state.data) {
				toast(state.message);
			}

			return (
				<div className="mx-auto max-w-sm space-y-6">
					<div className="space-y-2 text-center">
						<h1 className="text-3xl font-bold">Sign In</h1>
						<p className="text-gray-500 dark:text-gray-400">
							Enter your credentials to sign in
						</p>
						<p className="text-gray-500 dark:text-gray-400">
							Dont have an account?
							<Link className="underline" href="/sign-up">
								Sign up
							</Link>
						</p>
					</div>
					<form action={formAction} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								placeholder="m@example.com"
								required
								type="email"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" required type="password" />
						</div>
						<SubmitButton />
					</form>
				</div>
			);
}

