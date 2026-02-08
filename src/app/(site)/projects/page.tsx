import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { projectsQuery } from "@/lib/sanity/queries";
import { ProjectGrid } from "@/components/sections/project-grid";

export const metadata: Metadata = {
  title: "פרויקטים",
  description: "צפו בפרויקטי אדריכלות נוף וגינון שלנו - גינות פרטיות, גגות ירוקים ותכנון נוף מקצועי",
};

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  mainImage: {
    asset: any;
    alt?: string;
  };
  imageCount?: number;
}

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <main className="min-h-screen">
      <ProjectGrid projects={projects} />
    </main>
  );
}
