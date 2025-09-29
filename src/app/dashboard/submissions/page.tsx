import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function SubmissionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-6 w-6" />
          Submissions Page
        </CardTitle>
        <CardDescription>
          This is where submissions will be displayed and managed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for the submissions page is under construction.</p>
      </CardContent>
    </Card>
  );
}
