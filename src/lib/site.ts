export const site = {
  name: "ORVANE",
  fullName: "ORVANE Genève",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://orvane-geneve.vercel.app",
  founded: 1891,
  email: "concierge@orvane-geneve.ch",
  phone: "+41 22 310 18 91",
  address: { street: "Rue du Rhône 42", city: "1204 Genève", country: "Suisse" },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Pinterest", href: "https://www.pinterest.com" },
  ],
};

export const navLinks = [
  { href: "/collections", key: "collections" },
  { href: "/maison", key: "maison" },
  { href: "/savoir-faire", key: "craft" },
  { href: "/boutiques", key: "boutiques" },
  { href: "/journal", key: "journal" },
  { href: "/contact", key: "contact" },
] as const;

export const legalLinks = [
  { href: "/mentions-legales", key: "legal" },
  { href: "/politique-de-confidentialite", key: "privacy" },
  { href: "/politique-cookies", key: "cookies" },
  { href: "/cgu", key: "terms" },
  { href: "/cgv", key: "sales" },
  { href: "/plan-du-site", key: "sitemap" },
] as const;
