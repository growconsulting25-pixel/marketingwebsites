// Starter articles for the resource hub (strategy §9). Each answers the
// question in the first paragraph, uses question-style H2s, links to exactly
// one money page, and ends with a FAQ. Add first-hand data (anonymised client
// results, screenshots) before promoting them — that is what makes them
// "non-commodity".

export const hubs = {
  fr: [
    { key: 'sites-web', label: 'Sites web' },
    { key: 'publicite', label: 'Publicité' },
    { key: 'leads', label: 'Génération de leads' },
    { key: 'crm', label: 'Suivi et CRM' },
  ],
  en: [
    { key: 'sites-web', label: 'Websites' },
    { key: 'publicite', label: 'Advertising' },
    { key: 'leads', label: 'Lead generation' },
    { key: 'crm', label: 'Follow-up & CRM' },
  ],
};

export const articles = [
  {
    id: 'art-pages', hub: 'sites-web', money: 're-websites', published: '2026-11-17', updated: '2026-11-17', minutes: 6,
    fr: {
      title: 'Les 10 pages essentielles d’un site de courtier immobilier',
      description: 'Les 10 pages qu’un site de courtier immobilier au Québec doit avoir pour attirer des vendeurs et des acheteurs — et ce que chacune doit contenir.',
      intro: 'Un site de courtier efficace a dix pages essentielles : accueil, évaluation gratuite, inscriptions Centris, propriétés vendues, à propos, témoignages, pages de quartiers, guides vendeur et acheteur, blogue et contact. Chacune a un rôle précis : attirer un vendeur, rassurer un acheteur ou transformer une visite en demande.',
      money: 'Voir notre offre de site web pour courtier',
      sections: [
        ['Quelles pages attirent des vendeurs?', `<p>Les vendeurs sont la clientèle la plus rentable, et ils cherchent surtout deux choses : la valeur de leur propriété et la preuve que vous savez vendre.</p>
<ol>
<li><strong>Évaluation gratuite</strong> — un formulaire court (adresse, type de propriété, échéancier). C’est la page la plus importante du site.</li>
<li><strong>Propriétés vendues</strong> — votre meilleure preuve sociale, dans les limites des règles applicables.</li>
<li><strong>Guide du vendeur</strong> — les étapes, les frais, le rôle du courtier. Répondez aux questions avant qu’on vous les pose.</li>
</ol>`],
        ['Quelles pages servent les acheteurs?', `<ol start="4">
<li><strong>Inscriptions Centris</strong> — à jour automatiquement, sur votre propre domaine.</li>
<li><strong>Alertes de nouvelles inscriptions</strong> — l’inscription transforme un visiteur anonyme en prospect.</li>
<li><strong>Guide de l’acheteur</strong> — préapprobation, inspection, taxe de bienvenue.</li>
</ol>`],
        ['Quelles pages bâtissent la confiance?', `<ol start="7">
<li><strong>À propos</strong> — une vraie photo, votre parcours, vos secteurs. Les gens choisissent une personne, pas un logo.</li>
<li><strong>Témoignages</strong> — avec le nom et, si possible, l’avis Google d’origine.</li>
<li><strong>Pages de quartiers</strong> — prix, écoles, services, ambiance. Elles aident aussi votre <a href="{{re-seo}}">SEO local</a>.</li>
</ol>`],
        ['Et la page contact?', `<ol start="10"><li><strong>Contact</strong> — téléphone cliquable, formulaire court, secteurs desservis et heures de réponse.</li></ol>
<p>Sur mobile, gardez un bouton d’appel ou de rendez-vous toujours visible. La majorité des visiteurs arrivent d’une publication ou d’une annonce sur leur téléphone.</p>`],
        ['Liste de vérification', `<ul class="checklist">
<li>Chaque page a un seul appel à l’action principal.</li>
<li>Le site existe en français et en anglais, rédigé dans les deux langues.</li>
<li>Les formulaires envoient les demandes dans un CRM, pas seulement par courriel.</li>
<li>Les mentions requises par votre bannière et l’OACIQ sont présentes.</li>
<li>Le site se charge en moins de 2,5 secondes sur mobile.</li>
</ul>`],
      ],
      faq: [
        ['Faut-il un blogue sur un site de courtier?', 'Ce n’est pas obligatoire, mais quelques articles locaux utiles (marché de votre secteur, guides) aident votre référencement et votre crédibilité.'],
        ['Un site de bannière suffit-il?', 'Il vous donne une présence, mais la marque, les prospects et le référencement appartiennent surtout à la bannière. Un site personnel bâtit votre propre actif.'],
      ],
    },
    en: {
      title: 'The 10 essential pages of a real estate broker website',
      description: 'The 10 pages every Quebec real estate broker website needs to attract sellers and buyers — and what each one should contain.',
      intro: 'An effective broker website has ten essential pages: home, free valuation, Centris listings, sold properties, about, testimonials, neighbourhood pages, seller and buyer guides, blog and contact. Each has a clear job: attract a seller, reassure a buyer or turn a visit into an inquiry.',
      money: 'See our broker website offer',
      sections: [
        ['Which pages attract sellers?', `<p>Sellers are the most profitable clients, and they mostly look for two things: what their home is worth, and proof that you know how to sell.</p>
<ol>
<li><strong>Free valuation</strong> — a short form (address, property type, timeline). It’s the most important page on the site.</li>
<li><strong>Sold properties</strong> — your best social proof, within the applicable rules.</li>
<li><strong>Seller guide</strong> — the steps, the costs, the broker’s role. Answer questions before they’re asked.</li>
</ol>`],
        ['Which pages serve buyers?', `<ol start="4">
<li><strong>Centris listings</strong> — updated automatically, on your own domain.</li>
<li><strong>New-listing alerts</strong> — signing up turns an anonymous visitor into a lead.</li>
<li><strong>Buyer guide</strong> — pre-approval, inspection, welcome tax.</li>
</ol>`],
        ['Which pages build trust?', `<ol start="7">
<li><strong>About</strong> — a real photo, your background, your areas. People choose a person, not a logo.</li>
<li><strong>Testimonials</strong> — with names and, where possible, the original Google review.</li>
<li><strong>Neighbourhood pages</strong> — prices, schools, services, vibe. They also help your <a href="{{re-seo}}">local SEO</a>.</li>
</ol>`],
        ['What about the contact page?', `<ol start="10"><li><strong>Contact</strong> — tap-to-call phone, short form, areas served and response times.</li></ol>
<p>On mobile, keep a call or booking button visible at all times. Most visitors arrive from a post or an ad on their phone.</p>`],
        ['Checklist', `<ul class="checklist">
<li>Every page has a single primary call to action.</li>
<li>The site exists in French and English, written in both languages.</li>
<li>Forms send inquiries into a CRM, not just to an inbox.</li>
<li>The mentions required by your banner and the OACIQ are present.</li>
<li>The site loads in under 2.5 seconds on mobile.</li>
</ul>`],
      ],
      faq: [
        ['Does a broker website need a blog?', 'It’s not mandatory, but a few useful local articles (your area’s market, guides) help your SEO and credibility.'],
        ['Is a banner website enough?', 'It gives you a presence, but the brand, the leads and the rankings mostly belong to the banner. A personal site builds your own asset.'],
      ],
    },
  },
  {
    id: 'art-response', hub: 'crm', money: 're-utilmo', published: '2026-11-17', updated: '2026-11-17', minutes: 5,
    fr: {
      title: 'Délai de réponse aux prospects : pourquoi les premières minutes comptent',
      description: 'Pourquoi répondre vite à un prospect immobilier change tout, et comment organiser votre suivi pour ne plus laisser refroidir une demande d’évaluation.',
      intro: 'Répondez à un nouveau prospect le plus vite possible — idéalement pendant qu’il est encore sur votre site ou son téléphone. Un vendeur qui demande une évaluation contacte souvent plusieurs courtiers; le premier qui répond avec quelque chose d’utile part avec une longueur d’avance. La solution n’est pas d’être toujours disponible, mais d’automatiser le premier contact et de planifier les relances.',
      money: 'Découvrir le CRM Utilmo',
      sections: [
        ['Pourquoi la vitesse de réponse est-elle si importante?', `<p>Au moment où il remplit votre formulaire, le prospect pense à son projet. Une heure plus tard, il est passé à autre chose — ou il parle déjà à un autre courtier. Une réponse rapide montre aussi le service qu’il recevra pendant la vente.</p>`],
        ['Que faire dans les cinq premières minutes?', `<ul class="checklist">
<li>Un courriel automatique confirme la demande et dit quand vous rappellerez.</li>
<li>Vous recevez une alerte sur votre téléphone avec la source et le besoin.</li>
<li>Pour une évaluation : un appel ou un texto personnel le jour même.</li>
</ul>`],
        ['Comment relancer sans harceler?', `<p>Planifiez une séquence courte : un rappel le lendemain, un contenu utile (statistiques de quartier, guide du vendeur) en fin de semaine, puis un suivi mensuel. Arrêtez dès que la personne répond ou se désabonne, et obtenez son consentement pour les courriels promotionnels, conformément à la LCAP.</p>`],
        ['Comment savoir si votre suivi fonctionne?', `<p>Mesurez trois chiffres chaque mois : le délai moyen de première réponse, le pourcentage de prospects joints, et le nombre de rendez-vous obtenus par source. Un CRM relié à votre site les calcule automatiquement.</p>`],
      ],
      faq: [
        ['Dois-je répondre la nuit et la fin de semaine?', 'Pas personnellement. Une réponse automatique claire, suivie d’un appel au début de la journée suivante, est déjà bien mieux qu’un silence.'],
        ['Faut-il appeler ou écrire?', 'Pour une demande d’évaluation, un appel est souvent plus efficace. Pour un acheteur qui s’inscrit aux alertes, un courriel utile suffit au départ.'],
      ],
    },
    en: {
      title: 'Lead response time: why the first minutes matter',
      description: 'Why responding quickly to a real estate lead changes everything, and how to organize your follow-up so valuation requests never go cold.',
      intro: 'Reply to a new lead as quickly as possible — ideally while they are still on your site or holding their phone. A seller requesting a valuation often contacts several brokers; the first to reply with something useful gets a head start. The fix isn’t being available 24/7, it’s automating the first contact and scheduling follow-ups.',
      money: 'Discover the Utilmo CRM',
      sections: [
        ['Why does response speed matter so much?', `<p>When they fill in your form, the prospect is thinking about their project. An hour later they’ve moved on — or they’re already talking to another broker. A fast reply also previews the service they’ll get during the sale.</p>`],
        ['What should happen in the first five minutes?', `<ul class="checklist">
<li>An automatic email confirms the request and says when you’ll call.</li>
<li>You get a phone alert with the source and the need.</li>
<li>For a valuation: a personal call or text the same day.</li>
</ul>`],
        ['How do you follow up without being pushy?', `<p>Plan a short sequence: a reminder the next day, useful content (neighbourhood stats, seller guide) at the end of the week, then a monthly check-in. Stop as soon as they reply or unsubscribe, and get consent for promotional emails in line with CASL.</p>`],
        ['How do you know your follow-up is working?', `<p>Track three numbers each month: average time to first reply, the share of leads reached, and appointments booked per source. A CRM connected to your site calculates them automatically.</p>`],
      ],
      faq: [
        ['Do I need to reply at night and on weekends?', 'Not personally. A clear automatic reply followed by a call first thing the next day is already far better than silence.'],
        ['Should I call or write?', 'For a valuation request, a call is often more effective. For a buyer signing up for alerts, a useful email is enough at first.'],
      ],
    },
  },
  {
    id: 'art-budget', hub: 'publicite', money: 're-ads', published: '2026-11-17', updated: '2026-11-17', minutes: 6,
    fr: {
      title: 'Budget publicitaire d’un courtier immobilier : comment le calculer',
      description: 'Comment fixer un budget Google Ads et Meta réaliste quand on est courtier immobilier au Québec : partir du nombre de mandats visés, pas d’un montant au hasard.',
      intro: 'Calculez votre budget publicitaire à l’envers : partez du nombre de mandats que vous voulez obtenir, estimez combien de prospects il faut pour signer un mandat, puis multipliez par votre coût par prospect. Commencez avec un budget de test sur 2 à 3 mois, mesurez dans votre CRM, puis ajustez.',
      money: 'Voir notre service de publicité pour courtiers',
      sections: [
        ['Quelle formule utiliser?', `<div class="formula"><p><strong>Budget mensuel</strong> = mandats visés × prospects nécessaires par mandat × coût par prospect</p></div>
<p>Les deux dernières valeurs varient selon le secteur, la saison et la qualité de votre suivi. Au départ, utilisez une hypothèse prudente; après quelques mois, remplacez-la par <em>vos</em> chiffres réels tirés du CRM.</p>`],
        ['Pourquoi le suivi change-t-il le budget?', `<p>Le même budget peut produire deux fois plus de mandats si chaque prospect reçoit une réponse rapide et des relances. Avant d’augmenter vos dépenses, vérifiez votre <a href="{{art-response}}">délai de réponse</a>.</p>`],
        ['Google ou Meta?', `<p>Google capte une intention existante (« évaluation maison Laval »). Meta crée de la demande et fait connaître votre visage dans un secteur. La plupart des courtiers combinent une campagne Google d’évaluation et une campagne Meta de notoriété ou de promotion d’inscriptions.</p>
<p>Attention : les annonces immobilières sur Meta font partie d’une catégorie spéciale qui limite le ciblage par âge, genre et code postal.</p>`],
        ['Ce qu’il faut mesurer', `<ul class="checklist">
<li>Coût par prospect, par campagne.</li>
<li>Coût par prospect <em>qualifié</em> (projet réel, échéancier connu).</li>
<li>Rendez-vous et mandats signés par source, sur 3 à 6 mois.</li>
</ul>`],
      ],
      faq: [
        ['Combien de temps tester avant de juger?', 'Prévoyez au moins 2 à 3 mois : le cycle de vente immobilier est long et les premières semaines servent à optimiser.'],
        ['Mes annonces doivent-elles respecter l’OACIQ?', 'Oui. Toute publicité d’un courtier doit respecter les règles applicables; faites valider vos annonces avant leur diffusion.'],
      ],
    },
    en: {
      title: 'Real estate broker ad budget: how to work it out',
      description: 'How to set a realistic Google Ads and Meta budget as a Quebec real estate broker: start from the listings you want, not from a random number.',
      intro: 'Work your ad budget backwards: start from the number of listings you want, estimate how many leads it takes to sign one, then multiply by your cost per lead. Start with a 2–3 month test budget, measure in your CRM, then adjust.',
      money: 'See our advertising service for brokers',
      sections: [
        ['Which formula should you use?', `<div class="formula"><p><strong>Monthly budget</strong> = target listings × leads needed per listing × cost per lead</p></div>
<p>The last two values vary by area, season and the quality of your follow-up. Start with a cautious assumption; after a few months, replace it with <em>your</em> real numbers from the CRM.</p>`],
        ['Why does follow-up change the budget?', `<p>The same budget can produce twice as many listings if every lead gets a fast reply and follow-ups. Before spending more, check your <a href="{{art-response}}">response time</a>.</p>`],
        ['Google or Meta?', `<p>Google captures existing intent (“home valuation Laval”). Meta creates demand and makes your face known in an area. Most brokers combine a Google valuation campaign with a Meta awareness or listing-promotion campaign.</p>
<p>Note: real estate ads on Meta fall into a special category that limits targeting by age, gender and postal code.</p>`],
        ['What to measure', `<ul class="checklist">
<li>Cost per lead, by campaign.</li>
<li>Cost per <em>qualified</em> lead (real project, known timeline).</li>
<li>Appointments and signed listings by source, over 3–6 months.</li>
</ul>`],
      ],
      faq: [
        ['How long should I test before judging?', 'Allow at least 2–3 months: the real estate sales cycle is long and the first weeks are for optimizing.'],
        ['Do my ads need to follow OACIQ rules?', 'Yes. All broker advertising must follow the applicable rules; have your ads reviewed before they run.'],
      ],
    },
  },
];
