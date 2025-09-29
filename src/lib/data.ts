import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { User, Task, Announcement, Submission, AccessRequest } from "@/lib/types";

const contentDirectory = path.join(process.cwd(), "samplemd");

async function readAndParseMarkdown<T>(fileName: string): Promise<{ data: T, content: string }> {
  const filePath = path.join(contentDirectory, fileName);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const htmlContent = await marked(content);
    return { data: data.items as T, content: htmlContent };
  } catch (error) {
    console.error(`Error reading or parsing ${fileName}:`, error);
    // Provide a default structure on error to prevent crashes
    return { data: [] as unknown as T, content: "" };
  }
}

export async function getUsers(): Promise<User[]> {
  const { data } = await readAndParseMarkdown<{ items: User[] }>("users.md");
  return data.items || [];
}

export async function getUserById(id: number): Promise<User | undefined> {
    const users = await getUsers();
    return users.find(user => user.id === id);
}

export async function getTasks(): Promise<Task[]> {
  const { data } = await readAndParseMarkdown<{ items: Task[] }>("tasks.md");
  return data.items || [];
}

export async function getTasksForUser(userId: number): Promise<Task[]> {
  const tasks = await getTasks();
  return tasks.filter(task => task.assigneeId === userId);
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const { data } = await readAndParseMarkdown<{ items: Announcement[] }>("announcements.md");
  return (data.items || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPlaybook() {
    const filePath = path.join(contentDirectory, "playbook.md");
    const fileContents = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(fileContents);
    const htmlContent = await marked(content);
    return { content: htmlContent, title: data.title as string };
}

export async function getSubmissions(): Promise<Submission[]> {
    const { data } = await readAndParseMarkdown<{ items: Submission[] }>("submissions.md");
    return data.items || [];
}

export async function getAccessRequests(): Promise<AccessRequest[]> {
    const { data } = await readAndParseMarkdown<{ items: AccessRequest[] }>("requests.md");
    return data.items || [];
}
