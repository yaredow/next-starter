import UserLayout from "@/modules/users/ui/layouts/user-layout";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: DashboardLayoutProps) {
  return <UserLayout>{children}</UserLayout>;
}
