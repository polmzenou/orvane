export type Block = string | { list: string[] } | { table: string[][] };

export type LegalSection = { id: string; title: string; blocks: Block[] };

export type LegalDoc = {
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export type LegalKey = "legal" | "privacy" | "cookies" | "terms" | "sales";

const UPDATED = "2026-09-01";

const fr: Record<LegalKey, LegalDoc> = {
  legal: {
    updated: UPDATED,
    intro:
      "Conformément aux dispositions de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), et à l'article 3 de la loi fédérale suisse contre la concurrence déloyale, nous portons à la connaissance des utilisateurs les informations suivantes.",
    sections: [
      {
        id: "editeur",
        title: "Éditeur du site",
        blocks: [
          "Le présent site est édité par ORVANE Genève SA, société anonyme de droit suisse au capital de CHF 2 500 000.",
          {
            list: [
              "Siège social : Rue du Rhône 42, 1204 Genève, Suisse",
              "Numéro d'identification des entreprises (IDE) : CHE-000.000.000",
              "Numéro de TVA : CHE-000.000.000 TVA",
              "Téléphone : +41 22 310 18 91",
              "E-mail : concierge@orvane-geneve.ch",
            ],
          },
          "Représentation en France : ORVANE France SAS, Place Vendôme, 75001 Paris.",
        ],
      },
      {
        id: "publication",
        title: "Directeur de la publication",
        blocks: ["Le directeur de la publication est le Président du conseil d'administration d'ORVANE Genève SA."],
      },
      {
        id: "hebergement",
        title: "Hébergement",
        blocks: [
          "Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis — vercel.com.",
          "Les données de navigation sont servies depuis le réseau de diffusion de contenu de l'hébergeur, au plus près de l'utilisateur.",
        ],
      },
      {
        id: "propriete",
        title: "Propriété intellectuelle",
        blocks: [
          "L'ensemble des éléments composant ce site (textes, logos, marques, modèles 3D, graphismes, typographie, mise en page) est la propriété exclusive d'ORVANE Genève SA ou fait l'objet d'une autorisation d'utilisation.",
          "Toute reproduction, représentation, modification ou adaptation, totale ou partielle, sans l'autorisation écrite préalable d'ORVANE Genève SA est interdite et constituerait une contrefaçon sanctionnée par le Code de la propriété intellectuelle.",
          "La marque ORVANE et le monogramme « O » sont des marques déposées.",
        ],
      },
      {
        id: "credits",
        title: "Crédits",
        blocks: [
          "Photographies : Unsplash (unsplash.com), utilisées conformément à la licence Unsplash.",
          "Typographies : Cormorant Garamond et Manrope, sous licence SIL Open Font License.",
          "Modèles 3D, conception graphique et développement : studio interne.",
        ],
      },
      {
        id: "responsabilite",
        title: "Limitation de responsabilité",
        blocks: [
          "Les informations figurant sur ce site sont fournies à titre indicatif. Les prix affichés sont indicatifs, exprimés en francs suisses TVA incluse, et peuvent varier selon le pays et la date d'acquisition.",
          "ORVANE Genève SA s'efforce d'assurer l'exactitude des informations diffusées, mais ne saurait être tenue responsable des erreurs, omissions ou d'une indisponibilité du site.",
        ],
      },
      {
        id: "droit",
        title: "Droit applicable",
        blocks: [
          "Les présentes mentions légales sont régies par le droit suisse. Pour les consommateurs résidant dans l'Union européenne, les dispositions impératives de leur pays de résidence demeurent applicables.",
          "ORVANE est une maison fictive : ce site est une réalisation de démonstration, aucun produit n'y est réellement commercialisé.",
        ],
      },
    ],
  },
  privacy: {
    updated: UPDATED,
    intro:
      "La protection de vos données personnelles est une exigence que nous portons avec la même rigueur que la fabrication de nos montres. Cette politique explique quelles données nous collectons, pourquoi, et quels sont vos droits, conformément au Règlement général sur la protection des données (RGPD) et à la loi fédérale suisse sur la protection des données (nLPD).",
    sections: [
      {
        id: "responsable",
        title: "Responsable du traitement",
        blocks: [
          "Le responsable du traitement est ORVANE Genève SA, Rue du Rhône 42, 1204 Genève, Suisse.",
          "Délégué à la protection des données : dpo@orvane-geneve.ch.",
          "Représentant dans l'Union européenne (art. 27 RGPD) : ORVANE France SAS, Place Vendôme, 75001 Paris.",
        ],
      },
      {
        id: "donnees",
        title: "Données collectées",
        blocks: [
          "Nous collectons uniquement les données nécessaires aux finalités décrites ci-dessous :",
          {
            list: [
              "Données d'identité et de contact : prénom, nom, adresse e-mail, téléphone (formulaire de rendez-vous, lettre d'information).",
              "Données relatives à votre demande : salon souhaité, date, montre d'intérêt, message libre.",
              "Données de navigation : pages consultées, type de navigateur, langue, uniquement si vous y avez consenti.",
              "Préférences de cookies : conservées localement sur votre appareil.",
            ],
          },
          "Nous ne collectons aucune donnée sensible au sens de l'article 9 du RGPD, ni aucune donnée bancaire via ce site.",
        ],
      },
      {
        id: "finalites",
        title: "Finalités et bases légales",
        blocks: [
          {
            table: [
              ["Finalité", "Base légale", "Durée de conservation"],
              ["Gestion des demandes de rendez-vous", "Mesures précontractuelles (art. 6.1.b)", "3 ans après le dernier contact"],
              ["Envoi de la lettre d'information", "Consentement (art. 6.1.a)", "Jusqu'au retrait du consentement"],
              ["Mesure d'audience", "Consentement (art. 6.1.a)", "13 mois maximum"],
              ["Sécurité du site", "Intérêt légitime (art. 6.1.f)", "6 mois"],
            ],
          },
        ],
      },
      {
        id: "destinataires",
        title: "Destinataires",
        blocks: [
          "Vos données sont destinées exclusivement aux équipes d'ORVANE Genève SA et de ses filiales, ainsi qu'à nos sous-traitants techniques (hébergement, envoi d'e-mails), liés par un accord de traitement conforme à l'article 28 du RGPD.",
          "Nous ne vendons ni ne louons jamais vos données à des tiers.",
        ],
      },
      {
        id: "transferts",
        title: "Transferts hors de l'Union européenne",
        blocks: [
          "La Suisse bénéficie d'une décision d'adéquation de la Commission européenne. Lorsque des données sont transférées vers d'autres pays, notamment les États-Unis, ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne ou par le Data Privacy Framework.",
        ],
      },
      {
        id: "droits",
        title: "Vos droits",
        blocks: [
          "Vous disposez des droits suivants sur vos données :",
          {
            list: [
              "Droit d'accès, de rectification et d'effacement",
              "Droit à la limitation du traitement et droit d'opposition",
              "Droit à la portabilité de vos données",
              "Droit de retirer votre consentement à tout moment",
              "Droit de définir des directives relatives au sort de vos données après votre décès",
            ],
          },
          "Pour exercer ces droits, écrivez à dpo@orvane-geneve.ch en joignant un justificatif d'identité. Nous vous répondrons sous un mois.",
          "Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr) ou du Préposé fédéral à la protection des données et à la transparence (edoeb.admin.ch).",
        ],
      },
      {
        id: "securite",
        title: "Sécurité",
        blocks: [
          "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées : chiffrement TLS de bout en bout, accès restreint aux données, journalisation et revue régulière des habilitations.",
        ],
      },
      {
        id: "modifications",
        title: "Modifications",
        blocks: [
          "Cette politique peut évoluer. La date de dernière mise à jour figure en haut de page. En cas de modification substantielle, nous vous en informerons par un bandeau sur le site.",
        ],
      },
    ],
  },
  cookies: {
    updated: UPDATED,
    intro:
      "Lors de votre visite, des cookies et traceurs peuvent être déposés sur votre appareil. Conformément aux lignes directrices de la CNIL, seuls les cookies strictement nécessaires sont déposés sans votre consentement.",
    sections: [
      {
        id: "definition",
        title: "Qu'est-ce qu'un cookie ?",
        blocks: [
          "Un cookie est un petit fichier texte enregistré par votre navigateur lors de la visite d'un site. Il permet de reconnaître votre appareil et de mémoriser certaines informations, comme vos préférences de langue.",
        ],
      },
      {
        id: "utilises",
        title: "Cookies utilisés",
        blocks: [
          {
            table: [
              ["Nom", "Catégorie", "Finalité", "Durée"],
              ["NEXT_LOCALE", "Nécessaire", "Mémoriser la langue choisie", "1 an"],
              ["orvane_consent", "Nécessaire", "Mémoriser vos choix de cookies", "6 mois"],
              ["_ov_audience", "Mesure d'audience", "Statistiques de fréquentation anonymisées", "13 mois"],
              ["_ov_pref", "Marketing", "Personnalisation des contenus et invitations", "6 mois"],
            ],
          },
        ],
      },
      {
        id: "consentement",
        title: "Recueil du consentement",
        blocks: [
          "Lors de votre première visite, un bandeau vous permet d'accepter, de refuser ou de personnaliser les cookies par catégorie. Refuser est aussi simple qu'accepter.",
          "Votre choix est conservé 6 mois, après quoi il vous sera à nouveau demandé.",
        ],
      },
      {
        id: "gerer",
        title: "Modifier vos choix",
        blocks: [
          "Vous pouvez modifier vos préférences à tout moment grâce au lien « Gérer les cookies » situé en bas de chaque page.",
          "Vous pouvez également configurer votre navigateur pour bloquer les cookies. Certaines fonctionnalités du site pourraient alors être dégradées.",
        ],
      },
    ],
  },
  terms: {
    updated: UPDATED,
    intro:
      "Les présentes conditions générales d'utilisation (CGU) définissent les modalités d'accès et d'utilisation du site orvane-geneve.ch. En naviguant sur le site, vous acceptez sans réserve les présentes CGU.",
    sections: [
      {
        id: "objet",
        title: "Objet",
        blocks: [
          "Le site a pour objet de présenter la Maison ORVANE, ses collections, ses savoir-faire et ses salons, et de permettre la prise de rendez-vous.",
        ],
      },
      {
        id: "acces",
        title: "Accès au site",
        blocks: [
          "Le site est accessible gratuitement, 24 heures sur 24, sauf interruption pour maintenance ou cas de force majeure.",
          "Certains espaces, comme le Salon privé, sont réservés aux membres du Cercle ORVANE.",
        ],
      },
      {
        id: "usage",
        title: "Utilisation du site",
        blocks: [
          "L'utilisateur s'engage à ne pas :",
          {
            list: [
              "porter atteinte au fonctionnement du site ou tenter d'y accéder de manière frauduleuse ;",
              "extraire ou réutiliser de manière systématique les contenus du site ;",
              "transmettre des informations fausses via les formulaires.",
            ],
          },
        ],
      },
      {
        id: "liens",
        title: "Liens hypertextes",
        blocks: [
          "Le site peut contenir des liens vers des sites tiers, notamment des réseaux sociaux. ORVANE n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
        ],
      },
      {
        id: "modification",
        title: "Modification des CGU",
        blocks: [
          "ORVANE se réserve le droit de modifier les présentes CGU à tout moment. La version applicable est celle en ligne au moment de votre visite.",
        ],
      },
    ],
  },
  sales: {
    updated: UPDATED,
    intro:
      "Les montres ORVANE sont vendues exclusivement dans nos salons et chez nos détaillants agréés. Les présentes conditions générales de vente (CGV) s'appliquent à toute acquisition réalisée dans un salon ORVANE.",
    sections: [
      {
        id: "prix",
        title: "Prix",
        blocks: [
          "Les prix sont exprimés en francs suisses (CHF), TVA incluse. Dans les salons situés hors de Suisse, ils sont exprimés en devise locale, taxes applicables incluses.",
          "Les prix affichés sur le site sont indicatifs et n'ont pas valeur d'offre contractuelle.",
        ],
      },
      {
        id: "commande",
        title: "Commandes spéciales",
        blocks: [
          "Toute commande spéciale (configuration personnalisée, pièce unique) fait l'objet d'un devis signé et d'un acompte de 30 %. Les délais de fabrication sont communiqués à titre indicatif.",
        ],
      },
      {
        id: "paiement",
        title: "Paiement",
        blocks: [
          "Le paiement s'effectue en salon par virement bancaire, carte de paiement ou tout autre moyen accepté par le salon. La propriété de la montre n'est transférée qu'après paiement intégral.",
        ],
      },
      {
        id: "garantie",
        title: "Garantie",
        blocks: [
          "Chaque montre bénéficie d'une garantie internationale de 8 ans couvrant les défauts de fabrication. Sont exclus : l'usure normale, les chocs, l'oxydation consécutive à une ouverture par un tiers non agréé, et les bracelets.",
          "Ces garanties s'ajoutent aux garanties légales de conformité et contre les vices cachés applicables dans le pays d'achat.",
        ],
      },
      {
        id: "retours",
        title: "Échanges et retours",
        blocks: [
          "Une montre non portée, accompagnée de son écrin et de ses documents, peut être échangée dans un délai de 14 jours après l'achat. Les commandes spéciales ne sont ni reprises ni échangées.",
        ],
      },
      {
        id: "litiges",
        title: "Litiges",
        blocks: [
          "En cas de litige, une solution amiable sera recherchée en priorité. Les consommateurs résidant dans l'Union européenne peuvent recourir gratuitement à un médiateur de la consommation.",
          "À défaut, les tribunaux de Genève sont compétents, sous réserve des dispositions impératives applicables aux consommateurs.",
        ],
      },
    ],
  },
};

const en: Record<LegalKey, LegalDoc> = {
  legal: {
    updated: UPDATED,
    intro:
      "In accordance with Article 6 of French Law No. 2004-575 of 21 June 2004 on confidence in the digital economy, and Article 3 of the Swiss Federal Act against Unfair Competition, we provide users with the following information.",
    sections: [
      {
        id: "publisher",
        title: "Publisher",
        blocks: [
          "This website is published by ORVANE Genève SA, a Swiss public limited company with share capital of CHF 2,500,000.",
          {
            list: [
              "Registered office: Rue du Rhône 42, 1204 Geneva, Switzerland",
              "Business identification number (UID): CHE-000.000.000",
              "VAT number: CHE-000.000.000 VAT",
              "Phone: +41 22 310 18 91",
              "Email: concierge@orvane-geneve.ch",
            ],
          },
          "Representation in France: ORVANE France SAS, Place Vendôme, 75001 Paris.",
        ],
      },
      {
        id: "director",
        title: "Publication director",
        blocks: ["The publication director is the Chair of the Board of Directors of ORVANE Genève SA."],
      },
      {
        id: "hosting",
        title: "Hosting",
        blocks: [
          "The website is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States — vercel.com.",
          "Browsing data is served from the host's content delivery network, as close as possible to the user.",
        ],
      },
      {
        id: "ip",
        title: "Intellectual property",
        blocks: [
          "All elements of this website (texts, logos, trademarks, 3D models, graphics, typography, layout) are the exclusive property of ORVANE Genève SA or are used under licence.",
          "Any reproduction, representation, modification or adaptation, in whole or in part, without the prior written consent of ORVANE Genève SA is prohibited and constitutes infringement.",
          "The ORVANE trademark and the “O” monogram are registered trademarks.",
        ],
      },
      {
        id: "credits",
        title: "Credits",
        blocks: [
          "Photography: Unsplash (unsplash.com), used under the Unsplash licence.",
          "Typefaces: Cormorant Garamond and Manrope, under the SIL Open Font License.",
          "3D models, graphic design and development: in-house studio.",
        ],
      },
      {
        id: "liability",
        title: "Limitation of liability",
        blocks: [
          "The information on this website is provided for guidance only. Prices shown are indicative, expressed in Swiss francs including VAT, and may vary by country and date of purchase.",
          "ORVANE Genève SA strives to ensure the accuracy of the information published but cannot be held liable for errors, omissions or unavailability of the website.",
        ],
      },
      {
        id: "law",
        title: "Governing law",
        blocks: [
          "This legal notice is governed by Swiss law. For consumers residing in the European Union, the mandatory provisions of their country of residence remain applicable.",
          "ORVANE is a fictional maison: this website is a showcase project and no products are actually sold.",
        ],
      },
    ],
  },
  privacy: {
    updated: UPDATED,
    intro:
      "Protecting your personal data is a requirement we uphold with the same rigour as the making of our watches. This policy explains what data we collect, why, and what your rights are, in accordance with the General Data Protection Regulation (GDPR) and the Swiss Federal Act on Data Protection (FADP).",
    sections: [
      {
        id: "controller",
        title: "Data controller",
        blocks: [
          "The data controller is ORVANE Genève SA, Rue du Rhône 42, 1204 Geneva, Switzerland.",
          "Data protection officer: dpo@orvane-geneve.ch.",
          "EU representative (Art. 27 GDPR): ORVANE France SAS, Place Vendôme, 75001 Paris.",
        ],
      },
      {
        id: "data",
        title: "Data collected",
        blocks: [
          "We only collect the data necessary for the purposes described below:",
          {
            list: [
              "Identity and contact data: first name, last name, email address, phone (appointment form, newsletter).",
              "Data relating to your request: preferred salon, date, watch of interest, free message.",
              "Browsing data: pages viewed, browser type, language, only if you have consented.",
              "Cookie preferences: stored locally on your device.",
            ],
          },
          "We do not collect any sensitive data within the meaning of Article 9 GDPR, nor any payment data through this website.",
        ],
      },
      {
        id: "purposes",
        title: "Purposes and legal bases",
        blocks: [
          {
            table: [
              ["Purpose", "Legal basis", "Retention period"],
              ["Handling appointment requests", "Pre-contractual measures (Art. 6.1.b)", "3 years after last contact"],
              ["Sending the newsletter", "Consent (Art. 6.1.a)", "Until consent is withdrawn"],
              ["Audience measurement", "Consent (Art. 6.1.a)", "13 months maximum"],
              ["Website security", "Legitimate interest (Art. 6.1.f)", "6 months"],
            ],
          },
        ],
      },
      {
        id: "recipients",
        title: "Recipients",
        blocks: [
          "Your data is intended exclusively for the teams of ORVANE Genève SA and its subsidiaries, and for our technical processors (hosting, email delivery), bound by a data processing agreement compliant with Article 28 GDPR.",
          "We never sell or rent your data to third parties.",
        ],
      },
      {
        id: "transfers",
        title: "Transfers outside the European Union",
        blocks: [
          "Switzerland benefits from an adequacy decision of the European Commission. Where data is transferred to other countries, notably the United States, such transfers are governed by the European Commission's standard contractual clauses or by the Data Privacy Framework.",
        ],
      },
      {
        id: "rights",
        title: "Your rights",
        blocks: [
          "You have the following rights over your data:",
          {
            list: [
              "Right of access, rectification and erasure",
              "Right to restriction of processing and right to object",
              "Right to data portability",
              "Right to withdraw your consent at any time",
              "Right to set guidelines on the fate of your data after your death",
            ],
          },
          "To exercise these rights, write to dpo@orvane-geneve.ch with proof of identity. We will reply within one month.",
          "You may also lodge a complaint with the CNIL (cnil.fr) or the Swiss Federal Data Protection and Information Commissioner (edoeb.admin.ch).",
        ],
      },
      {
        id: "security",
        title: "Security",
        blocks: [
          "We implement appropriate technical and organisational measures: end-to-end TLS encryption, restricted data access, logging and regular review of access rights.",
        ],
      },
      {
        id: "changes",
        title: "Changes",
        blocks: [
          "This policy may change. The date of the last update appears at the top of the page. In the event of a substantial change, we will inform you via a banner on the website.",
        ],
      },
    ],
  },
  cookies: {
    updated: UPDATED,
    intro:
      "During your visit, cookies and trackers may be placed on your device. In line with CNIL guidelines, only strictly necessary cookies are placed without your consent.",
    sections: [
      {
        id: "definition",
        title: "What is a cookie?",
        blocks: [
          "A cookie is a small text file saved by your browser when visiting a website. It allows your device to be recognised and certain information to be remembered, such as your language preferences.",
        ],
      },
      {
        id: "used",
        title: "Cookies used",
        blocks: [
          {
            table: [
              ["Name", "Category", "Purpose", "Duration"],
              ["NEXT_LOCALE", "Necessary", "Remember the chosen language", "1 year"],
              ["orvane_consent", "Necessary", "Remember your cookie choices", "6 months"],
              ["_ov_audience", "Audience measurement", "Anonymised traffic statistics", "13 months"],
              ["_ov_pref", "Marketing", "Personalisation of content and invitations", "6 months"],
            ],
          },
        ],
      },
      {
        id: "consent",
        title: "Collecting consent",
        blocks: [
          "On your first visit, a banner lets you accept, reject or customise cookies by category. Rejecting is as easy as accepting.",
          "Your choice is kept for 6 months, after which you will be asked again.",
        ],
      },
      {
        id: "manage",
        title: "Changing your choices",
        blocks: [
          "You can change your preferences at any time using the “Manage cookies” link at the bottom of every page.",
          "You can also configure your browser to block cookies. Some features of the website may then be degraded.",
        ],
      },
    ],
  },
  terms: {
    updated: UPDATED,
    intro:
      "These terms of use define the conditions for accessing and using the orvane-geneve.ch website. By browsing the website, you unreservedly accept these terms.",
    sections: [
      {
        id: "purpose",
        title: "Purpose",
        blocks: [
          "The website presents the ORVANE Maison, its collections, its crafts and its salons, and allows appointments to be booked.",
        ],
      },
      {
        id: "access",
        title: "Access to the website",
        blocks: [
          "The website is accessible free of charge, 24 hours a day, except for interruptions due to maintenance or force majeure.",
          "Some areas, such as the Private Salon, are reserved for members of the ORVANE Circle.",
        ],
      },
      {
        id: "use",
        title: "Use of the website",
        blocks: [
          "Users undertake not to:",
          {
            list: [
              "interfere with the operation of the website or attempt to access it fraudulently;",
              "systematically extract or reuse the content of the website;",
              "submit false information through the forms.",
            ],
          },
        ],
      },
      {
        id: "links",
        title: "Hyperlinks",
        blocks: [
          "The website may contain links to third-party websites, including social networks. ORVANE has no control over these websites and accepts no liability for their content.",
        ],
      },
      {
        id: "changes",
        title: "Changes to the terms",
        blocks: [
          "ORVANE reserves the right to amend these terms at any time. The applicable version is the one online at the time of your visit.",
        ],
      },
    ],
  },
  sales: {
    updated: UPDATED,
    intro:
      "ORVANE watches are sold exclusively in our salons and through our authorised retailers. These terms of sale apply to any purchase made in an ORVANE salon.",
    sections: [
      {
        id: "prices",
        title: "Prices",
        blocks: [
          "Prices are expressed in Swiss francs (CHF), including VAT. In salons outside Switzerland, they are expressed in local currency, including applicable taxes.",
          "Prices shown on the website are indicative and do not constitute a contractual offer.",
        ],
      },
      {
        id: "orders",
        title: "Special orders",
        blocks: [
          "Any special order (personalised configuration, unique piece) is subject to a signed quotation and a 30% deposit. Production lead times are given for guidance only.",
        ],
      },
      {
        id: "payment",
        title: "Payment",
        blocks: [
          "Payment is made in the salon by bank transfer, payment card or any other method accepted by the salon. Ownership of the watch is only transferred after full payment.",
        ],
      },
      {
        id: "warranty",
        title: "Warranty",
        blocks: [
          "Every watch comes with an 8-year international warranty covering manufacturing defects. Excluded: normal wear, impacts, oxidation following opening by an unauthorised third party, and straps.",
          "These warranties are in addition to the statutory warranties applicable in the country of purchase.",
        ],
      },
      {
        id: "returns",
        title: "Exchanges and returns",
        blocks: [
          "An unworn watch, with its box and documents, may be exchanged within 14 days of purchase. Special orders cannot be returned or exchanged.",
        ],
      },
      {
        id: "disputes",
        title: "Disputes",
        blocks: [
          "In the event of a dispute, an amicable solution will be sought first. Consumers residing in the European Union may use a consumer mediator free of charge.",
          "Failing that, the courts of Geneva shall have jurisdiction, subject to mandatory provisions applicable to consumers.",
        ],
      },
    ],
  },
};

export function getLegal(key: LegalKey, locale: string): LegalDoc {
  return (locale === "en" ? en : fr)[key];
}
