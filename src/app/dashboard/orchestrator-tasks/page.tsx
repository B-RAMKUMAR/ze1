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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTasks } from "@/lib/data";
import { ClipboardCheck, PlusCircle, Edit, Trash2 } from "lucide-react";
import { format } from 'date-fns';

export default async function OrchestratorTasksPage() {
  const tasks = await getTasks();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6" />
            Task Management
            </CardTitle>
            <CardDescription>
            Create, view, and manage all tasks for the ZEROS program.
            </CardDescription>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Task
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Title</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline (ETA)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length > 0 ? tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.phase}</TableCell>
                <TableCell>
                  <Badge variant={task.status === 'Overdue' ? 'destructive' : 'outline'}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(task.eta), "PPp")}</TableCell>
                <TableCell className="text-right space-x-2">
                   <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Task</span>
                   </Button>
                   <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Task</span>
                   </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No tasks have been created yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
