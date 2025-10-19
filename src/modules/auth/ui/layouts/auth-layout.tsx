interface AuthLayoutProps {
	children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
	return <div className="min-h-screen w-full">{children}</div>;
};
