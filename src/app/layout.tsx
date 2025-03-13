import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteConfig } from "@/configs/site.config";
import { TRPCProvider } from "@/trpc/client";
import {
  OrganizationJsonLd,
  WebsiteSchemaJsonLd,
} from "@/components/seo/structured-data";
import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./globals.css";
import { Header } from "@/modules/home/ui/components/header";
import { FooterComponent } from "@/modules/home/ui/components/footer";

export const metadata = SiteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <WebsiteSchemaJsonLd
          siteUrl={SiteConfig.openGraph?.url?.toString() || ""}
        />
        <OrganizationJsonLd
          name="[Your Site Name]"
          url={SiteConfig.openGraph?.url?.toString() || ""}
          logo={`${SiteConfig.openGraph?.url}/logo.png`}
          sameAs={["[Your Github Repo URL]"]}
        />
      </head>
      <body className={cn("min-h-screen font-sans", fonts)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider key={0}>
            <Header />
            {children}
            <FooterComponent />
            <Toaster />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
