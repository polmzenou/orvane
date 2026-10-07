# ORVANE Genève — site vitrine

Site vitrine d'une maison horlogère genevoise fictive, fondée en 1891. Front-end uniquement : aucun back-end, les formulaires sont simulés côté client.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS 4** — design tokens noir & or dans `src/app/globals.css`
- **Three.js** via `@react-three/fiber` et `@react-three/drei` — montres et mouvement modélisés de façon procédurale (aucun fichier 3D externe)
- **Motion** (animations, parallax), **GSAP ScrollTrigger** (timeline horizontale), **Lenis** (smooth scroll)
- **next-intl** — français / anglais (`messages/fr.json`, `messages/en.json`)
- **react-hook-form** + **zod** — formulaire de rendez-vous en 3 étapes

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Hero 3D (heure de Genève en temps réel), manifeste, collections, mouvement éclaté au scroll, parallax, chiffres, témoignages, journal |
| `/collections` | Grille filtrable (collection, matière, diamètre) et triable |
| `/collections/[slug]` | Fiche produit avec configurateur 3D (boîtier, cadran, bracelet) |
| `/maison` | Histoire, timeline horizontale épinglée, engagements |
| `/savoir-faire` | Étapes de fabrication, comparateur avant/après |
| `/boutiques` | Carte « constellation » interactive des salons |
| `/journal`, `/journal/[slug]` | Articles éditoriaux |
| `/contact` | Prise de rendez-vous multi-étapes |
| `/faq`, `/plan-du-site` | Assistance et navigation |
| `/mentions-legales`, `/politique-de-confidentialite`, `/politique-cookies`, `/cgu`, `/cgv` | Pages légales (RGPD / nLPD) |
| `/salon-prive` | Espace membres → page **403** |
| toute URL inconnue | Page **404** personnalisée (montre aux aiguilles qui tournent à rebours) |

Également : page d'erreur 500, bandeau et préférences cookies (refus aussi simple que l'acceptation, choix réouvrables depuis le pied de page), `sitemap.xml`, `robots.txt`, manifeste, image Open Graph, données structurées JSON-LD.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

Variable optionnelle : `NEXT_PUBLIC_SITE_URL` (URL canonique utilisée pour le sitemap et les métadonnées).

## Crédits

Photographies : [Unsplash](https://unsplash.com). Typographies : Cormorant Garamond & Manrope (SIL Open Font License).
