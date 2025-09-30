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
    // 1. Read existing submissions
    const { data: submissionsData, content: submissionsContent } = await readSubmissionsFile();
    const submissions = submissionsData.items || [];

    // 2. Create new submission record
    const newSubmission: Submission = {
        id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1,
        taskId: input.taskId,
        taskTitle: input.taskTitle,
        assigneeId: input.assigneeId,
        assigneeName: input.assigneeName,
        submittedAt: new Date().toISOString(),
        status: "Pending Score",
        fileUrl: "/mock-deliverable.txt", // Using a mock file URL as per the plan
    };

    // 3. Add new submission and write back to file
    const updatedSubmissions = [...submissions, newSubmission];
    await writeSubmissionsFile(updatedSubmissions, submissionsContent);
    
    // 4. Update the task status to 'Submitted'
    const { data: tasksData, content: tasksContent } = await readTasksFile();
    const tasks = tasksData.items || [];
    const taskIndex = tasks.findIndex(t => t.id === input.taskId && t.assigneeId === input.assigneeId);

    if (taskIndex !== -1) {
        tasks[taskIndex].status = "Submitted";
        await writeTasksFile(tasks, tasksContent);
    } else {
        console.warn(`Task not found for submission: taskId=${input.taskId}, assigneeId=${input.assigneeId}`);
    }

    // 5. Revalidate paths to refresh data across the app
    revalidatePath("/dashboard/submissions");
    revalidatePath("/dashboard/orchestrator-tasks");
    revalidatePath("/dashboard"); // Revalidate apprentice dashboard too
}
