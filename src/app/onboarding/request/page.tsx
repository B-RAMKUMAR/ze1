import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

export default function OnboardingRequestPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
             <UserPlus className="h-6 w-6" />
            Program Enrollment & Intent Confirmation
          </CardTitle>
          <CardDescription>
            Complete the form below to request enrollment in the ZEROS Program.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-primary">1. Program Terms & Commitment</h3>
                <div className="p-4 mt-2 border rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">
                        I understand the time commitment (10-15 hrs/week) and agree to uphold Mu Sigma University's academic integrity and IP policy.
                    </p>
                </div>
                 <div className="flex items-center space-x-2 mt-4">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I confirm and accept the program terms.
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-primary">2. Your Information</h3>
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Your full name" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Mu Sigma Email</Label>
                    <Input id="email" placeholder="your.name@mu-sigma.com" type="email" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="role">Current Role</Label>
                    <Input id="role" placeholder="e.g., Apprentice Analyst" />
                </div>
            </div>
            
            <Button className="w-full" type="submit">
                Request Enrollment
            </Button>

        </CardContent>
      </Card>
    </div>
  );
}
