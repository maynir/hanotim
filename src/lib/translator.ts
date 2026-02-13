import translate from "translate";
import { transliterate } from "transliteration";

// ---------------------------------------------------------------------------
// Global translate engine configuration
// Uses the free Google Translate endpoint (no API key required).
// Source: Hebrew (he) -> Target: English (en)
// ---------------------------------------------------------------------------
translate.engine = "google";
translate.from = "he";
translate.to = "en";

/**
 * Sanitise a raw English string into a URL-safe slug.
 *
 * 1. Lowercases the entire string.
 * 2. Strips everything that is not alphanumeric, a space, or a hyphen.
 * 3. Collapses whitespace / consecutive hyphens into a single hyphen.
 * 4. Trims leading / trailing hyphens.
 */
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Translate a Hebrew string to English and return a URL-ready slug.
 *
 * If the translation service is unavailable the function falls back to a
 * basic transliteration via the `transliteration` library so callers always
 * receive a usable ASCII slug.
 *
 * @param text - Hebrew source text (e.g. "מרפסת גג בתל אביב")
 * @returns    - English slug   (e.g. "roof-terrace-in-tel-aviv")
 */
export async function translateHebrewToEnglish(
  text: string,
): Promise<string> {
  try {
    const translated: string = await translate(text);
    return toSlug(translated);
  } catch {
    // Fallback: transliterate Hebrew → ASCII when the service is down
    const transliterated: string = transliterate(text);
    return toSlug(transliterated);
  }
}
