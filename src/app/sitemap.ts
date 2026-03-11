import type { MetadataRoute } from "next";
import { SITE_DATA } from "@/lib/data";

const SITE_URL = "https://www.jordanleahy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = SITE_DATA.caseStudies.map((cs) => ({
    url: `${SITE_URL}/work/${cs.slug}`,
    lastModified: new Date(),
  }));

  const blogPosts = SITE_DATA.blogPosts
    .filter((p) => p.link.startsWith("/blog/"))
    .map((p) => ({
      url: `${SITE_URL}${p.link}`,
      lastModified: new Date(),
    }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/services`, lastModified: new Date() },
    { url: `${SITE_URL}/contact`, lastModified: new Date() },
    ...caseStudies,
    ...blogPosts,
  ];
}
