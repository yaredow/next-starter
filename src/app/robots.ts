import type { MetadataRoute } from "next";
import { SiteConfig } from "@/configs/site.config";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: ["/"],
			disallow: ["/search?q="],
		},
		sitemap: [`${SiteConfig.metadataBase}/sitemap.xml`],
	};
}
