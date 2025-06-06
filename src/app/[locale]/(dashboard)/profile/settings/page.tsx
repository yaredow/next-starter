import { redirect } from "next/navigation";

import { UserProfileSettingsView } from "@/modules/users/ui/views/user-profile-settings-view";
import { getSession } from "@/lib/session";

const SettingsPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <UserProfileSettingsView userId={session.user.id} />;
};

export default SettingsPage;
