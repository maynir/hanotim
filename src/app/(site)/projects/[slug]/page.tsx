import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  projectBySlugQuery,
  projectSlugsQuery,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { ArrowRight } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  mainImage: {
    asset: any;
    alt?: string;
  };
  gallery?: Array<{
    asset: any;
    alt?: string;
  }>;
  description?: any;
}

const categoryNames: Record<string, string> = {
  private: "פרטי",
  roof: "גגות",
  planning: "תכנון",
};

export async function generateMetadata(
  props: ProjectPageProps
): Promise<Metadata> {
  const params = await props.params;
  const project = await sanityFetch<Project>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    tags: [`project:${params.slug}`],
  });

  if (!project) {
    return {
      title: "פרויקט לא נמצא",
    };
  }

  const imageUrl = project.mainImage
    ? urlFor(project.mainImage.asset).width(1200).height(630).url()
    : undefined;

  return {
    title: project.title,
    description: `פרויקט ${categoryNames[project.category]} - ${project.title}`,
    openGraph: {
      title: project.title,
      description: `פרויקט ${categoryNames[project.category]} - ${project.title}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: projectSlugsQuery,
    tags: ["project"],
  });

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProjectPage(props: ProjectPageProps) {
  const params = await props.params;
  const project = await sanityFetch<Project>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    tags: [`project:${params.slug}`],
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Back Button */}
      <div className="bg-sand border-b border-stone/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-forest hover:text-forest-light transition-colors font-medium"
          >
            <ArrowRight className="h-5 w-5" />
            חזרה לפרויקטים
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <Image
          src={urlFor(project.mainImage.asset).width(1920).height(1080).url()}
          alt={project.mainImage.alt || project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="mx-auto max-w-7xl">
            <span className="inline-block bg-leaf/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-forest-dark mb-4">
              {categoryNames[project.category]}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-cream font-heading">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Description */}
        {project.description && (
          <div className="prose prose-lg prose-stone max-w-none mb-16">
            <PortableText value={project.description} />
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-forest font-heading mb-8">
              גלריית תמונות
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={urlFor(image.asset).width(800).height(600).url()}
                    alt={image.alt || `${project.title} - תמונה ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-forest text-cream py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            מעוניינים בפרויקט דומה?
          </h2>
          <p className="text-lg text-sand mb-8">
            נשמח לעזור לכם להגשים את חלום הגן המושלם
          </p>
          <Link
            href="/#contact"
            className="inline-block rounded-full bg-leaf px-8 py-4 text-lg font-semibold text-forest-dark hover:bg-leaf-light transition-all shadow-lg hover:shadow-xl"
          >
            צרו קשר עכשיו
          </Link>
        </div>
      </div>
    </main>
  );
}
