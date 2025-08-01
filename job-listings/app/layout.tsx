import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import './fontawesome';


export const metadata: Metadata = {
  title: "Job Listings App",
  description: "Powered by Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="
          antialiased
          bg-[var(--background)] text-[var(--foreground)]
          min-h-screen
        "
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
