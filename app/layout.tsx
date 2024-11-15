import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { inter } from "@/app/font";
import CrispProvider from "@/components/crisp-provider";
import { ModalProvider } from "@/components/ModalProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Wolverin",
  description: "Wolverin is a all-in-one platform for AI saas products.",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      
      <html lang="en" suppressHydrationWarning>
        <CrispProvider />
        <body className={cn(inter.className, "bg-[#fdfdfd]")}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModalProvider/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
