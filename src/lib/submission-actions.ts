"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { revalidatePath } from "next/cache";
import type { Submission, Task } from "./types";

const contentDirectory = path.join(process.cwd(), "samplemd");
const submissionsFilePath = path.join(contentDirectory, "submissions.md");
const tasksFilePath = path.join(contentDirectory, "tasks.md");

type CreateSubmissionInput = {
    submissionId?: number; // ID of the submission to update
    taskId: number;
    taskTitle: string;
    assigneeId: number;
    assigneeName: string;
};

// --- Submissions File ---
async function readSubmissionsFile(): Promise<{ content: string; data: { items: Submission[] } }> {
  const fileContents = await fs.readFile(submissionsFilePath, "utf8");
  const { content, data } = matter(fileContents);
  return { content, data: data as { items: Submission[] } };
}

async function writeSubmissionsFile(submissions: Submission[], originalContent: string): Promise<void> {
  const newData = matter.stringify(originalContent, { items: submissions });
  await fs.writeFile(submissionsFilePath, newData);
}


// --- Tasks File ---
async function readTasksFile(): Promise<{ content: string; data: { items: Task[] } }> {
  const fileContents = await fs.readFile(tasksFilePath, "utf8");
  const { content, data } = matter(fileContents);
  return { content, data: data as { items: Task[] } };
}

async function writeTasksFile(tasks: Task[], originalContent: string): Promise<void> {
  const newData = matter.stringify(originalContent, { items: tasks });
  await fs.writeFile(tasksFilePath, newData);
}


// --- Server Action ---
export async function createSubmissionAction(input: CreateSubmissionInput): Promise<void> {
    const { data: submissionsData, content: submissionsContent } = await readSubmissionsFile();
    let submissions = submissionsData.items || [];
    
    const submissionIndex = input.submissionId ? submissions.findIndex(s => s.id === input.submissionId) : -1;

    if (submissionIndex !== -1) {
        // Update existing submission
        submissions[submissionIndex] = {
            ...submissions[submissionIndex],
            submittedAt: new Date().toISOString(),
            status: "Pending Score",
            // Potentially update fileUrl if real uploads were supported
        };
    } else {
        // Create new submission record
        const newSubmission: Submission = {
            id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1,
            taskId: input.taskId,
            taskTitle: input.taskTitle,
            assigneeId: input.assigneeId,
            assigneeName: input.assigneeName,
            submittedAt: new Date().toISOString(),
            status: "Pending Score",
            fileUrl: "/mock-deliverable.txt", // Using a mock file URL
        };
        submissions.push(newSubmission);
    }
    
    await writeSubmissionsFile(submissions, submissionsContent);
    
    // Update the task status to 'Submitted'
    const { data: tasksData, content: tasksContent } = await readTasksFile();
    const tasks = tasksData.items || [];
    const taskIndex = tasks.findIndex(t => t.id === input.taskId);

    if (taskIndex !== -1 && tasks[taskIndex].status !== "Submitted") {
        tasks[taskIndex].status = "Submitted";
        await writeTasksFile(tasks, tasksContent);
    }

    // Revalidate paths to refresh data across the app
    revalidatePath("/dashboard/submissions");
    revalidatePath("/dashboard/orchestrator-tasks");
    revalidatePath("/dashboard"); 
    revalidatePath("/dashboard/scores");
    revalidatePath("/dashboard/analytical");
}
