"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { FileUpload } from "@/components/file-upload"

interface Module {
    id: string
    title: string
    description?: string
    order: number
    course_id: string
    documents?: Document[]
}

interface Document {
    id: string
    title: string
    type: string
    url: string
    module_id: string
}

interface CourseContentProps {
    modules: Module[]
}

export function CourseContent({ modules }: CourseContentProps) {
    return (
        <div>
            <Accordion type="single" collapsible className="w-full">
                {modules.map((module) => (
                    <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="text-lg font-medium">{module.title}</AccordionTrigger>
                        <AccordionContent>
                            {module.description && <p className="mb-4 text-muted-foreground">{module.description}</p>}

                            <div className="space-y-4">
                                {module.documents?.map((doc) => (
                                    <Card key={doc.id} className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
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
                                                        className="h-5 w-5 text-primary"
                                                    >
                                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                                        <polyline points="14 2 14 8 20 8" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{doc.title}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {doc.type.toUpperCase()} - Cliquez pour télécharger
                                                    </p>
                                                </div>
                                            </div>
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href={doc.url} download>
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
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="7 10 12 15 17 10" />
                                                        <line x1="12" x2="12" y1="15" y2="3" />
                                                    </svg>
                                                    Télécharger
                                                </Link>
                                            </Button>
                                        </div>
                                    </Card>
                                ))}

                                {!module.documents?.length && (
                                    <p className="text-center py-4 text-muted-foreground">Aucun document disponible pour ce module</p>
                                )}

                                <div className="mt-6 border-t pt-6">
                                    <h4 className="mb-4 font-medium">Soumettre un travail</h4>
                                    <FileUpload moduleId={module.id} />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {!modules.length && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium">Aucun contenu disponible</h3>
                    <p className="text-muted-foreground">Le contenu du cours sera bientôt disponible</p>
                </div>
            )}
        </div>
    )
}

