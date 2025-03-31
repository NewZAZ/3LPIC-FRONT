"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { CourseCard } from "@/components/course-card"
import { useAuth } from "@/lib/auth-context"
import { courseService } from "@/lib/api"

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const [courses, setCourses] = useState<any[]>([])
    const [loadingCourses, setLoadingCourses] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        if (!loading && !user) {
            router.push("/login")
            return
        }

        // Charger les cours
        const fetchCourses = async () => {
            try {
                const coursesData = await courseService.getCourses()
                setCourses(coursesData)
            } catch (error) {
                console.error("Erreur lors du chargement des cours:", error)
            } finally {
                setLoadingCourses(false)
            }
        }

        if (user) {
            fetchCourses()
        }
    }, [user, loading, router])

    if (loading || !user) {
        return <div className="flex min-h-screen items-center justify-center">Chargement...</div>
    }

    return (
        <DashboardLayout>
            <div className="container px-4 py-6 md:py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Bonjour {user.full_name || user.email} ! 👋</h1>
                </div>

                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher des cours"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        <button className="absolute right-0 top-0 h-full px-3 text-muted-foreground">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </button>
                    </div>
                </div>

                <h2 className="mb-6 text-2xl font-bold">Mes cours</h2>

                {loadingCourses ? (
                    <div className="text-center py-8">Chargement des cours...</div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}

                        {!courses.length && (
                            <div className="col-span-full text-center py-12">
                                <h3 className="text-lg font-medium">Aucun cours disponible pour le moment</h3>
                                <p className="text-muted-foreground">Les cours seront bientôt disponibles</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

