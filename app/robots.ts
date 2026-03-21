import { APP } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/payment/",
        "/signin",
        "/signup",
        "/post-auth",
      ],
    },
    sitemap: new URL("/sitemap.xml", APP.URL).toString(),
  };
}
