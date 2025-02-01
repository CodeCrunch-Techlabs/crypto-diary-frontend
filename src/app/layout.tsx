import type { Metadata } from "next"
import "./globals.css"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import { SearchProvider } from "@/context/SearchProvider"
export const metadata: Metadata = {
  title: "CryptoDiary",
  description:
    "CryptoDiary - Where the activities and contributions of crypto enthusiasts, builders, and investors are documented.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-green-400">
          <SearchProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SearchProvider>
      </body>
    </html>
  )
}

