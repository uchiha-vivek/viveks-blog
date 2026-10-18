import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import { site } from "@/lib/site";
import "katex/dist/katex.min.css";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMetadata({
    title: `${site.masthead} — Technology & Mathematics by ${site.author}`,
    description: site.description,
    path: "/",
    imageKey: "home",
  }),
  applicationName: site.masthead,
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set theme before paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('tdd-theme');if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${display.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
