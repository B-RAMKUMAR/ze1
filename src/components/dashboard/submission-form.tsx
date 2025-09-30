"use client";

import type { Task } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Clock, Upload } from "lucide-react";

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


export default function SubmissionForm({ task }: { task: Task }) {
  const [countdown, setCountdown] = useState<Countdown | null>(() =>
    calculateCountdown(task.eta)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(task.eta));
    }, 1000);

    return () => clearInterval(timer);
  }, [task.eta]);

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
                <Input type="file" className="max-w-xs" />
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit
                </Button>
            </div>
        </CardContent>
    </Card>
  )
}
