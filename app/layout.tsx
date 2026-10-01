import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * The three families the Figma file actually uses. Satoshi carries body and
 * UI copy, Poppins carries display type and prices, Clash Display is the
 * wordmark only. Self-hosted from app/fonts - no runtime CDN dependency.
 */
const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "./fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const poppins = localFont({
  variable: "--font-poppins",
  src: [
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const clash = localFont({
  variable: "--font-clash",
  src: "./fonts/clashdisplay-700.woff2",
  weight: "700",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "ByteSpace - Unlock Your Potential as a Creator",
    template: "%s - ByteSpace",
  },
  description:
    "ByteSpace supports individuals or entities interested in teaching and learning. Join a community of learners and creators shaping the future of online education.",
  openGraph: {
    type: "website",
    siteName: "ByteSpace",
    title: "ByteSpace - Unlock Your Potential as a Creator",
    description:
      "Get access to hundreds of courses. Learn, teach and grow alongside a community of creators.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${poppins.variable} ${clash.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
