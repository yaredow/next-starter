export const plans = [
  {
    name: "Free",
    description: "For individuals and small projects",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "24-hour support response time",
      "Community access",
    ],
    popular: false,
    ctaText: "Get Started",
    ctaLink: "/register",
  },
  {
    name: "Pro",
    description: "For professionals and growing businesses",
    monthlyPrice: 19,
    annualPrice: 180, // $15/month billed annually
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "4-hour support response time",
      "Team collaboration",
      "Custom domains",
      "API access",
    ],
    popular: true,
    ctaText: "Start Free Trial",
    ctaLink: "/register?plan=pro",
  },
  {
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    monthlyPrice: 49,
    annualPrice: 468, // $39/month billed annually
    features: [
      "Everything in Pro",
      "Dedicated support",
      "1-hour support response time",
      "SSO authentication",
      "Custom integrations",
      "Usage insights",
      "Priority feature access",
    ],
    popular: false,
    ctaText: "Contact Sales",
    ctaLink: "/contact",
  },
];
