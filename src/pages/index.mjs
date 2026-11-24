import { services } from '../content/services.mjs';
import { industries } from '../content/industries.mjs';
import { articles } from '../content/articles.mjs';
import { home } from './home.mjs';
import { servicesHub, servicePage } from './services.mjs';
import { industriesHub, industryPage } from './industries.mjs';
import { faqPage } from './faq.mjs';
import { legacyBuilders } from './legacy.mjs';
import { work, resources, articlePage, about, contact, quote, demo, thanks, privacy } from './misc.mjs';

// Each builder is called once per language.
export const pageBuilders = [
  home,
  servicesHub, ...services.map((s) => (lang) => servicePage(s, lang)),
  industriesHub, ...industries.map((d) => (lang) => industryPage(d, lang)),
  work, resources, ...articles.map((a) => (lang) => articlePage(a, lang)),
  about, faqPage, contact, quote, demo, thanks, privacy,
  ...legacyBuilders,
];
