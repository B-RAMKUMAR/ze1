import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";

export default function TasksPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6" />
          Tasks Page
        </CardTitle>
        <CardDescription>
          This is where tasks will be displayed and managed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for the tasks page is under construction.</p>
      </CardContent>
    </Card>
  );
}
