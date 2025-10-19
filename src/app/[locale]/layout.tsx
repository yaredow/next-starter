import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/modules/home/ui/components/header";

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: Promise<{
		locale: string;
	}>;
}

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale } = await params;

	if (!locale) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<NextIntlClientProvider>
			<Header />
			{children}
		</NextIntlClientProvider>
	);
}
