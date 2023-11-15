import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import "../styles/prism.css";
import ThemeProvider from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "Welcome to DevFlow, the ultimate hub for developers seeking a collaborative and innovative coding community. At DevFlow, you can seamlessly post your coding questions, receive precise and swift answers from a pool of experts, and even explore cutting-edge AI-generated solutions. What sets DevFlow apart is its robust reputation system, where your interactions and contributions directly impact your standing in the community. Showcase your expertise, earn badges, and climb the ranks as you engage with like-minded developers from around the world. With a personalized dashboard, intuitive search functionality, and a commitment to fostering a culture of continuous learning, DevFlow is not just a forum; it's a dynamic ecosystem where every interaction propels you forward on your coding journey. Join DevFlow today and experience the power of collaborative coding at your fingertips.",
  icons: {
    icon: "/assets/icons/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary_gradient",
              footerActionLink: "prmari-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
