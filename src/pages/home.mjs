import { link } from '../routes.mjs';
import { ui } from '../content/ui.mjs';
import { html, icon } from '../lib/html.mjs';
import { organizationSchema } from '../lib/layout.mjs';
import { logoStrip, utilmoSpotlight, processSteps, latestResources, finalCta, sectionHead, arrowBtn, faqBlock, faqSchema } from '../lib/components.mjs';
import { heroStudio, rotator, servicesIndex, industriesCarousel, statsBand, workShowcase, testimonialsMarquee, teamSection } from '../lib/sections.mjs';

const copy = {
  en: {
    title: 'Web Design & Online Marketing Services | Marketing Websites',
    description: 'Web design and online marketing services in Montreal: websites, SEO, Google Ads, social media, e-commerce and the Utilmo CRM for businesses in every industry.',
    eyebrow: 'Full-service digital agency · Montreal',
    h1a: 'Web design & digital marketing agency', h1b: 'for',
    words: ['businesses', 'restaurants', 'clinics', 'contractors', 'professionals', 'realtors'],
    sub: 'Website design, SEO, Google Ads, social media and our own CRM: website marketing services from one Montreal team that turns visitors into customers, since 2015.',
    trust: ['Since 2015', 'Bilingual FR/EN', 'Our own CRM'],
    faq: [
      ['What services does Marketing Websites offer?', 'Web design, e-commerce, web application development, SEO, Google Ads, social media management, website analytics and our own CRM, Utilmo — for businesses in every industry.'],
      ['Do you only work with Montreal businesses?', 'We are based in Montreal and work with businesses across Quebec and Canada, in French and English.'],
      ['How much does a website or campaign cost?', 'Every project is different. After a short call we send a clear, written quote with a price range.'],
      ['Can you redesign my site without losing my Google rankings?', 'Yes. We keep URLs that rank, redirect every old page and monitor Search Console after launch.'],
      ['Do I own my website and ad accounts?', 'Yes. Your domain, your content, your ad accounts and your data belong to you.'],
    ],
  },
  fr: {
    title: 'Agence Marketing Web à Montréal | Marketing Websites',
    description: 'Agence de marketing web à Montréal : conception de sites web, référencement SEO, Google Ads, médias sociaux, e-commerce et CRM Utilmo pour les entreprises de toutes les industries.',
    eyebrow: 'Agence numérique à service complet · Montréal',
    h1a: 'Agence de marketing web et de sites web', h1b: 'pour les',
    words: ['PME', 'restaurants', 'cliniques', 'entrepreneurs', 'professionnels', 'courtiers'],
    sub: 'Conception de sites web, SEO, Google Ads, médias sociaux et notre propre CRM : une seule équipe de marketing web à Montréal qui transforme vos visiteurs en clients, depuis 2015.',
    trust: ['Depuis 2015', 'Bilingue FR/EN', 'Notre propre CRM'],
    faq: [
      ['Quels services offre Marketing Websites?', 'Conception web, commerce électronique, développement d’applications web, SEO, Google Ads, gestion des médias sociaux, analyse de site web et notre propre CRM, Utilmo, pour les entreprises de toutes les industries.'],
      ['Travaillez-vous seulement avec des entreprises de Montréal?', 'Nous sommes basés à Montréal et accompagnons des entreprises partout au Québec et au Canada, en français et en anglais.'],
      ['Combien coûte un site web ou une campagne?', 'Chaque projet est différent. Après un court appel, nous envoyons une soumission claire, par écrit, avec une fourchette de prix.'],
      ['Pouvez-vous refaire mon site sans perdre mon classement Google?', 'Oui. Nous gardons les adresses qui se classent, redirigeons chaque ancienne page et surveillons la Search Console après le lancement.'],
      ['Mon site et mes comptes publicitaires m’appartiennent-ils?', 'Oui. Votre domaine, votre contenu, vos comptes publicitaires et vos données vous appartiennent.'],
    ],
  },
};

export const home = (lang) => {
  const c = copy[lang];
  const t = ui[lang];
  const fr = lang === 'fr';
  return {
    id: 'home', lang, title: c.title, description: c.description, bodyClass: 'page-home',
    schema: [organizationSchema(), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Marketing Websites', url: 'https://marketingwebsites.ca/', inLanguage: `${lang}-CA` }, faqSchema(c.faq)],
    body: html`
    <section class="hero hero--v4" aria-labelledby="hero-h">
      <div class="mesh" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="container hero__in">
        <div class="hero__copy">
          <p class="eyebrow">${c.eyebrow}</p>
          <h1 id="hero-h"><span class="h1a">${c.h1a}</span> <span class="h1b">${c.h1b} ${rotator(c.words)}</span></h1>
          <p class="lead hero__sub">${c.sub}</p>
          <div class="btn-row">
            ${arrowBtn(link('quote', lang), t.cta.quote, { cls: 'btn--lg btn--magnetic', cta: 'quote' })}
            <a class="btn btn--ghost btn--lg" href="${link('work', lang)}">${t.cta.work}</a>
          </div>
          <ul class="hero__trust">${c.trust.map((x) => html`<li>${icon('check')}${x}</li>`)}</ul>
        </div>
        <div class="hero__visual">${heroStudio(lang)}</div>
      </div>
      <a class="scroll-cue" href="#svc-h" aria-label="${fr ? 'Défiler vers les services' : 'Scroll to services'}"><span></span></a>
    </section>

    ${logoStrip(lang)}
    ${servicesIndex(lang)}
    ${statsBand(lang)}
    ${workShowcase(lang)}
    ${industriesCarousel(lang)}
    ${teamSection(lang)}
    ${utilmoSpotlight(lang)}
    ${testimonialsMarquee(lang)}

    <section class="section sec-blue process-blue" aria-labelledby="process-h">
      <div class="container">
        ${sectionHead({ eyebrow: fr ? 'Comment on travaille' : 'How we work', title: fr ? html`De la consultation <em>à la croissance</em>` : html`From consultation <em>to growth</em>`, lead: fr ? 'Un processus clair, un seul interlocuteur et des rapports qui parlent de ventes, pas seulement de clics.' : 'A clear process, one point of contact and reports that talk about sales, not just clicks.', id: 'process-h', center: true })}
        ${processSteps(lang, fr
          ? [['Consultation', '30 minutes pour comprendre vos objectifs, vos clients et vos concurrents.', 'Semaine 0'], ['Stratégie', 'Plan, pages, mots-clés, campagnes et indicateurs.', 'Semaine 1'], ['Conception', 'Design, rédaction FR/EN, développement et intégrations.', 'Semaines 2 à 6'], ['Lancement', 'Tests, redirections, suivi analytique et mise en ligne.', 'Semaine 6 à 8'], ['Croissance', 'SEO, publicité, contenu et rapport mensuel.', 'En continu']]
          : [['Consultation', '30 minutes to understand your goals, customers and competitors.', 'Week 0'], ['Strategy', 'Plan, pages, keywords, campaigns and KPIs.', 'Week 1'], ['Design & build', 'Design, FR/EN copy, development and integrations.', 'Weeks 2–6'], ['Launch', 'Testing, redirects, analytics and go-live.', 'Weeks 6–8'], ['Growth', 'SEO, ads, content and monthly reporting.', 'Ongoing']])}
      </div>
    </section>

    <section class="section section--sand" aria-labelledby="faq-h">
      <div class="container faq-wrap">
        ${sectionHead({ eyebrow: 'FAQ', title: fr ? 'Questions fréquentes' : 'Frequently asked questions', id: 'faq-h' })}
        ${faqBlock(lang, c.faq)}
      </div>
    </section>

    <section class="section" aria-labelledby="res-h">
      <div class="container">
        <div class="split-head">
          ${sectionHead({ eyebrow: t.nav.blog, title: fr ? html`Conseils <em>concrets</em>` : html`Practical <em>advice</em>`, id: 'res-h' })}
          <a class="link reveal" href="${link('blog', lang)}">${fr ? 'Tous les articles' : 'All articles'} ${icon('arrow')}</a>
        </div>
        ${latestResources(lang)}
      </div>
    </section>

    ${finalCta(lang, { type: 'quote', title: fr ? html`Parlons de <em>votre croissance</em>` : html`Let’s talk about <em>your growth</em>`, lead: fr ? 'Décrivez votre projet en deux minutes. Nous vous répondons en un jour ouvrable avec une approche et une fourchette de prix.' : 'Describe your project in two minutes. We reply within one business day with an approach and a price range.' })}`,
  };
};
