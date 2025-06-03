import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteConfig } from "@/configs/site.config";
import { TRPCReactProvider } from "@/trpc/client";
import {
  OrganizationJsonLd,
  WebsiteSchemaJsonLd,
} from "@/components/seo/structured-data";
import { routing } from "@/i18n/routing";
import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { FooterComponent } from "@/modules/home/ui/components/footer";

import "./globals.css";

interface RootLayoutParams {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutParams>) {
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
          <TRPCReactProvider key={0}>
            <NextIntlClientProvider>
              {children}
              <FooterComponent />
              <Toaster />
            </NextIntlClientProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
