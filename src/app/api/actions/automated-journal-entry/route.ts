import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getTasks } from '@/lib/data';
import { generateJournalEntry } from '@/ai/flows/automated-journal-entry';

export async function POST() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'Apprentice') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const allTasks = await getTasks();
  const userTasks = allTasks.filter(task => task.assigneeId === user.id);

  const recentTasks = userTasks
    .filter(task => task.status === 'Submitted' || task.status === 'Scored')
    .map(task => `- ${task.title}: ${task.objective}`)
    .join('\n');

  // Placeholders for team interactions and skill development
  const teamInteractions = 'Discussed project progress with the team.';
  const skillDevelopment = 'Focused on improving my Next.js and TypeScript skills.';

  try {
    const output = await generateJournalEntry({
      recentTasks,
      teamInteractions,
      skillDevelopment,
    });
    return NextResponse.json(output);
  } catch (error) {
    console.error('Error generating journal entry:', error);
    return NextResponse.json({ error: 'Failed to generate journal entry' }, { status: 500 });
  }
}
