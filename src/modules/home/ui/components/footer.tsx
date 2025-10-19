import { Github, Twitter } from "lucide-react";
import { Footer } from "@/components/ui/footer";

export const FooterComponent = () => {
	return (
		<div className="w-full">
			<Footer
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
				mainLinks={[
					{ href: "/products", label: "Products" },
					{ href: "/about", label: "About" },
					{ href: "/blog", label: "Blog" },
					{ href: "/contact", label: "Contact" },
				]}
				legalLinks={[
					{ href: "/privacy", label: "Privacy" },
					{ href: "/terms", label: "Terms" },
				]}
				copyright={{
					text: "© 2025 Yared Yilma",
				}}
			/>
		</div>
	);
};
