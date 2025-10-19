import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["system-ui", "arial"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  fallback: ["system-ui", "arial"],
});

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  fallback: ["system-ui", "arial"],
});

export const fonts = [
  fontSans.variable,
  fontMono.variable,
  fontMontserrat.variable,
];
