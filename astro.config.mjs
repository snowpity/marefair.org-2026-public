// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), '');

const newsResponse = await fetch(`${env.API_BASE_URL}/announcement/GetPagedAnnouncements?pageSize=50&pageIndex=1&year=2026`);
const newsData = newsResponse.ok ? await newsResponse.json() : [];
const newsSlugs = newsData.map(a => `https://marefair.org/news/${a.slug}`);

export default defineConfig({
  redirects: {
    '/vendor': '/vendors',
    '/conbook': 'https://fair-filer.marefair.org/2026/misc/MareFair2026_ConBook12_Digital.pdf',
    '/donate': 'https://www.zeffy.com/en-US/donation-form/donate-to-mare-fair-2026-charities',
    '/cosplay': 'https://docs.google.com/forms/d/1LK9Pqis2DCDhun8pCK8QXjLtBjWEgDckEIy1yJ5Z4R0'
  },
  prefetch: true,
  site: 'https://marefair.org/',
  integrations: [
    icon(),
    sitemap({
      customPages: newsSlugs,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});