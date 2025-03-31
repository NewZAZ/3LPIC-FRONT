import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Plateforme d'Apprentissage",
    description: "Plateforme d'apprentissage en ligne pour les étudiants",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body className={inter.className}>
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </body>
        </html>
    )
}

