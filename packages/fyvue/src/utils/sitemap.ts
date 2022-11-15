function generateSitemap(options: {}) {}

function sitemapPlugin(options: {}) {
  return {
    name: 'vite-plugin-fyvue-sitemap',
    closeBundle() {
      generateSitemap(options);
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
