import { groq } from "next-sanity";

// Get all projects
export const projectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  category,
  mainImage {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    },
    alt
  },
  "imageCount": count(gallery)
}`;

// Get projects by category
export const projectsByCategoryQuery = groq`*[_type == "project" && category == $category] | order(order asc, _createdAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  category,
  mainImage {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    },
    alt
  },
  "imageCount": count(gallery)
}`;

// Get single project by slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  slug,
  category,
  mainImage {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    },
    alt
  },
  gallery[] {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    },
    alt
  },
  description,
  order
}`;

// Get all project slugs for generateStaticParams
export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)]{"slug": slug.current}`;
