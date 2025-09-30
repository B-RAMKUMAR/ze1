import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getTasks } from "@/lib/data";
import { ClipboardCheck } from "lucide-react";
import TaskManagement from "@/components/dashboard/task-management";

export default async function OrchestratorTasksPage() {
  const tasks = await getTasks();

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6" />
            Task Management
          </CardTitle>
          <CardDescription>
            Create, view, and manage all tasks for the ZEROS program.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <TaskManagement initialTasks={tasks} />
      </CardContent>
    </Card>
  );
}
