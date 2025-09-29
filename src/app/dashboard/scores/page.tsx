import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Award } from "lucide-react";

export default function ScoresPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-6 w-6" />
          Scores Page
        </CardTitle>
        <CardDescription>
          This is where scores will be displayed and managed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for the scores page is under construction.</p>
      </CardContent>
    </Card>
  );
}
