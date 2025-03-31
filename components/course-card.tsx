import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Course {
    id: string
    title: string
    image: string
    category: string
    ects: number
}

interface CourseCardProps {
    course: Course
}

export function CourseCard({ course }: CourseCardProps) {
    return (
        <Link href={`/dashboard/courses/${course.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video relative">
                    <Image
                        src={course.image || "/placeholder.svg?height=200&width=400"}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                    <Badge className="absolute right-2 top-2 bg-primary">{course.ects} ECTS</Badge>
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.category}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

