"use client";

import type { Task, User } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import { Clock, Upload, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createSubmissionAction } from "@/lib/submission-actions";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateCountdown(eta: string): Countdown | null {
  const difference = +new Date(eta) - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
}

export default function SubmissionForm({ task, user }: { task: Task; user: User }) {
  const [countdown, setCountdown] = useState<Countdown | null>(() =>
    calculateCountdown(task.eta)
  );
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(task.eta));
    }, 1000);

    return () => clearInterval(timer);
  }, [task.eta]);

  const handleSubmit = async () => {
    startTransition(async () => {
      try {
        await createSubmissionAction({
          taskId: task.id,
          taskTitle: task.title,
          assigneeId: user.id,
          assigneeName: user.name,
        });

        toast({
          title: "Submission Successful!",
          description: `Your deliverable for "${task.title}" has been submitted.`,
        });
        setIsSubmitted(true);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "There was an error submitting your deliverable. Please try again.",
        });
      }
    });
  };
  
  if (isSubmitted) {
    return (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>{task.objective}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <p className="font-semibold">Successfully Submitted</p>
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="bg-muted/50">
        <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.objective}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             {countdown && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                        Time left: {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                    </span>
                </div>
            )}
            <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">This action will mark your task as submitted. The actual file upload is simulated.</p>
                <Button onClick={handleSubmit} disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" /> Mark as Submitted
                        </>
                    )}
                </Button>
            </div>
        </CardContent>
    </Card>
  )
}
