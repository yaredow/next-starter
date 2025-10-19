import { Github, Twitter } from "lucide-react";
import { Footer } from "@/components/ui/footer";

export const FooterComponent = () => (
  <div className="w-full">
    <Footer
      copyright={{
        text: "© 2025 Yared Yilma",
      }}
      legalLinks={[
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ]}
      mainLinks={[
        { href: "/products", label: "Products" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
      ]}
      socialLinks={[
        {
          icon: <Twitter className="h-5 w-5" />,
          href: "https://twitter.com/yared_ow",
          label: "Twitter",
        },
        {
          icon: <Github className="h-5 w-5" />,
          href: "https://github.com/yaredow",
          label: "GitHub",
        },
      ]}
    />
  </div>
);
