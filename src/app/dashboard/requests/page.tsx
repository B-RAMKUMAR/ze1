import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { History } from "lucide-react";

export default function RequestsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-6 w-6" />
          Access Requests Page
        </CardTitle>
        <CardDescription>
          This is where access requests will be displayed and managed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for the access requests page is under construction.</p>
      </CardContent>
    </Card>
  );
}
