import { getPlaybook } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function PlaybookPage() {
  const { content, title } = await getPlaybook();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Rocket className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold tracking-tighter">ZEROS Launchpad</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold tracking-tighter">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-invert max-w-none prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10 prose-h3:text-xl prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
