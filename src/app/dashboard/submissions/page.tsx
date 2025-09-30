import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getTasksForUser } from "@/lib/data";
import { redirect } from "next/navigation";
import SubmissionForm from "@/components/dashboard/submission-form";

export default async function SubmissionsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "Apprentice") {
    redirect("/dashboard");
  }

  const allTasks = await getTasksForUser(user.id);
  const now = new Date();
  
  const actionableTasks = allTasks.filter(task => {
    const isActionableStatus = task.status === 'In Progress' || task.status === 'Not Started';
    const isNotOverdue = new Date(task.eta) > now;
    return isActionableStatus && isNotOverdue;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-6 w-6" />
          Submit Deliverable
        </CardTitle>
        <CardDescription>
          Upload your completed work for any of the active tasks listed below. 
          You can only submit before the deadline has passed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {actionableTasks.length > 0 ? (
          <div className="space-y-6">
            {actionableTasks.map(task => (
                <SubmissionForm key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">No Actionable Tasks</h3>
            <p className="text-muted-foreground mt-2">
              You have no tasks that are currently available for submission.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
