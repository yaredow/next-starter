type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="min-h-screen w-full">{children}</div>
);
