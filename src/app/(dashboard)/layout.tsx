import UserLayout from "@/modules/users/ui/layouts/user-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return <UserLayout>{children}</UserLayout>;
}
