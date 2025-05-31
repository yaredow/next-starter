import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
