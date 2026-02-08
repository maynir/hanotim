import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Verify the secret to prevent unauthorized access
  if (secret !== process.env.SANITY_DRAFT_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the path from the query parameter
  redirect(slug || "/");
}
