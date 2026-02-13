import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
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
  /** Image width hint for Sanity CDN */
  widthHint?: number;
  /** Image height hint for Sanity CDN */
  heightHint?: number;
}

export function ProjectCard({
  title,
  slug,
  mainImage,
  widthHint = 800,
  heightHint = 600,
}: ProjectCardProps) {
  const imageUrl = urlFor(mainImage.asset)
    .width(widthHint)
    .height(heightHint)
    .url();

  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative block w-full h-full overflow-hidden"
    >
      {/* Image with zoom on hover */}
      <Image
        src={imageUrl}
        alt={mainImage.alt || title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Hover overlay: darkens + shows title */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white font-heading opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-center px-4 drop-shadow-lg">
          {title}
        </h3>
      </div>
    </Link>
  );
}
