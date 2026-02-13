"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";

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

interface ProjectGridProps {
  projects: Project[];
  /** When set, shows a "See all projects" button linking to the full list */
  viewAllHref?: string;
}

const categories = [
  { label: "הכל", value: "all" },
  { label: "פרטי", value: "private" },
  { label: "גגות", value: "roof" },
  { label: "תכנון", value: "planning" },
];

export function ProjectGrid({ projects, viewAllHref }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section className="py-12 bg-cream">
      {/* Header & filter stay centered */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-4xl sm:text-5xl font-bold text-forest font-heading mb-2">
            הפרויקטים שלנו
          </h2>
          <p className="text-lg text-stone max-w-2xl mx-auto">
            סיפורי הצלחה של עיצוב נוף ייחודי וגינון מקצועי
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.value
                  ? "bg-forest text-cream shadow-md"
                  : "bg-sand text-bark hover:bg-forest-light hover:text-cream"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid – fixed column width, horizontal scroll on small screens */}
      {filteredProjects.length > 0 ? (
        <div className="overflow-x-auto">
          <div
            className="grid gap-2 md:gap-3 auto-rows-[280px] mx-auto"
            style={{
              gridTemplateColumns: "repeat(4, 320px)",
              width: "fit-content",
            }}
          >
            {filteredProjects.map((project) => (
              <div key={project._id} className="relative">
                <ProjectCard
                  title={project.title}
                  slug={project.slug.current}
                  category={project.category}
                  mainImage={project.mainImage}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-stone">לא נמצאו פרויקטים בקטגוריה זו</p>
        </div>
      )}

      {viewAllHref && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 text-center">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-base font-medium text-cream hover:bg-forest-dark transition-all shadow-md hover:shadow-lg"
          >
            לכל הפרויקטים
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      )}
    </section>
  );
}
