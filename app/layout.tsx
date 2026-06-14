import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { SignupProvider } from "./context/SignupContext";
import { LanguageProvider } from "./context/LanguageContext";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "कथाAI",
  description: "AI-powered Nepali storytelling for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={beVietnamPro.className}>
        
        <LanguageProvider>
        <SignupProvider>
          {children}
        </SignupProvider>
        </LanguageProvider>

      </body>
    </html>
  );
}