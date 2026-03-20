import type { Metadata } from "next";
import { Inter, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arogyasync.com"),
  title: "ArogyaSync | Transform Legacy Monitors Into Smart Healthcare Systems",
  description:
    "AI-powered retrofit solution delivering 85% cost savings with 95% OCR accuracy.",
  icons: {
    icon: "/app_logo.png",
  },
  openGraph: {
    title: "ArogyaSync",
    description: "AI-powered retrofit healthcare monitoring system",
    images: ["/images/Gemini_Generated_Image_t3awcgt3awcgt3aw-removebg-preview.png"],
  },
};
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* CR4-001: Content Security Policy for defense-in-depth
            Note: For static exports, meta CSP is less effective than HTTP headers.
            Configure your hosting platform (Cloudflare, Vercel, Netlify) with these headers:

            Content-Security-Policy:
              default-src 'self';
              script-src 'self' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self' data:;
              connect-src 'self';
              frame-ancestors 'none';
              base-uri 'self';
              form-action 'self';

            Meta tag fallback (weaker but better than nothing): */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
        />
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
