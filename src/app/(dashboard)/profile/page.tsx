import { redirect } from "next/navigation";

import { UserProfileView } from "@/modules/users/ui/views/user-profile-view";
import { getSession } from "@/lib/session";
import { trpc } from "@/trpc/server";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  void trpc.users.getUser.prefetch({ id: session.user.id });

  return <UserProfileView userId={session.user.id} />;
};

export default ProfilePage;
