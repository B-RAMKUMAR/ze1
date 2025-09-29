import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LineChart } from "lucide-react";

export default function AnalyticalDashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-6 w-6" />
          Analytical Dashboard
        </CardTitle>
        <CardDescription>
          This is where the analytical dashboard will be displayed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for the analytical dashboard is under construction.</p>
      </CardContent>
    </Card>
  );
}
