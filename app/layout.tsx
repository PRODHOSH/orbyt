import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: {
    default: "ORBYT | The Intelligent Campus OS",
    template: "%s | ORBYT Campus OS",
  },
  description: "One campus. One intelligence layer. ORBYT brings student academics, campus services, club recruitments, and institutional safety into a single intelligent platform.",
  keywords: [
    "ORBYT", "Campus OS", "Intelligent Campus", "Student Portal", 
    "Attendance Tracking", "Academic Regulations", "Campus Safety", 
    "Club Recruitments", "AI Resume Builder", "University AI Agent"
  ],
  authors: [{ name: "ORBYT Founding Team" }],
  creator: "ORBYT",
  publisher: "ORBYT",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.className} ${sora.variable} h-full antialiased`}
      style={{ fontSize: "90%" }}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
