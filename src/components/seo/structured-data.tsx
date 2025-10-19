export function WebsiteSchemaJsonLd({ siteUrl }: { siteUrl: string }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      })}
    </script>
  );
}

type ProductJsonLdProps = {
  name: string;
  description: string;
  price: number;
  images: string[];
};

export function ProductJsonLd({
  name,
  description,
  price,
  images,
}: ProductJsonLdProps) {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
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
      })}
    </script>
  );
}

type OrganizationJsonLdProps = {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
};

export function OrganizationJsonLd({
  name,
  url,
  logo,
  sameAs = [],
}: OrganizationJsonLdProps) {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name,
        url,
        ...(logo && { logo }),
        sameAs,
      })}
    </script>
  );
}

type FAQItemProps = {
  question: string;
  answer: string;
};

type FAQJsonLdProps = {
  questions: FAQItemProps[];
};

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
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
      })}
    </script>
  );
}

type BreadcrumbItemProps = {
  name: string;
  url: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItemProps[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      })}
    </script>
  );
}
