import { sync } from 'fast-glob';
import { join, parse } from 'path';
//import vite from 'vite';

interface SitemapOptions {
  hostname: string;
  outDir: string;
  extensions: string;
  changefreq: string;
  priority: number;
  lastmod: Date;
  dynamicRoutes: string[];
  exclude: string[];
}
type UserOptions = Partial<SitemapOptions>;
interface ResolvedOptions extends SitemapOptions {}
function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return Object.assign(
    {
      hostname: 'http://localhost:8080/',
      outDir: 'dist',
      extensions: 'html',
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      dynamicRoutes: [],
      exclude: [],
    },
    userOptions
  );
}
interface SitemapURL {
  name: string;
  url: string;
}
function slash(str: string) {
  return str.replace(/\\/g, '/');
}
async function generateSitemap(options: ResolvedOptions) {
  const routes = (await import(options.outDir+'entry-server.js'))
  console.log('routes: ', routes)
}

function sitemapPlugin(options: UserOptions) {
  return {
    name: 'vite-plugin-fyvue-sitemap',
    async closeBundle() {
      const resolvedOptions: ResolvedOptions = resolveOptions(options);
      const res = await generateSitemap(resolvedOptions);
      console.log(res);
    },
    transformIndexHtml() {
      return [
        {
          tag: 'link',
          injectTo: 'head' as
            | 'head'
            | 'body'
            | 'head-prepend'
            | 'body-prepend'
            | undefined,
          attrs: {
            rel: 'sitemap',
            type: 'application/xml',
            title: 'Sitemap',
            href: '/sitemap.xml',
          },
        },
      ];
    },
  };
}

export default sitemapPlugin;
