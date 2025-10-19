import type { MetadataRoute } from "next";
import { SiteConfig } from "@/configs/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  // You can fetch dynamic routes here from your API/database
  // const products = await getProducts();

  // Example of static routes
  const routes = [
    `${SiteConfig.openGraph?.url}`,
    `${SiteConfig.openGraph?.url}/about`,
    `${SiteConfig.openGraph?.url}/contact`,
  ].map((route) => ({
    url: `${SiteConfig.openGraph?.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [
    ...routes,
    // ...products.map((product) => ({
    //   url: `${siteConfig.url}/products/${product.slug}`,
    //   lastModified: new Date(product.updatedAt).toISOString().split('T')[0],
    // })),
  ];
}
