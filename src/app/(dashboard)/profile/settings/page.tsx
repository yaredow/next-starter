import { getSession } from "@/lib/session";
import { UserProfileSettings } from "@/modules/users/ui/components/user-profile-settings";
import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  void trpc.users.getUser.prefetch({ id: session.user.id });

  return <UserProfileSettings userId={session.user.id} />;
};

export default SettingsPage;
