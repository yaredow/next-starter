import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return <AuthLayout>{children}</AuthLayout>;
}
