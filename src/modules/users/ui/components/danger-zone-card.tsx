import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DangerZoneCard = () => {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>
          Permanently delete your account and all of your data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Once you delete your account, there is no going back. This action
            permanently removes your account and all associated data.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </CardContent>
    </Card>
  );
};
