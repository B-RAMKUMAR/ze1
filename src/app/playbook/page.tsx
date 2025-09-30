"use client";

import { useEffect, useState } from "react";
import { getPlaybookSections } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket, Book, Calendar, ClipboardCheck, Trophy, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

type PlaybookSection = {
  title: string;
  content: string;
};

const iconMap: { [key: string]: React.ElementType } = {
  Overview: Book,
  Schedule: Calendar,
  Tasks: ClipboardCheck,
  Scoring: Trophy,
  Links: LinkIcon,
};

export default function PlaybookPage() {
  const [sections, setSections] = useState<PlaybookSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const playbookSections = await getPlaybookSections();
        setSections(playbookSections);
      } catch (error) {
        console.error("Failed to load playbook sections", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Rocket className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold tracking-tighter">
            ZEROS Launchpad
          </span>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-primary">
            ZEROS Program Playbook - Phase 0
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive guide to the objectives, schedule, and scoring of the ZEROS program.
          </p>
        </div>

        {loading ? (
          <Card className="shadow-lg">
             <CardContent className="p-6 md:p-8">
                <Skeleton className="h-10 w-full mb-6" />
                <Skeleton className="h-64 w-full" />
             </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue={sections[0]?.title || 'Overview'} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
              {sections.map((section) => {
                 const Icon = iconMap[section.title] || Book;
                return (
                  <TabsTrigger key={section.title} value={section.title} className="py-3 text-base">
                     <Icon className="mr-2 h-5 w-5"/>
                     {section.title}
                  </TabsTrigger>
                )
              })}
            </TabsList>
            {sections.map((section) => (
              <TabsContent key={section.title} value={section.title}>
                <Card className="shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <div
                      className="prose dark:prose-invert max-w-none prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:pb-4 prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-p:text-lg prose-p:leading-relaxed prose-a:text-accent hover:prose-a:text-accent/90 prose-strong:text-foreground prose-table:border prose-th:p-3 prose-td:p-3 prose-th:bg-muted"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>

      <footer className="py-6 border-t bg-background mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; 2024 Mu Sigma University ZEROS Program.
        </div>
      </footer>
    </div>
  );
}