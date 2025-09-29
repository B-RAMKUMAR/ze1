import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getSubmissions, getTasks, getUsers } from "@/lib/data";
import {
  LineChart,
  ClipboardCheck,
  Clock,
  CheckCircle,
  TrendingUp,
  Trophy,
  ArrowDown,
  ArrowUp,
  User,
} from "lucide-react";
import type { Submission, Task, User as UserType } from "@/lib/types";

// Helper function to format names or return 'N/A'
const getUserName = (users: UserType[], id: number | undefined) => {
    if (id === undefined) return 'N/A';
    return users.find(u => u.id === id)?.name || 'Unknown User';
}

export default async function AnalyticalDashboardPage() {
  const submissions = await getSubmissions();
  const tasks = await getTasks();
  const users = await getUsers();

  const totalSubmissions = submissions.length;
  const scoredSubmissions = submissions.filter(s => s.status === 'Scored' && s.score !== undefined);
  const totalScored = scoredSubmissions.length;
  const totalTasks = tasks.length;

  const lateSubmissions = submissions.filter(submission => {
    const task = tasks.find(t => t.id === submission.taskId);
    if (!task) return false;
    return new Date(submission.submittedAt) > new Date(task.eta);
  });
  const lateSubmissionCount = lateSubmissions.length;

  let highestScoreSubmission: Submission | undefined;
  let lowestScoreSubmission: Submission | undefined;

  if (totalScored > 0) {
    highestScoreSubmission = scoredSubmissions.reduce((max, s) => s.score! > max.score! ? s : max);
    lowestScoreSubmission = scoredSubmissions.reduce((min, s) => s.score! < min.score! ? s : min);
  }

  const apprenticeScores: { [key: number]: { totalScore: number; count: number; name: string } } = {};
  for (const submission of scoredSubmissions) {
    if (!apprenticeScores[submission.assigneeId]) {
      apprenticeScores[submission.assigneeId] = { totalScore: 0, count: 0, name: submission.assigneeName };
    }
    apprenticeScores[submission.assigneeId].totalScore += submission.score!;
    apprenticeScores[submission.assigneeId].count += 1;
  }

  const topPerformers = Object.values(apprenticeScores)
    .map(apprentice => ({
      name: apprentice.name,
      averageScore: apprentice.totalScore / apprentice.count,
    }))
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 5);

  const perTaskStats = tasks.map(task => {
    const taskSubmissions = submissions.filter(s => s.taskId === task.id);
    const lateCount = taskSubmissions.filter(s => new Date(s.submittedAt) > new Date(task.eta)).length;
    const scoredCount = taskSubmissions.filter(s => s.status === 'Scored').length;
    return {
        id: task.id,
        title: task.title,
        submissions: taskSubmissions.length,
        late: lateCount,
        scored: scoredCount,
    }
  });


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <LineChart className="h-8 w-8" />
            Analytical Dashboard
          </CardTitle>
          <CardDescription>
            Insights into apprentice submissions, performance, and task progress.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">tasks assigned in the program</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">{totalScored} scored</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Submissions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lateSubmissionCount}</div>
            <p className="text-xs text-muted-foreground">submissions past ETA</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
                {highestScoreSubmission && lowestScoreSubmission ? (
                    <div className="flex space-x-4">
                        <div>
                            <p className="text-xs text-muted-foreground flex items-center"><ArrowUp className="h-3 w-3 mr-1 text-green-500"/> Highest</p>
                            <p className="text-lg font-bold">{highestScoreSubmission.score}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground flex items-center"><ArrowDown className="h-3 w-3 mr-1 text-red-500"/> Lowest</p>
                            <p className="text-lg font-bold">{lowestScoreSubmission.score}</p>
                        </div>
                    </div>
                ) : <p className="text-sm text-muted-foreground">No scores yet.</p>}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Top 5 Performers
                </CardTitle>
                <CardDescription>Based on average submission score.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Apprentice</TableHead>
                            <TableHead className="text-right">Average Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topPerformers.length > 0 ? topPerformers.map((p, index) => (
                             <TableRow key={p.name}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{p.name}</TableCell>
                                <TableCell className="text-right"><Badge variant="default">{p.averageScore.toFixed(2)}</Badge></TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">No scores available to rank performers.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5"/>
                    Scored Submissions
                </CardTitle>
                <CardDescription>A list of all submissions that have received a score.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Apprentice</TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scoredSubmissions.length > 0 ? scoredSubmissions.map(s => (
                            <TableRow key={s.id}>
                                <TableCell>{s.assigneeName}</TableCell>
                                <TableCell>{s.taskTitle}</TableCell>
                                <TableCell className="text-right"><Badge variant="secondary">{s.score}</Badge></TableCell>
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

       <Card>
            <CardHeader>
                <CardTitle>Per-Task Statistics</CardTitle>
                <CardDescription>Breakdown of submission status for each individual task.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task Title</TableHead>
                            <TableHead>Submissions</TableHead>
                            <TableHead>Late</TableHead>
                            <TableHead>Scored</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {perTaskStats.map(stat => (
                             <TableRow key={stat.id}>
                                <TableCell className="font-medium">{stat.title}</TableCell>
                                <TableCell>{stat.submissions}</TableCell>
                                <TableCell>{stat.late > 0 ? <Badge variant="destructive">{stat.late}</Badge> : stat.late}</TableCell>
                                <TableCell>{stat.scored}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
