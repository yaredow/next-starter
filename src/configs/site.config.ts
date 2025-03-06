import { Metadata } from "next";

export const SiteConfig: Metadata = {
  title: {
    template: "%s | [Your Site Name]",
    default: "[Your Site Name] - Add a feature-rich description here",
  },
  description: "[Add a comprehensive description of your product]",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "[Your Site URL]",
    title: "[Your Site Name]",
    description: "[Add a comprehensive description of your product]",
    siteName: "[Your Site Name]",
  },
  twitter: {
    card: "summary_large_image",
    title: "[Your Product Name]",
    description: "[Add a feature-rich description of your product]",
    creator: "[Your Twitter Username]",
  },
  robots: {
    index: true,
    follow: true,
  },
};
