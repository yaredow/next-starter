import { CreditCard, LayoutDashboard, Settings, User } from "lucide-react";

export const routes = [
  {
    title: "Dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    variant: "default",
  },
  {
    title: "Profile",
    label: "Profile",
    icon: User,
    href: "/profile",
    variant: "ghost",
  },
  {
    title: "Subscription",
    label: "Subscription",
    icon: CreditCard,
    href: "/subscription",
    variant: "ghost",
  },
  {
    title: "Settings",
    label: "Settings",
    icon: Settings,
    href: "/profile/settings",
    variant: "ghost",
  },
];
