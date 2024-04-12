import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "VCMeet",
  description: "A video confrencing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${inter.className} bg-dark-2`}>{children}
        <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
