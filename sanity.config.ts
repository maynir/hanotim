import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset, apiVersion } from "./src/sanity/env";

export default defineConfig({
  name: "default",
  title: "הנוטעים",
  projectId,
  dataset,
  basePath: "/studio",
  apiVersion,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
