import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FooterProps {
	socialLinks: Array<{
		icon: React.ReactNode;
		href: string;
		label: string;
	}>;
	mainLinks: Array<{
		href: string;
		label: string;
	}>;
	legalLinks: Array<{
		href: string;
		label: string;
	}>;
	copyright: {
		text: string;
		license?: string;
	};
}

export function Footer({
	socialLinks,
	mainLinks,
	legalLinks,
	copyright,
}: FooterProps) {
	return (
		<footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
			<div className="px-4 lg:px-8">
				<div className="md:flex md:items-start md:justify-between">
					<ul className="mt-6 flex list-none space-x-3 md:ml-auto md:mt-0">
						{socialLinks.map((link, i) => (
							<li key={i}>
								<Button
									variant="secondary"
									size="icon"
									className="h-10 w-10 rounded-full"
									asChild
								>
									<a href={link.href} target="_blank" aria-label={link.label}>
										{link.icon}
									</a>
								</Button>
							</li>
						))}
					</ul>
				</div>
				<div className="mt-6 border-t pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
					<nav className="lg:col-[4/11] lg:mt-0">
						<ul className="-mx-2 -my-1 flex list-none flex-wrap lg:justify-end">
							{mainLinks.map((link, i) => (
								<li key={i} className="mx-2 my-1 shrink-0">
									<a
										href={link.href}
										className="text-sm text-primary underline-offset-4 hover:underline"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<div className="mt-6 lg:col-[4/11] lg:mt-0">
						<ul className="-mx-3 -my-1 flex list-none flex-wrap lg:justify-end">
							{legalLinks.map((link, i) => (
								<li key={i} className="mx-3 my-1 shrink-0">
									<a
										href={link.href}
										className="text-sm text-muted-foreground underline-offset-4 hover:underline"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className="mt-6 whitespace-nowrap text-sm leading-6 text-muted-foreground lg:col-[1/4] lg:row-[1/3] lg:mt-0">
						<div>{copyright.text}</div>
						{copyright.license && <div>{copyright.license}</div>}
					</div>
				</div>
			</div>
		</footer>
	);
}
