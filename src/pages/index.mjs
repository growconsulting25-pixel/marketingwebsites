import { reServices } from '../content/realestate.mjs';
import { generalServices } from '../content/general.mjs';
import { articles } from '../content/articles.mjs';
import { home } from './home.mjs';
import { reHub, reServicePage, rePackages } from './realestate.mjs';
import { servicesHub, generalServicePage } from './general.mjs';
import { work, resources, articlePage, about, contact, quote, demo, thanks, privacy } from './misc.mjs';

// Returns a list of page builders; each is called with the language.
export const pageBuilders = [
  home, reHub, rePackages,
  ...reServices.filter((s) => !s.hidden).map((s) => (lang) => reServicePage(s, lang)),
  servicesHub,
  ...generalServices.map((s) => (lang) => generalServicePage(s, lang)),
  work, resources,
  ...articles.map((a) => (lang) => articlePage(a, lang)),
  about, contact, quote, demo, thanks, privacy,
];
