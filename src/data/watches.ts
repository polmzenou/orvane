import type { ImageKey } from "@/lib/images";
import type { L } from "@/lib/utils";

export type CollectionId = "celeste" | "heritage" | "abysse";
export type MetalId = "rose-gold" | "yellow-gold" | "white-gold" | "platinum" | "steel" | "titanium";
export type StrapId = "alligator-black" | "alligator-brown" | "alligator-navy" | "rubber-black" | "bracelet";
export type Complication = "moon" | "tourbillon" | "small-seconds" | "chrono" | "perpetual" | "date" | "gmt";

export type WatchLook = {
  metal: MetalId;
  dial: string;
  dialAccent: string;
  strap: StrapId;
  complication: Complication;
  bezel?: "smooth" | "diver";
};

export type Watch = {
  slug: string;
  reference: string;
  name: string;
  collection: CollectionId;
  price: number;
  diameter: number;
  thickness: number;
  waterResistance: number;
  powerReserve: number;
  calibre: string;
  frequency: string;
  jewels: number;
  limited?: number;
  tagline: L;
  description: L;
  dialLabel: L;
  look: WatchLook;
  images: ImageKey[];
};

export const metals: Record<MetalId, { label: L; color: string; roughness: number }> = {
  "rose-gold": { label: { fr: "Or rose 18 carats", en: "18k rose gold" }, color: "#d9a184", roughness: 0.22 },
  "yellow-gold": { label: { fr: "Or jaune 18 carats", en: "18k yellow gold" }, color: "#dcb468", roughness: 0.2 },
  "white-gold": { label: { fr: "Or gris 18 carats", en: "18k white gold" }, color: "#dcdcdc", roughness: 0.18 },
  platinum: { label: { fr: "Platine 950", en: "950 platinum" }, color: "#e4e2dd", roughness: 0.15 },
  steel: { label: { fr: "Acier 904L", en: "904L steel" }, color: "#c3c6ca", roughness: 0.25 },
  titanium: { label: { fr: "Titane grade 5", en: "Grade 5 titanium" }, color: "#8f9297", roughness: 0.38 },
};

export const straps: Record<StrapId, { label: L; color: string; kind: "leather" | "rubber" | "metal" }> = {
  "alligator-black": { label: { fr: "Alligator noir", en: "Black alligator" }, color: "#121212", kind: "leather" },
  "alligator-brown": { label: { fr: "Alligator havane", en: "Havana alligator" }, color: "#4a2c1d", kind: "leather" },
  "alligator-navy": { label: { fr: "Alligator bleu nuit", en: "Midnight alligator" }, color: "#141c33", kind: "leather" },
  "rubber-black": { label: { fr: "Caoutchouc vulcanisé", en: "Vulcanised rubber" }, color: "#0e0e0f", kind: "rubber" },
  bracelet: { label: { fr: "Bracelet métal assorti", en: "Matching metal bracelet" }, color: "", kind: "metal" },
};

export const dialPresets: { id: string; label: L; color: string; accent: string }[] = [
  { id: "midnight", label: { fr: "Bleu minuit", en: "Midnight blue" }, color: "#0f1a33", accent: "#e6d3a3" },
  { id: "ivory", label: { fr: "Émail ivoire", en: "Ivory enamel" }, color: "#efe7d6", accent: "#1a1a1a" },
  { id: "onyx", label: { fr: "Onyx", en: "Onyx" }, color: "#0c0c0d", accent: "#c9a86a" },
  { id: "forest", label: { fr: "Vert forêt", en: "Forest green" }, color: "#13281f", accent: "#e6d3a3" },
  { id: "salmon", label: { fr: "Saumon", en: "Salmon" }, color: "#d9a08a", accent: "#2a1a14" },
  { id: "silver", label: { fr: "Argenté opalin", en: "Opaline silver" }, color: "#cfcfcc", accent: "#16233d" },
];

export const collections: Record<CollectionId, { name: string; tagline: L; description: L; image: ImageKey }> = {
  celeste: {
    name: "Céleste",
    tagline: { fr: "Le ciel, au poignet.", en: "The sky, on the wrist." },
    description: {
      fr: "Phases de lune, cadrans aventurine et tourbillons volants : une collection dédiée aux nuits claires du Léman.",
      en: "Moon phases, aventurine dials and flying tourbillons: a collection devoted to the clear nights over Lake Geneva.",
    },
    image: "night",
  },
  heritage: {
    name: "Héritage",
    tagline: { fr: "La mémoire des gestes.", en: "The memory of gestures." },
    description: {
      fr: "Émail Grand Feu, chronographes monopoussoirs et quantièmes perpétuels, fidèles aux archives de 1891.",
      en: "Grand Feu enamel, monopusher chronographs and perpetual calendars, faithful to the 1891 archives.",
    },
    image: "pocket",
  },
  abysse: {
    name: "Abysse",
    tagline: { fr: "La précision sous pression.", en: "Precision under pressure." },
    description: {
      fr: "Montres d'exploration en titane et acier, étanches jusqu'à 300 mètres, pensées pour l'eau froide des lacs alpins.",
      en: "Titanium and steel explorer watches, water-resistant to 300 metres, designed for the cold waters of Alpine lakes.",
    },
    image: "abyss",
  },
};

export const watches: Watch[] = [
  {
    slug: "celeste-phase-de-lune",
    reference: "OV-C40.RG",
    name: "Céleste Phase de Lune",
    collection: "celeste",
    price: 38500,
    diameter: 40,
    thickness: 10.4,
    waterResistance: 30,
    powerReserve: 72,
    calibre: "OV-12 LUNA",
    frequency: "28 800 a/h · 4 Hz",
    jewels: 31,
    tagline: { fr: "Une lune exacte pendant 122 ans.", en: "A moon accurate for 122 years." },
    description: {
      fr: "Sur un cadran bleu minuit guilloché à la main, la lune en or massif suit son cycle avec une précision d'un jour tous les 122 ans. Le boîtier en or rose poli miroir alterne avec des flancs satinés pour capter la lumière sans jamais l'imposer.",
      en: "On a hand-guilloché midnight blue dial, the solid gold moon follows its cycle with an accuracy of one day every 122 years. The mirror-polished rose gold case alternates with satin-brushed flanks to catch the light without ever imposing it.",
    },
    dialLabel: { fr: "Bleu minuit guilloché", en: "Guilloché midnight blue" },
    look: { metal: "rose-gold", dial: "#0f1a33", dialAccent: "#e6d3a3", strap: "alligator-navy", complication: "moon" },
    images: ["watchBlueSun", "night", "watchSunset"],
  },
  {
    slug: "celeste-tourbillon-volant",
    reference: "OV-C42.PT",
    name: "Céleste Tourbillon Volant",
    collection: "celeste",
    price: 168000,
    diameter: 42,
    thickness: 11.8,
    waterResistance: 30,
    powerReserve: 80,
    calibre: "OV-T1",
    frequency: "21 600 a/h · 3 Hz",
    jewels: 27,
    limited: 18,
    tagline: { fr: "Une cage qui flotte dans la nuit.", en: "A cage floating in the night." },
    description: {
      fr: "Le tourbillon volant, sans pont supérieur, semble suspendu au-dessus d'un cadran en aventurine constellé. Chaque cage pèse 0,28 gramme et compte 63 composants assemblés et anglés à la main dans notre atelier de la Vallée de Joux.",
      en: "The flying tourbillon, free of any upper bridge, seems suspended above a star-strewn aventurine dial. Each cage weighs 0.28 grams and counts 63 components assembled and bevelled by hand in our Vallée de Joux workshop.",
    },
    dialLabel: { fr: "Aventurine", en: "Aventurine" },
    look: { metal: "platinum", dial: "#0b1230", dialAccent: "#f3eee4", strap: "alligator-black", complication: "tourbillon" },
    images: ["watchDark", "night", "watchStones"],
  },
  {
    slug: "celeste-etoile-34",
    reference: "OV-C34.WG",
    name: "Céleste Étoile 34",
    collection: "celeste",
    price: 24900,
    diameter: 34,
    thickness: 8.9,
    waterResistance: 30,
    powerReserve: 48,
    calibre: "OV-09",
    frequency: "28 800 a/h · 4 Hz",
    jewels: 25,
    tagline: { fr: "La délicatesse d'une constellation.", en: "The delicacy of a constellation." },
    description: {
      fr: "Un cadran en nacre grise, onze diamants taille brillant en guise d'index et une lunette sertie neige. L'Étoile 34 se porte du matin au soir, avec la légèreté d'un bijou et la rigueur d'un instrument.",
      en: "A grey mother-of-pearl dial, eleven brilliant-cut diamonds as indices and a snow-set bezel. The Étoile 34 is worn from morning to evening, with the lightness of jewellery and the rigour of an instrument.",
    },
    dialLabel: { fr: "Nacre grise", en: "Grey mother-of-pearl" },
    look: { metal: "white-gold", dial: "#cfcfd4", dialAccent: "#1b2340", strap: "alligator-navy", complication: "small-seconds" },
    images: ["watchHand", "jewel", "watchBlueStrap"],
  },
  {
    slug: "heritage-email-grand-feu",
    reference: "OV-H39.YG",
    name: "Héritage Émail Grand Feu",
    collection: "heritage",
    price: 29800,
    diameter: 39,
    thickness: 9.2,
    waterResistance: 30,
    powerReserve: 65,
    calibre: "OV-08 MANUEL",
    frequency: "21 600 a/h · 3 Hz",
    jewels: 21,
    tagline: { fr: "Cuit sept fois à 820 °C.", en: "Fired seven times at 820 °C." },
    description: {
      fr: "Son cadran en émail Grand Feu est cuit sept fois à 820 °C, à la manière des montres de poche de nos archives. Chiffres Breguet peints à la main, aiguilles poires en acier bleui à la flamme : une montre de collectionneur, pensée pour durer plusieurs générations.",
      en: "Its Grand Feu enamel dial is fired seven times at 820 °C, in the manner of the pocket watches in our archives. Hand-painted Breguet numerals, flame-blued steel pear hands: a collector's watch, built to last for generations.",
    },
    dialLabel: { fr: "Émail Grand Feu ivoire", en: "Ivory Grand Feu enamel" },
    look: { metal: "yellow-gold", dial: "#efe7d6", dialAccent: "#1d2b52", strap: "alligator-brown", complication: "small-seconds" },
    images: ["watchVintage", "pocket", "watchBook"],
  },
  {
    slug: "heritage-chronographe-monopoussoir",
    reference: "OV-H41.ST",
    name: "Héritage Chronographe Monopoussoir",
    collection: "heritage",
    price: 46000,
    diameter: 41,
    thickness: 12.6,
    waterResistance: 50,
    powerReserve: 60,
    calibre: "OV-CH2 ROUE À COLONNES",
    frequency: "28 800 a/h · 4 Hz",
    jewels: 35,
    tagline: { fr: "Un seul poussoir, trois fonctions.", en: "One pusher, three functions." },
    description: {
      fr: "Départ, arrêt, remise à zéro : tout passe par le poussoir intégré à la couronne, piloté par une roue à colonnes visible par le fond saphir. Le cadran opalin argenté porte deux compteurs bleus inspirés des chronographes de course des années 1930.",
      en: "Start, stop, reset: everything goes through the pusher integrated into the crown, controlled by a column wheel visible through the sapphire caseback. The opaline silver dial carries two blue counters inspired by 1930s racing chronographs.",
    },
    dialLabel: { fr: "Argenté opalin", en: "Opaline silver" },
    look: { metal: "steel", dial: "#d3d3cf", dialAccent: "#16233d", strap: "alligator-black", complication: "chrono" },
    images: ["watchPanda", "watchChrono", "watchFlat"],
  },
  {
    slug: "heritage-quantieme-perpetuel",
    reference: "OV-H41.RG",
    name: "Héritage Quantième Perpétuel",
    collection: "heritage",
    price: 92000,
    diameter: 41,
    thickness: 11.2,
    waterResistance: 30,
    powerReserve: 70,
    calibre: "OV-QP3",
    frequency: "28 800 a/h · 4 Hz",
    jewels: 37,
    limited: 91,
    tagline: { fr: "Aucun réglage avant 2100.", en: "No adjustment needed until 2100." },
    description: {
      fr: "Jour, date, mois, années bissextiles et phase de lune : le quantième perpétuel connaît le calendrier grégorien jusqu'en 2100. Limité à 91 exemplaires en hommage à l'année de fondation de la Maison, chacun numéroté à la main sur la carrure.",
      en: "Day, date, month, leap years and moon phase: the perpetual calendar knows the Gregorian calendar until 2100. Limited to 91 pieces in tribute to the Maison's founding year, each one hand-numbered on the case band.",
    },
    dialLabel: { fr: "Saumon soleillé", en: "Sunburst salmon" },
    look: { metal: "rose-gold", dial: "#d9a08a", dialAccent: "#2a1a14", strap: "alligator-brown", complication: "perpetual" },
    images: ["watchChrono", "watchRed", "hourglass"],
  },
  {
    slug: "abysse-300",
    reference: "OV-A42.TI",
    name: "Abysse 300",
    collection: "abysse",
    price: 14900,
    diameter: 42,
    thickness: 13.1,
    waterResistance: 300,
    powerReserve: 70,
    calibre: "OV-21 AUTOMATIQUE",
    frequency: "28 800 a/h · 4 Hz",
    jewels: 26,
    tagline: { fr: "Conçue pour les eaux froides.", en: "Built for cold waters." },
    description: {
      fr: "Boîtier en titane grade 5 microbillé, lunette unidirectionnelle en céramique et index Super-LumiNova grade X1 : l'Abysse 300 a été testée dans les eaux du lac Léman à 4 °C avant d'être éprouvée en caisson à 375 mètres.",
      en: "Bead-blasted grade 5 titanium case, unidirectional ceramic bezel and grade X1 Super-LumiNova indices: the Abysse 300 was tested in Lake Geneva at 4 °C before being pressure-tested to 375 metres.",
    },
    dialLabel: { fr: "Noir abyssal", en: "Abyssal black" },
    look: { metal: "titanium", dial: "#0c0c0d", dialAccent: "#c9a86a", strap: "rubber-black", complication: "date", bezel: "diver" },
    images: ["watchDiver", "abyss", "watchStones"],
  },
  {
    slug: "abysse-gmt",
    reference: "OV-A41.ST",
    name: "Abysse GMT",
    collection: "abysse",
    price: 12600,
    diameter: 41,
    thickness: 12.4,
    waterResistance: 200,
    powerReserve: 70,
    calibre: "OV-24 GMT",
    frequency: "28 800 a/h · 4 Hz",
    jewels: 28,
    tagline: { fr: "Deux fuseaux, une seule ligne.", en: "Two time zones, one line." },
    description: {
      fr: "Une aiguille GMT indépendante, une lunette 24 heures et un cadran vert forêt soleillé : l'Abysse GMT accompagne les voyageurs entre Genève et le reste du monde sans jamais perdre le fil de l'heure de chez soi.",
      en: "An independent GMT hand, a 24-hour bezel and a sunburst forest green dial: the Abysse GMT accompanies travellers between Geneva and the rest of the world without ever losing track of home time.",
    },
    dialLabel: { fr: "Vert forêt soleillé", en: "Sunburst forest green" },
    look: { metal: "steel", dial: "#13281f", dialAccent: "#e6d3a3", strap: "bracelet", complication: "gmt", bezel: "diver" },
    images: ["watchTeal", "lake", "watchNato"],
  },
];

export function getWatch(slug: string) {
  return watches.find((w) => w.slug === slug);
}
