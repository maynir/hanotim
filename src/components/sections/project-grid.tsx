"use client";

import { useState } from "react";
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
}

const categories = [
  { label: "הכל", value: "all" },
  { label: "פרטי", value: "private" },
  { label: "גגות", value: "roof" },
  { label: "תכנון", value: "planning" },
];

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section className="py-20 bg-cream">
      {/* Header & filter stay centered */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-forest font-heading mb-4">
            הפרויקטים שלנו
          </h2>
          <p className="text-lg text-stone max-w-2xl mx-auto">
            סיפורי הצלחה של עיצוב נוף ייחודי וגינון מקצועי
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
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
    </section>
  );
}
