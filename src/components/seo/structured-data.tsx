import Script from "next/script";

export function WebsiteSchemaJsonLd({ siteUrl }: { siteUrl: string }) {
	return (
		<Script
			id="website-schema-jsonld"
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebSite",
					url: siteUrl,
					potentialAction: {
						"@type": "SearchAction",
						target: `${siteUrl}/search?q={search_term_string}`,
						"query-input": "required name=search_term_string",
					},
				}),
			}}
		/>
	);
}

interface ProductJsonLdProps {
	name: string;
	description: string;
	price: number;
	images: string[];
}

export function ProductJsonLd({
	name,
	description,
	price,
	images,
}: ProductJsonLdProps) {
	return (
		<Script
			id="product-jsonld"
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Product",
					name,
					description,
					image: images,
					offers: {
						"@type": "Offer",
						price,
						priceCurrency: "USD",
					},
				}),
			}}
		/>
	);
}

interface OrganizationJsonLdProps {
	name: string;
	url: string;
	logo?: string;
	sameAs?: string[];
}

export function OrganizationJsonLd({
	name,
	url,
	logo,
	sameAs = [],
}: OrganizationJsonLdProps) {
	return (
		<Script
			id="organization-jsonld"
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Organization",
					name,
					url,
					...(logo && { logo }),
					sameAs,
				}),
			}}
		/>
	);
}

interface FAQItemProps {
	question: string;
	answer: string;
}

interface FAQJsonLdProps {
	questions: FAQItemProps[];
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
	return (
		<Script
			id="faq-jsonld"
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: questions.map((q) => ({
						"@type": "Question",
						name: q.question,
						acceptedAnswer: {
							"@type": "Answer",
							text: q.answer,
						},
					})),
				}),
			}}
		/>
	);
}

interface BreadcrumbItemProps {
	name: string;
	url: string;
}

interface BreadcrumbJsonLdProps {
	items: BreadcrumbItemProps[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
	return (
		<Script
			id="breadcrumb-jsonld"
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: items.map((item, index) => ({
						"@type": "ListItem",
						position: index + 1,
						name: item.name,
						item: item.url,
					})),
				}),
			}}
		/>
	);
}
