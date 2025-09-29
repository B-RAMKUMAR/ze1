import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { getAccessRequests } from "@/lib/data";
import { History, Check, X } from "lucide-react";
import { format } from "date-fns";

export default async function RequestsPage() {
  const allRequests = await getAccessRequests();
  const pendingRequests = allRequests.filter(r => r.status === 'Pending');
  const approvedRequests = allRequests.filter(r => r.status === 'Approved');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-6 w-6" />
              Access Requests
            </CardTitle>
            <CardDescription>
              Approve or deny requests from individuals wanting to join the ZEROS program.
            </CardDescription>
          </div>
           <Badge variant={pendingRequests.length > 0 ? "destructive" : "default"}>
              {pendingRequests.length} Pending
            </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.userName}</TableCell>
                    <TableCell>{req.userEmail}</TableCell>
                    <TableCell>{format(new Date(req.requestedAt), "PP")}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button size="sm">
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No pending access requests.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Request History</CardTitle>
            <CardDescription>A log of all previously approved access requests.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {approvedRequests.length > 0 ? (
                        approvedRequests.map(req => (
                            <TableRow key={req.id}>
                                <TableCell>{req.userName}</TableCell>
                                <TableCell>{req.userEmail}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{req.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">No approved requests yet.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
