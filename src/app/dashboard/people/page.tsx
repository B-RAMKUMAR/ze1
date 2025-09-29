import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users } from "lucide-react";

export default function PeoplePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          People Management
        </CardTitle>
        <CardDescription>
          This is where people management will be displayed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for people management is under construction.</p>
      </CardContent>
    </Card>
  );
}
