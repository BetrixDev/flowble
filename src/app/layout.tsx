import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import "./globals.css";
import "./clerk.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Flowble",
  other: {
    "google-adsense-account": "ca-pub-3191192737129047",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className="dark">
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3191192737129047"
          crossOrigin="anonymous"
        />
        <body className="antialiased font-dmSans">
          <div vaul-drawer-wrapper="">{children}</div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
