"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { courseService } from "@/lib/api"

interface Grade {
    id: string
    title: string
    grade: number | null
    max_grade: number
    feedback: string | null
    percentage: number
    created_at: string
}

interface CourseGradesProps {
    courseId: string
}

export function CourseGrades({ courseId }: CourseGradesProps) {
    const [grades, setGrades] = useState<Grade[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGrades() {
            try {
                const gradesData = await courseService.getGrades(courseId)
                setGrades(gradesData || [])
            } catch (error) {
                console.error("Erreur lors de la récupération des notes:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchGrades()
    }, [courseId])

    // Calculer la note totale
    const totalPercentage = grades.reduce((acc, grade) => acc + grade.percentage, 0)
    const weightedGrades = grades.reduce((acc, grade) => {
        if (grade.grade !== null) {
            return acc + (grade.grade / grade.max_grade) * grade.percentage
        }
        return acc
    }, 0)

    const totalGrade = totalPercentage > 0 ? (weightedGrades / totalPercentage) * 100 : 0

    if (loading) {
        return <div className="text-center py-8">Chargement des notes...</div>
    }

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Élément d'évaluation</TableHead>
                            <TableHead>Pondération</TableHead>
                            <TableHead>Note</TableHead>
                            <TableHead>Pourcentage</TableHead>
                            <TableHead>Feedback</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {grades.map((grade) => (
                            <TableRow key={grade.id}>
                                <TableCell className="font-medium">{grade.title}</TableCell>
                                <TableCell>{grade.percentage}%</TableCell>
                                <TableCell>{grade.grade !== null ? `${grade.grade}/${grade.max_grade}` : "-"}</TableCell>
                                <TableCell>
                                    {grade.grade !== null ? `${((grade.grade / grade.max_grade) * 100).toFixed(1)}%` : "-"}
                                </TableCell>
                                <TableCell>{grade.feedback || "-"}</TableCell>
                            </TableRow>
                        ))}

                        {grades.length > 0 && (
                            <TableRow className="font-medium">
                                <TableCell>Total</TableCell>
                                <TableCell>{totalPercentage}%</TableCell>
                                <TableCell colSpan={2}>{totalGrade.toFixed(1)}%</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )}

                        {grades.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                                    Aucune note disponible pour ce cours
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

