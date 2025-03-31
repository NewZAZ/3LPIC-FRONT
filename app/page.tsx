import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
      <div className="flex flex-col min-h-screen">
        <header className="container mx-auto border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} className="rounded-md" />
              <span className="text-xl font-bold">EduPlateforme</span>
            </div>
            <nav className="ml-auto flex gap-4">
              <Link href="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button>Inscription</Button>
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <section className="py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Bienvenue sur votre plateforme d&apos;apprentissage
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                    Accédez à vos cours, téléchargez les supports et soumettez vos travaux en toute simplicité.
                  </p>
                </div>
                <div className="space-x-4">
                  <Link href="/register">
                    <Button size="lg">Commencer maintenant</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg">
                      Se connecter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-muted py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Apprenez à votre rythme</h2>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Notre plateforme vous offre un accès à des cours de qualité, des supports pédagogiques et un suivi
                    personnalisé.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Apprentissage"
                      width={400}
                      height={400}
                      className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-sm text-gray-500">© 2025 EduPlateforme. Tous droits réservés.</p>
            <nav className="flex gap-4 text-sm">
              <Link href="#" className="text-gray-500 hover:underline">
                Conditions d&apos;utilisation
              </Link>
              <Link href="#" className="text-gray-500 hover:underline">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-gray-500 hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </footer>
      </div>
  )
}

