"use client"

import { Card, CardHeader } from "@/components/ui/card";
import { Database } from "@/schema";
import { useRouter } from "next/navigation";

type ProjectCardProps = {
  project: Database['public']['Tables']['projects']['Row'];
}

const ProjectCard = ({project}:ProjectCardProps) => {

  const router = useRouter()

  return (
			<Card
				onClick={() => router.push(`/dashboard/projects/${project.id}`)}
				className="cursor-pointer hover:shadow-md transition-shadow duration-200"
			>
				<CardHeader className="font-semibold text-2xl">{project.title}</CardHeader>
			</Card>
		);
};
export default ProjectCard;
