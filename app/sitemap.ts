import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/platform", "/connectors", "/pricing", "/security"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
