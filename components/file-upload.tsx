"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { uploadService } from "@/lib/api"

interface FileUploadProps {
    courseId: string
    moduleId: string
}

export function FileUpload({ courseId, moduleId }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) {
            toast.error("Erreur", {
                description: "Veuillez sélectionner un fichier",
            })
            return
        }

        setUploading(true)

        try {
            await uploadService.uploadFile(file, courseId, moduleId)

            toast.success("Succès", {
                description: "Votre travail a été soumis avec succès",
            })

            setFile(null)
            const fileInput = document.getElementById("file-upload") as HTMLInputElement
            if (fileInput) fileInput.value = ""
        } catch (error: any) {
            toast.error("Erreur", {
                description: error.message || "Une erreur est survenue lors du téléchargement",
            })
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="file-upload">Fichier</Label>
                <Input id="file-upload" type="file" onChange={handleFileChange} disabled={uploading} />
            </div>

            {file && (
                <div className="text-sm">
                    <p>
                        Fichier sélectionné: <span className="font-medium">{file.name}</span>
                    </p>
                    <p>
                        Taille: <span className="font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </p>
                </div>
            )}

            <Button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? "Téléchargement en cours..." : "Soumettre le travail"}
            </Button>
        </div>
    )
}

