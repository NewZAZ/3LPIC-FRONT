"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/api"

interface User {
    id: string
    email: string
    full_name?: string
}

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (fullName: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté
        const checkAuth = async () => {
            try {
                const currentUser = await authService.getSession()
                setUser(currentUser)
            } catch (error) {
                console.error("Erreur lors de la vérification de la session:", error)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const user = await authService.login(email, password)
            setUser(user)
            router.push("/dashboard")
        } catch (error) {
            throw error
        }
    }

    const register = async (fullName: string, email: string, password: string) => {
        try {
            const user = await authService.register(fullName, email, password)
            setUser(user)
            router.push("/dashboard")
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        try {
            await authService.logout()
            setUser(null)
            router.push("/login")
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
        }
    }

    return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

