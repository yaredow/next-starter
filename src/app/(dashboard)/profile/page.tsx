import { getSession } from "@/lib/session";
import { UserProfile } from "@/modules/users/ui/components/user-profile";
import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  void trpc.users.getUser.prefetch({ id: session.user.id });

  return <UserProfile userId={session.user.id} />;
};

export default ProfilePage;
