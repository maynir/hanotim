import "server-only";
import { draftMode } from "next/headers";
import { client } from "./client";
import { token } from "@/sanity/lib/token";
import type { QueryParams } from "next-sanity";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 3600, // 1 hour default
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  } catch {
    // draftMode() throws when called outside a request scope
    // (e.g. during generateStaticParams at build time)
  }

  if (isDraftMode && !token) {
    throw new Error("Missing SANITY_API_READ_TOKEN for draft mode");
  }

  return client.fetch<QueryResponse>(query, params, {
    cache: isDraftMode ? "no-store" : "force-cache",
    next: {
      revalidate: isDraftMode ? 0 : revalidate,
      tags,
    },
    token: isDraftMode ? token : undefined,
    perspective: isDraftMode ? "previewDrafts" : "published",
    stega: isDraftMode,
  });
}
