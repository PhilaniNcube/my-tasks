"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { CircleDashed } from "lucide-react";

export function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="min-w-[200px]" disabled={pending} aria-disabled={pending}>
		{pending ? (<span className="flex items-center space-x-3">Loading... <CircleDashed className="animate-spin" /></span>) : "Submit"}

		</Button>
	);
}
