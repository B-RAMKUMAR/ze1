
"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createTaskAction, updateTaskAction, deleteTaskAction } from "@/lib/task-actions";
import { useToast } from "@/hooks/use-toast";

export default function TaskManagement({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { toast } = useToast();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [title, setTitle] = useState("");
  const [phase, setPhase] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Not Started");
  const [eta, setEta] = useState<Date>();

  const resetForm = () => {
    setTitle("");
    setPhase("");
    setDescription("");
    setObjective("");
    setStatus("Not Started");
    setEta(undefined);
    setSelectedTask(null);
  };

  const handleCreateClick = () => {
    resetForm();
    setCreateDialogOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setPhase(task.phase);
    setDescription(task.description);
    setObjective(task.objective)
    setStatus(task.status);
    setEta(new Date(task.eta));
    setEditDialogOpen(true);
  };
  
  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleFormSubmit = async () => {
    if (!title || !phase || !eta || !description || !objective) {
        toast({
          variant: "destructive",
          title: "Missing Fields",
          description: "Please fill out all required fields.",
        });
        return;
    }
    
    setIsPending(true);

    const taskData = {
        id: selectedTask ? selectedTask.id : Date.now(), // Use a temporary ID for new tasks
        title,
        phase,
        objective,
        description,
        status,
        eta: eta.toISOString(),
        assigneeId: 1, // Placeholder
    };

    try {
      if (selectedTask) { // Updating
          await updateTaskAction(taskData);
          setTasks(tasks.map(t => t.id === selectedTask.id ? taskData : t));
          toast({ title: "Task Updated", description: `"${title}" has been successfully updated.` });
          setEditDialogOpen(false);
      } else { // Creating
          await createTaskAction(taskData);
          setTasks(prevTasks => [...prevTasks, taskData]);
          toast({ title: "Task Created", description: `"${title}" has been successfully published.` });
          setCreateDialogOpen(false);
      }
    } catch (error) {
       toast({
          variant: "destructive",
          title: "An Error Occurred",
          description: "Failed to save the task. Please try again.",
        });
    }

    setIsPending(false);
    resetForm();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTask) return;
    
    setIsPending(true);

    try {
        await deleteTaskAction(selectedTask.id);
        setTasks(tasks.filter(t => t.id !== selectedTask.id));
        toast({ title: "Task Deleted", description: `"${selectedTask.title}" has been deleted.` });
    } catch (error) {
        toast({
          variant: "destructive",
          title: "An Error Occurred",
          description: "Failed to delete the task. Please try again.",
        });
    }
    setIsPending(false);
    setSelectedTask(null);
  };

  const TaskForm = (
    <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Task Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" placeholder="e.g., D3-T1: Final Model Deployment"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phase" className="text-right">Phase</Label>
            <Input id="phase" value={phase} onChange={(e) => setPhase(e.target.value)} className="col-span-3" placeholder="Phase 3: Ownership"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="objective" className="text-right">Objective</Label>
            <Input id="objective" value={objective} onChange={(e) => setObjective(e.target.value)} className="col-span-3" placeholder="Task's main goal"/>
        </div>
         <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" placeholder="Detailed task description"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select onValueChange={(value: Task["status"]) => setStatus(value)} value={status}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                    <SelectItem value="Scored">Scored</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eta" className="text-right">Deadline (ETA)</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !eta && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {eta ? format(eta, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={eta} onSelect={setEta} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateClick}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Fill in the details below to create and publish a new task.
              </DialogDescription>
            </DialogHeader>
            {TaskForm}
            <DialogFooter>
               <Button onClick={() => setCreateDialogOpen(false)} variant="outline">Cancel</Button>
              <Button onClick={handleFormSubmit} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publish Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Update the details for this task.
                    </DialogDescription>
                </DialogHeader>
                {TaskForm}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleFormSubmit} disabled={isPending}>
                       {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                       Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

       <AlertDialog>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the task
                    "{selectedTask?.title}".
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedTask(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>

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
                    <Badge variant={task.status === "Overdue" ? "destructive" : "outline"}>
                    {task.status}
                    </Badge>
                </TableCell>
                <TableCell>{format(new Date(task.eta), "PPp")}</TableCell>
                <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditClick(task)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit Task</span>
                    </Button>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(task)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Task</span>
                        </Button>
                    </AlertDialogTrigger>
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
      </AlertDialog>
    </div>
  );
}
