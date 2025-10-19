import HomeLayout from "@/modules/home/ui/layouts/home-layout";

type PagesLayoutProps = {
  children: React.ReactNode;
};

const PagesLayout = ({ children }: PagesLayoutProps) => (
  <HomeLayout>{children}</HomeLayout>
);

export default PagesLayout;
