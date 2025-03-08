import HomeLayout from "@/modules/home/ui/layouts/home-layout";

interface PagesLayoutProps {
  children: React.ReactNode;
}

const PagesLayout = ({ children }: PagesLayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default PagesLayout;
