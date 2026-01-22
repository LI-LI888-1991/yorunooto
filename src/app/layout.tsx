import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import StarsBackground from "@/components/StarsBackground";
import BottomNav from "@/components/BottomNav";

const notoLinesJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "ヨルノオト",
  description: "夜の散歩で、新しい音楽と出会う",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoLinesJP.variable} font-sans antialiased bg-background-primary text-text-primary min-h-screen`}>
        <StarsBackground />
        <main className="max-w-[500px] mx-auto min-h-screen pb-[100px] relative z-10">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
