import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ApprenticeDashboard from "@/components/dashboard/apprentice-dashboard";
import OrchestratorDashboard from "@/app/dashboard/orchestrator-dashboard";
import ScorerDashboard from "@/components/dashboard/scorer-dashboard";
import OperatorDashboard from "@/components/dashboard/operator-dashboard";
import { getAnnouncements, getTasksForUser, getSubmissions, getAccessRequests, getUsers } from "@/lib/data";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // This check is important for the main dashboard page
  if (!user) {
    redirect("/login");
  }

  const announcements = await getAnnouncements();

  switch (user.role) {
    case "Apprentice":
      const tasks = await getTasksForUser(user.id);
      return <ApprenticeDashboard user={user} tasks={tasks} announcements={announcements} />;
    case "Program Orchestrator":
      const requests = await getAccessRequests();
      const users = await getUsers();
      return <OrchestratorDashboard user={user} announcements={announcements} requests={requests} users={users} />;
    case "Scorer":
      const submissions = await getSubmissions();
      return <ScorerDashboard user={user} submissions={submissions} />;
    case "Program Operator":
        return <OperatorDashboard user={user} announcements={announcements} />;
    default:
      return <div>Welcome! Your dashboard is being set up.</div>;
  }
}
