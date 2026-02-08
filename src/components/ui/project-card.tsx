import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Images } from "lucide-react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface ProjectCardProps {
  title: string;
  slug: string;
  category: string;
  mainImage: {
    asset: SanityImageSource;
    alt?: string;
  };
  imageCount?: number;
}

const categoryNames: Record<string, string> = {
  private: "פרטי",
  roof: "גגות",
  planning: "תכנון",
};

export function ProjectCard({
  title,
  slug,
  category,
  mainImage,
  imageCount = 0,
}: ProjectCardProps) {
  const imageUrl = urlFor(mainImage.asset).width(800).height(600).url();

  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative overflow-hidden rounded-lg bg-sand shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={mainImage.alt || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-forest-dark/20 to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-4 end-4 bg-leaf/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-forest-dark">
          {categoryNames[category] || category}
        </div>

        {/* Image count */}
        {imageCount > 0 && (
          <div className="absolute top-4 start-4 bg-cream/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-bark flex items-center gap-1">
            <Images className="h-4 w-4" />
            <span>{imageCount}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-forest font-heading group-hover:text-forest-light transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
}
