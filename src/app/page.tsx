import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Rocket, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === "hero");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Rocket className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold tracking-tighter">ZEROS Launchpad</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/playbook">
            <Button variant="ghost">Playbook</Button>
          </Link>
          <Link href="/login">
            <Button>
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
           {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover z-0"
                data-ai-hint={heroImage.imageHint}
                priority
              />
           )}
          <div className="container px-4 md:px-6 z-10 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Welcome, Apprentice</div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mt-2">
                  Launch Your Journey with ZEROS
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mt-4">
                  Your central hub for program playbooks, onboarding, tasks, and progress tracking. Let's get started.
                </p>
                <div className="mt-6">
                  <Link href="/login">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Begin Onboarding</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Modules</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Toolkit for Success</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the essential components of the ZEROS program, designed to guide you from apprentice to pro.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
              <Card className="transform hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-accent rounded-md p-3 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-2xl">Playbook</CardTitle>
                  </div>
                  <CardDescription>
                    The complete guide to the ZEROS Program. Understand the phases, objectives, and weekly schedules that will shape your journey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/playbook">
                    <Button className="w-full">View Playbook</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="transform hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-accent rounded-md p-3 flex items-center justify-center">
                      <Rocket className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-2xl">Program Onboarding</CardTitle>
                  </div>
                  <CardDescription>
                    Start your journey here. Accept the terms, request access, and get ready to dive into your personalized dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/login">
                    <Button className="w-full">Start Onboarding</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 ZEROS Launchpad. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
