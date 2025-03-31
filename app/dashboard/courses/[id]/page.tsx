"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"
import { CourseContent } from "@/components/course-content"
import { CourseGrades } from "@/components/course-grades"
import { useAuth } from "@/lib/auth-context"
import { courseService } from "@/lib/api"

export default function CoursePage() {
    const { user, loading } = useAuth()
    const [course, setCourse] = useState<any>(null)
    const [modules, setModules] = useState<any[]>([])
    const [loadingCourse, setLoadingCourse] = useState(true)
    const router = useRouter()
    const params = useParams()
    const courseId = params?.id as string

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
            return
        }

        // Charger les détails du cours et ses modules
        const fetchCourseData = async () => {
            try {
                const courseData = await courseService.getCourseById(courseId)
                if (!courseData) {
                    router.push("/dashboard")
                    return
                }
                setCourse(courseData)

                const modulesData = await courseService.getCourseModules(courseId)
                setModules(modulesData)
            } catch (error) {
                console.error("Erreur lors du chargement du cours:", error)
            } finally {
                setLoadingCourse(false)
            }
        }

        if (user && courseId) {
            fetchCourseData()
        }
    }, [user, loading, courseId, router])

    if (loading || !user || loadingCourse) {
        return <div className="flex min-h-screen items-center justify-center">Chargement...</div>
    }

    if (!course) {
        return <div className="flex min-h-screen items-center justify-center">Cours non trouvé</div>
    }

    return (
        <DashboardLayout>
            <div className="container px-4 py-6 md:py-10">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/dashboard">
                            <Button variant="outline" size="sm">
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
                                    className="h-4 w-4 mr-1"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                Retour
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                </div>

                <Tabs defaultValue="content">
                    <TabsList className="mb-8">
                        <TabsTrigger value="content">Cours</TabsTrigger>
                        <TabsTrigger value="grades">Notes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content">
                        <CourseContent modules={modules} />
                    </TabsContent>
                    <TabsContent value="grades">
                        <CourseGrades courseId={courseId} />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}

