import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getSubmissions } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Edit } from "lucide-react";
import ScoreSubmissionForm from "@/components/dashboard/score-submission-form";

export default async function GiveScorePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "Scorer") {
    redirect("/dashboard");
  }
  
  const submissions = await getSubmissions();
  const pendingSubmissions = submissions.filter(s => s.status === 'Pending Score');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-6 w-6" />
          Score Submissions
        </CardTitle>
        <CardDescription>
          Review apprentice deliverables and provide scores. Submissions listed here are pending your review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScoreSubmissionForm submissions={pendingSubmissions} scorerName={user.name} />
      </CardContent>
    </Card>
  );
}