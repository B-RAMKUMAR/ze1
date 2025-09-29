import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Megaphone } from "lucide-react";

export default function OrchestratorAnnouncementsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-6 w-6" />
          Announcements
        </CardTitle>
        <CardDescription>
          This is where the announcements management for the orchestrator will be displayed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for announcements management is under construction.</p>
      </CardContent>
    </Card>
  );
}
