import type { ImageKey } from "@/lib/images";
import type { L } from "@/lib/utils";

export type Boutique = {
  id: string;
  city: L;
  country: L;
  address: string;
  phone: string;
  hours: L;
  lat: number;
  lon: number;
  flagship?: boolean;
};

export const boutiques: Boutique[] = [
  {
    id: "geneve",
    city: { fr: "Genève", en: "Geneva" },
    country: { fr: "Suisse", en: "Switzerland" },
    address: "Rue du Rhône 42, 1204 Genève",
    phone: "+41 22 310 18 91",
    hours: { fr: "Lun – Sam · 10h – 19h", en: "Mon – Sat · 10am – 7pm" },
    lat: 46.2,
    lon: 6.15,
    flagship: true,
  },
  {
    id: "vallee-de-joux",
    city: { fr: "Le Brassus", en: "Le Brassus" },
    country: { fr: "Suisse · Manufacture", en: "Switzerland · Manufacture" },
    address: "Route de France 7, 1348 Le Brassus",
    phone: "+41 21 845 18 91",
    hours: { fr: "Visites sur rendez-vous", en: "Visits by appointment" },
    lat: 46.58,
    lon: 6.21,
  },
  {
    id: "paris",
    city: { fr: "Paris", en: "Paris" },
    country: { fr: "France", en: "France" },
    address: "Place Vendôme, 75001 Paris",
    phone: "+33 1 42 60 18 91",
    hours: { fr: "Lun – Sam · 10h30 – 19h", en: "Mon – Sat · 10:30am – 7pm" },
    lat: 48.87,
    lon: 2.33,
  },
  {
    id: "londres",
    city: { fr: "Londres", en: "London" },
    country: { fr: "Royaume-Uni", en: "United Kingdom" },
    address: "New Bond Street, London W1S",
    phone: "+44 20 7493 1891",
    hours: { fr: "Lun – Sam · 10h – 18h", en: "Mon – Sat · 10am – 6pm" },
    lat: 51.51,
    lon: -0.14,
  },
  {
    id: "new-york",
    city: { fr: "New York", en: "New York" },
    country: { fr: "États-Unis", en: "United States" },
    address: "Madison Avenue, New York, NY 10022",
    phone: "+1 212 755 1891",
    hours: { fr: "Lun – Sam · 10h – 18h", en: "Mon – Sat · 10am – 6pm" },
    lat: 40.76,
    lon: -73.97,
  },
  {
    id: "dubai",
    city: { fr: "Dubaï", en: "Dubai" },
    country: { fr: "Émirats arabes unis", en: "United Arab Emirates" },
    address: "Dubai Mall, Fashion Avenue",
    phone: "+971 4 339 1891",
    hours: { fr: "Tous les jours · 10h – 23h", en: "Daily · 10am – 11pm" },
    lat: 25.2,
    lon: 55.28,
  },
  {
    id: "tokyo",
    city: { fr: "Tokyo", en: "Tokyo" },
    country: { fr: "Japon", en: "Japan" },
    address: "Chūō-dōri, Ginza, Tokyo 104-0061",
    phone: "+81 3 3571 1891",
    hours: { fr: "Tous les jours · 11h – 20h", en: "Daily · 11am – 8pm" },
    lat: 35.67,
    lon: 139.77,
  },
  {
    id: "singapour",
    city: { fr: "Singapour", en: "Singapore" },
    country: { fr: "Singapour", en: "Singapore" },
    address: "Orchard Road, Singapore 238801",
    phone: "+65 6733 1891",
    hours: { fr: "Tous les jours · 10h30 – 21h", en: "Daily · 10:30am – 9pm" },
    lat: 1.3,
    lon: 103.83,
  },
];

export type Article = {
  slug: string;
  category: L;
  title: L;
  excerpt: L;
  date: string;
  readTime: number;
  image: ImageKey;
  body: { fr: string[]; en: string[] };
};

export const articles: Article[] = [
  {
    slug: "la-lune-en-or-massif",
    category: { fr: "Complications", en: "Complications" },
    title: { fr: "La lune en or massif, ou l'art de la patience", en: "The solid gold moon, or the art of patience" },
    excerpt: {
      fr: "Pourquoi un disque de 59 dents suffit-il à suivre la lune pendant 122 ans ? Plongée dans la complication la plus poétique de la Maison.",
      en: "Why is a 59-tooth disc enough to follow the moon for 122 years? A dive into the Maison's most poetic complication.",
    },
    date: "2026-09-12",
    readTime: 6,
    image: "night",
    body: {
      fr: [
        "Le mois lunaire dure 29 jours, 12 heures, 44 minutes et 2,8 secondes. Pour l'horloger, ce chiffre est un défi : la plupart des phases de lune classiques, montées sur un disque de 59 dents, accumulent un jour d'écart tous les deux ans et demi.",
        "Pour la Céleste Phase de Lune, nos ingénieurs ont dessiné un rouage intermédiaire de 135 dents. Le résultat : un écart d'un seul jour tous les 122 ans. Une précision qui n'a de sens que pour celui qui transmettra sa montre.",
        "La lune elle-même est découpée dans une plaque d'or 18 carats, puis martelée à la main pour lui donner ce relief qui accroche la lumière. Chaque disque demande près de quatre heures de travail.",
        "Sur le fond du cadran, le ciel est guilloché selon un motif dit « grain d'orge », réalisé sur un tour à guillocher de 1923 que la Maison entretient avec un soin jaloux.",
      ],
      en: [
        "The lunar month lasts 29 days, 12 hours, 44 minutes and 2.8 seconds. For the watchmaker, this figure is a challenge: most classic moon phases, mounted on a 59-tooth disc, drift by one day every two and a half years.",
        "For the Céleste Phase de Lune, our engineers designed an intermediate 135-tooth wheel. The result: a deviation of a single day every 122 years. A precision that only makes sense to whoever will hand the watch down.",
        "The moon itself is cut from an 18-carat gold plate, then hand-hammered to give it the relief that catches the light. Each disc requires nearly four hours of work.",
        "On the dial, the sky is guilloché in a 'grain d'orge' pattern, produced on a 1923 rose engine that the Maison maintains with jealous care.",
      ],
    },
  },
  {
    slug: "sept-cuissons-pour-un-cadran",
    category: { fr: "Métiers d'art", en: "Artistic crafts" },
    title: { fr: "Sept cuissons pour un cadran", en: "Seven firings for a dial" },
    excerpt: {
      fr: "Dans l'atelier d'émaillage, un cadran sur trois ne survit pas au four. Rencontre avec ceux qui domptent le feu.",
      en: "In the enamelling workshop, one dial in three does not survive the kiln. Meet those who tame the fire.",
    },
    date: "2026-07-03",
    readTime: 8,
    image: "pocket",
    body: {
      fr: [
        "L'émail Grand Feu est une poudre de verre broyée, déposée couche après couche sur une plaque de cuivre. À chaque passage au four, à 820 °C, la matière fond, se vitrifie, et révèle sa profondeur.",
        "Le moindre grain de poussière, la plus petite bulle d'air, et le cadran est perdu. Dans notre atelier, un cadran sur trois est écarté. C'est le prix de ce blanc laiteux qui ne jaunira jamais.",
        "Les chiffres Breguet sont ensuite peints au pinceau, sous loupe binoculaire, avec un pinceau dont certains poils sont retirés un à un pour ne conserver qu'une pointe parfaite.",
      ],
      en: [
        "Grand Feu enamel is a ground glass powder, applied layer after layer onto a copper plate. With each firing at 820 °C, the material melts, vitrifies and reveals its depth.",
        "The slightest speck of dust, the smallest air bubble, and the dial is lost. In our workshop, one dial in three is rejected. That is the price of a milky white that will never yellow.",
        "Breguet numerals are then hand-painted under a binocular magnifier, with a brush from which some hairs are removed one by one to keep only a perfect tip.",
      ],
    },
  },
  {
    slug: "plonger-dans-le-leman-a-4-degres",
    category: { fr: "Expéditions", en: "Expeditions" },
    title: { fr: "Plonger dans le Léman à 4 °C", en: "Diving into Lake Geneva at 4 °C" },
    excerpt: {
      fr: "Avant chaque série, l'Abysse 300 descend à 80 mètres dans les eaux froides du lac. Carnet de bord d'une journée de tests.",
      en: "Before each series, the Abysse 300 descends to 80 metres in the lake's cold waters. Logbook of a day of testing.",
    },
    date: "2026-05-21",
    readTime: 5,
    image: "abyss",
    body: {
      fr: [
        "6h30, port de Nyon. L'eau est à 4 °C sous la thermocline. Les plongeurs de l'équipe d'essais portent chacun trois prototypes, attachés à l'avant-bras par des bracelets caoutchouc vulcanisé.",
        "À 80 mètres, la pression atteint 9 bars. La lunette céramique doit rester manipulable avec des gants de 5 mm, et la luminescence lisible dans une obscurité presque totale.",
        "De retour en surface, chaque montre passe 48 heures en chambre de condensation. Une seule trace de buée, et la série entière est démontée.",
      ],
      en: [
        "6:30am, Nyon harbour. The water is 4 °C below the thermocline. The test divers each carry three prototypes, strapped to their forearms with vulcanised rubber straps.",
        "At 80 metres, the pressure reaches 9 bar. The ceramic bezel must remain operable with 5 mm gloves, and the lume legible in near-total darkness.",
        "Back at the surface, each watch spends 48 hours in a condensation chamber. A single trace of fog, and the whole series is taken apart.",
      ],
    },
  },
  {
    slug: "la-vallee-de-joux-berceau",
    category: { fr: "Maison", en: "Maison" },
    title: { fr: "La Vallée de Joux, berceau d'une obsession", en: "The Vallée de Joux, cradle of an obsession" },
    excerpt: {
      fr: "À 1 000 mètres d'altitude, l'hiver long a fait des paysans des horlogers. Histoire d'un territoire et d'une Maison.",
      en: "At 1,000 metres above sea level, long winters turned farmers into watchmakers. The story of a land and a Maison.",
    },
    date: "2026-03-08",
    readTime: 7,
    image: "valley",
    body: {
      fr: [
        "Au XIXe siècle, la Vallée de Joux vivait six mois par an sous la neige. Dans les fermes, on fabriquait des pièces de mouvement à la lumière des lampes à huile, pour les vendre aux établisseurs de Genève.",
        "C'est là qu'Auguste Orvane, fils de forgeron, assemble en 1891 sa première montre de poche à répétition minutes. Il la vend à un négociant du quai des Bergues, qui lui en commande aussitôt douze autres.",
        "Aujourd'hui encore, nos 64 horlogers travaillent dans la ferme rénovée où tout a commencé, face à la forêt du Risoud.",
      ],
      en: [
        "In the 19th century, the Vallée de Joux lived under snow six months a year. In the farms, movement parts were made by oil-lamp light and sold to the établisseurs of Geneva.",
        "It was there that Auguste Orvane, a blacksmith's son, assembled his first minute-repeater pocket watch in 1891. He sold it to a merchant on the Quai des Bergues, who immediately ordered twelve more.",
        "Today, our 64 watchmakers still work in the renovated farmhouse where it all began, facing the Risoud forest.",
      ],
    },
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export const testimonials: { quote: L; author: string; role: L }[] = [
  {
    quote: {
      fr: "Je l'ai reçue de mon grand-père. Elle n'a jamais cessé de battre, et je la transmettrai à ma fille.",
      en: "I received it from my grandfather. It has never stopped beating, and I will pass it on to my daughter.",
    },
    author: "Hélène M.",
    role: { fr: "Collectionneuse, Lyon", en: "Collector, Lyon" },
  },
  {
    quote: {
      fr: "Le service après-vente a restauré une montre de 1932 comme si elle sortait de l'atelier. Un respect rare du patrimoine.",
      en: "The after-sales service restored a 1932 watch as if it had just left the workshop. A rare respect for heritage.",
    },
    author: "James W.",
    role: { fr: "Architecte, Londres", en: "Architect, London" },
  },
  {
    quote: {
      fr: "La Céleste se lit d'un regard et se contemple pendant des heures. C'est exactement ce que j'attendais.",
      en: "The Céleste reads at a glance and can be contemplated for hours. Exactly what I was hoping for.",
    },
    author: "Kenji T.",
    role: { fr: "Chef d'orchestre, Tokyo", en: "Conductor, Tokyo" },
  },
];

export const timeline: { year: string; title: L; text: L; image: ImageKey }[] = [
  {
    year: "1891",
    title: { fr: "La première répétition minutes", en: "The first minute repeater" },
    text: {
      fr: "Auguste Orvane assemble sa première montre de poche dans une ferme du Brassus.",
      en: "Auguste Orvane assembles his first pocket watch in a farmhouse in Le Brassus.",
    },
    image: "pocket",
  },
  {
    year: "1923",
    title: { fr: "L'arrivée du tour à guillocher", en: "The rose engine arrives" },
    text: {
      fr: "La Maison acquiert le tour qui décore encore aujourd'hui les cadrans Céleste.",
      en: "The Maison acquires the rose engine that still decorates Céleste dials today.",
    },
    image: "hourglass",
  },
  {
    year: "1957",
    title: { fr: "Rue du Rhône", en: "Rue du Rhône" },
    text: {
      fr: "Ouverture du salon genevois, face au lac, devenu depuis la maison-mère.",
      en: "Opening of the Geneva salon facing the lake, which has since become the flagship.",
    },
    image: "lake",
  },
  {
    year: "1978",
    title: { fr: "Naissance d'Abysse", en: "Birth of Abysse" },
    text: {
      fr: "Une montre de plongée conçue avec les sauveteurs du lac Léman.",
      en: "A diving watch designed with the Lake Geneva rescue teams.",
    },
    image: "abyss",
  },
  {
    year: "2011",
    title: { fr: "Calibre OV-T1", en: "OV-T1 calibre" },
    text: {
      fr: "Premier tourbillon volant entièrement développé et produit en interne.",
      en: "First flying tourbillon fully developed and produced in-house.",
    },
    image: "watchDark",
  },
  {
    year: "2026",
    title: { fr: "135 ans", en: "135 years" },
    text: {
      fr: "Cinq générations d'horlogers, 64 artisans, et toujours la même ferme.",
      en: "Five generations of watchmakers, 64 artisans, and still the same farmhouse.",
    },
    image: "valley",
  },
];
