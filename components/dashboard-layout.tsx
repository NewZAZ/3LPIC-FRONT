"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/lib/auth-context"

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    const { user } = useAuth()

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 border-b bg-background">
                <div className="container flex h-16 items-center px-4">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="Logo" width={40} height={40} className="rounded-md" />
                        <span className="text-xl font-bold">EduPlateforme</span>
                    </div>
                    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
                        <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                            Accueil
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Tableau de bord
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Mes cours
                        </Link>
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">{user && <UserNav />}</div>
                </div>
            </header>
            <main className="flex-1">{children}</main>
        </div>
    )
}
