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
import { ClipboardCheck, PlusCircle, Edit, Trash2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TaskManagement({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [open, setOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [phase, setPhase] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Not Started");
  const [eta, setEta] = useState<Date>();

  const handleCreateTask = () => {
    // Basic validation
    if (!title || !phase || !eta) {
        alert("Please fill out all required fields.");
        return;
    }
    
    const newTask: Task = {
        id: tasks.length + 101, // simple ID generation
        title,
        phase,
        objective: "New task objective", // Placeholder
        eta: eta.toISOString(),
        status,
        assigneeId: 1, // Placeholder
        description: "New task description", // Placeholder
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setOpen(false);
    
    // Reset form
    setTitle("");
    setPhase("");
    setStatus("Not Started");
    setEta(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Fill in the details below to create and publish a new task.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Task Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., D3-T1: Final Model Deployment"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phase" className="text-right">
                  Phase
                </Label>
                <Input
                  id="phase"
                  value={phase}
                  onChange={(e) => setPhase(e.target.value)}
                  className="col-span-3"
                  placeholder="Phase 3: Ownership"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select onValueChange={(value: Task["status"]) => setStatus(value)} defaultValue={status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="eta" className="text-right">
                  Deadline (ETA)
                </Label>
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
                        <Calendar
                            mode="single"
                            selected={eta}
                            onSelect={setEta}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTask}>Publish Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
    </div>
  );
}
