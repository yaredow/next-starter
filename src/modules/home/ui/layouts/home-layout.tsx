type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => (
  <div className="h-screen w-full">{children}</div>
);

export default HomeLayout;
