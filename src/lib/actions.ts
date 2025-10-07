'use server';

import { generateJournalEntry, type JournalEntryInput } from "@/ai/flows/automated-journal-entry";
import { getTasks } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export async function createJournalEntryAction() {
  try {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("User not authenticated");
    }

    const allTasks = await getTasks();
    const tasks = allTasks.filter(t => t.assigneeId === user.id);
    const recentTasksSummary = tasks.slice(0, 3).map(t => `${t.title} (${t.status})`).join(', ');

    const teamInteractionsSummary = "Discussed project architecture with the senior dev team, pair-programmed on the new UI module.";
    const skillDevelopmentSummary = "Focused on improving Next.js server actions and advanced TypeScript patterns.";

    const input: JournalEntryInput = {
      recentTasks: recentTasksSummary || 'No recent tasks to report.',
      teamInteractions: teamInteractionsSummary,
      skillDevelopment: skillDevelopmentSummary,
    };

    const result = await generateJournalEntry(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating journal entry:", error);
    return { success: false, error: "Failed to generate journal entry. Please try again." };
  }
}
