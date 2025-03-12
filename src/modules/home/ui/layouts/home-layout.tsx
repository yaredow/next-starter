import { FooterComponent } from "../components/footer";
import { Header } from "../components/header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <div className="h-screen w-full">{children}</div>;
};

export default HomeLayout;
