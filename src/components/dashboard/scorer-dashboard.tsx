import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import type { User, Submission } from "@/lib/types";
  import { Button } from "../ui/button";
  import { Badge } from "../ui/badge";
  import { Download, Edit } from "lucide-react";
  
  type ScorerDashboardProps = {
    user: User;
    submissions: Submission[];
  };
  
  export default function ScorerDashboard({ user, submissions }: ScorerDashboardProps) {
    const pendingSubmissions = submissions.filter(s => s.status === 'Pending Score');
    const scoredSubmissions = submissions.filter(s => s.status === 'Scored');
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user.name}!</CardTitle>
            <CardDescription>
              Here are the latest submissions awaiting your review.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Pending Submissions</CardTitle>
                <CardDescription>
                    These deliverables from apprentices are ready for scoring.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Apprentice</TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Submitted At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingSubmissions.length > 0 ? pendingSubmissions.map(sub => (
                             <TableRow key={sub.id}>
                                <TableCell>{sub.assigneeName}</TableCell>
                                <TableCell>{sub.taskTitle}</TableCell>
                                <TableCell>{new Date(sub.submittedAt).toLocaleString()}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Score
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No pending submissions.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recently Scored</CardTitle>
                <CardDescription>
                    A log of your recently scored submissions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Apprentice</TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scoredSubmissions.length > 0 ? scoredSubmissions.map(sub => (
                            <TableRow key={sub.id}>
                                <TableCell>{sub.assigneeName}</TableCell>
                                <TableCell>{sub.taskTitle}</TableCell>
                                <TableCell>
                                    <Badge>{sub.score}</Badge>
                                </TableCell>
                            </TableRow>
                        )) : (
                             <TableRow>
                                <TableCell colSpan={3} className="text-center">No submissions have been scored yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    );
  }
  