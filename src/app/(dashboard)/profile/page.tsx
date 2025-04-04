import { redirect } from "next/navigation";

import { UserProfileView } from "@/modules/users/ui/views/user-profile-view";
import { getSession } from "@/lib/session";
import { prefetch, trpc } from "@/trpc/server";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <UserProfileView userId={session.user.id} />;
};

export default ProfilePage;
