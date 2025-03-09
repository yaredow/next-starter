import DashboardLayout from "@/modules/dashboard/ui/layouts/dashboard-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
