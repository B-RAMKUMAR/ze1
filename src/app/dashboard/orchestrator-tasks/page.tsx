import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";

export default function OrchestratorTasksPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6" />
          Tasks Management
        </CardTitle>
        <CardDescription>
          This is where task management for the orchestrator will be displayed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for task management is under construction.</p>
      </CardContent>
    </Card>
  );
}
