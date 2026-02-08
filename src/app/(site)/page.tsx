import { Hero } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { ContactSection } from "@/components/sections/contact-section";
import { sanityFetch } from "@/lib/sanity/fetch";
import { projectsQuery } from "@/lib/sanity/queries";

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

export default async function Home() {
  // Fetch latest 6 projects for homepage
  const allProjects = await sanityFetch<Project[]>({
    query: projectsQuery,
    tags: ["project"],
    revalidate: 3600, // 1 hour
  });

  const featuredProjects = allProjects.slice(0, 6);

  return (
    <main>
      <Hero />
      {featuredProjects.length > 0 && (
        <ProjectGrid projects={featuredProjects} />
      )}
      <ContactSection />
    </main>
  );
}
