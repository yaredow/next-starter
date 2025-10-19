import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { UserProfileView } from "@/modules/users/ui/views/user-profile-view";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <UserProfileView userId={session.user.id} />;
};

export default ProfilePage;
