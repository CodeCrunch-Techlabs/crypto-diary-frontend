import type { Metadata } from "next"
import "./globals.css"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"



export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cryptodiary.fun"),
  title: {
    default: "CryptoDiary | Crypto World Directory",
    template: "%s | CryptoDiary"
  },
  description:
    "CryptoDiary - Where the activities and contributions of crypto enthusiasts, builders, and investors are documented.",
    icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    },
  openGraph: {
    type: "website",
    title: "CryptoDiary",
    siteName: "CryptoDiary",
    description:
      "CryptoDiary - Where the activities and contributions of crypto enthusiasts, builders, and investors are documented.",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@cryptodiaryfun",
    creator: "@cryptodiaryfun",
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-green-400">
            <Navbar />
            <main className="flex-grow min-h-screen">{children}</main>
            <Footer />
      </body>
    </html>
  )
}

