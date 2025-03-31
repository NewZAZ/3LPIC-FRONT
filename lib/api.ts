// Service API pour communiquer avec le backend
const API_URL = "http://127.0.0.1:3333"

interface User {
    id: string
    email: string
    fullName?: string
}

const handleApiError = (error: any) => {
    console.error("API Error:", error)
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message
    }
    return "Une erreur est survenue lors de la communication avec le serveur"
}

const fetchWithCredentials = (url: string, options: RequestInit = {}) => {
    return fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
        },
    })
}

export const authService = {
    async login(email: string, password: string): Promise<User> {
        try {
            const response = await fetchWithCredentials(`${API_URL}/auth/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erreur de connexion")
            }

            const data = await response.json()
            return data.user
        } catch (error) {
            throw new Error(handleApiError(error))
        }
    },

    async register(fullName: string, email: string, password: string): Promise<User> {
        try {
            const response = await fetchWithCredentials(`${API_URL}/auth/register`, {
                method: "POST",
                body: JSON.stringify({ fullName: fullName, email, password }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erreur d'inscription")
            }

            const data = await response.json()
            return data.user
        } catch (error) {
            throw new Error(handleApiError(error))
        }
    },

    async logout() {
        try {
            await fetchWithCredentials(`${API_URL}/auth/logout`, {
                method: "POST",
            })
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
        }
    },

    async getSession(): Promise<User | null> {
        try {
            const response = await fetchWithCredentials(`${API_URL}/auth/session`)

            if (!response.ok) {
                return null
            }

            const data = await response.json()
            return data.user || null
        } catch (error) {
            console.error("Erreur lors de la vérification de la session:", error)
            return null
        }
    },
}

export const uploadService = {
    async uploadFile(file: File, moduleId: string): Promise<any> {
        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("moduleId", moduleId)

            const response = await fetch(`${API_URL}/upload`, {
                method: "POST",
                credentials: "include", // Inclut les cookies
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erreur lors du téléchargement")
            }

            return await response.json()
        } catch (error) {
            throw new Error(handleApiError(error))
        }
    },
}

// Service pour les cours
export const courseService = {
    async getCourses(): Promise<any[]> {
        try {
            const response = await fetchWithCredentials(`${API_URL}/courses`)

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erreur lors de la récupération des cours")
            }

            return await response.json()
        } catch (error) {
            console.error("Erreur:", error)
            return []
        }
    },

    async getCourseById(courseId: string): Promise<any> {
        try {
            const response = await fetchWithCredentials(`${API_URL}/courses/${courseId}`)

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erreur lors de la récupération du cours")
            }

            return await response.json()
        } catch (error) {
            console.error("Erreur:", error)
            return null
        }
    },

    async getCourseModules(courseId: string): Promise<any[]> {
        try {
            const response = await fetchWithCredentials(`${API_URL}/courses/${courseId}/modules`)

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erreur lors de la récupération des modules")
            }

            return await response.json()
        } catch (error) {
            console.error("Erreur:", error)
            return []
        }
    },

    async getGrades(courseId: string): Promise<any[]> {
        try {
            const response = await fetchWithCredentials(`${API_URL}/courses/${courseId}/grades`)

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erreur lors de la récupération des notes")
            }

            return await response.json()
        } catch (error) {
            console.error("Erreur:", error)
            return []
        }
    },
}

