import { Settings, Mail, Calendar, MapPin } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/session";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  const avatarFallback = user.name
    ? user.name.charAt(0).toUpperCase()
    : (user.email?.charAt(0).toUpperCase() ?? "U");

  const joinedDate = new Date(user.createdAt || Date.now()).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
    },
  );

  return (
    <main className="container max-w-5xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Button variant="outline" asChild>
          <Link href="/profile/setting">
            <Settings className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center pt-6">
            <div className="relative mb-4 h-32 w-32">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  fill
                  className="rounded-full border-2 border-background object-cover"
                />
              ) : (
                <Avatar className="h-32 w-32 border-2 border-muted">
                  <AvatarFallback className="text-4xl">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>

            <div className="mt-6 w-full">
              <Separator className="mb-4" />
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined {joinedDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              View and manage your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Account Status
              </h3>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  Email {user.emailVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Profile Information
              </h3>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {[
                  { label: "Full Name", value: user.name },
                  { label: "Email", value: user.email },
                  { label: "Created At", value: joinedDate },
                ].map((item, i) => (
                  <div key={i}>
                    <dt className="text-sm text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Separator />

            <div className="flex gap-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/profile/setting">Edit Profile</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/profile/setting?tab=security">
                  Security Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
