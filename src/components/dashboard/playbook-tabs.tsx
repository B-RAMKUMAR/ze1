"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Calendar, ClipboardCheck, Trophy, Link as LinkIcon } from "lucide-react";

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


export default function PlaybookTabs({ sections }: { sections: PlaybookSection[] }) {
    if (!sections || sections.length === 0) {
        return <p>Playbook content is not available.</p>;
    }

    return (
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
    );
}
