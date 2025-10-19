import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { FooterComponent } from "@/modules/home/ui/components/footer";
import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

type RootLayoutParams = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutParams>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans", fonts)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <TRPCReactProvider key={0}>
            {children}
            <FooterComponent />
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
