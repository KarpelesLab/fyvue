import { computed } from 'vue';
import type { Ref } from 'vue';
import { useHead } from '@vueuse/head';
import type { SeoData } from '../../dts/index';
import { getUrl, getLocale, getMode } from '@karpeleslab/klbfw';
import {
  useSchemaOrg,
  defineWebSite,
  defineOrganization,
  defineWebPage,
  defineSearchAction,
} from '@vueuse/schema-org/runtime';

export const useSeo = (seo: Ref<SeoData>, initial: boolean = false) => {
  if (initial) {
    useSchemaOrg([
      defineOrganization({
        name: seo.value.name,
        logo: seo.value.image,
      }),
      defineWebSite({
        name: seo.value.name,
        potentialAction: computed(() => {
          const _res: Array<any> = [];
          if (seo.value.searchAction) {
            _res.push(defineSearchAction({ target: seo.value.searchAction }));
          }
          return _res;
        }),
      }),
      defineWebPage(),
    ]);
  }
  /*
  @redo with store per page
  if (seo.value.published)
    defineWebPage({ datePublished: seo.value.published });
  if (seo.value.modified) defineWebPage({ dateModified: seo.value.modified });
  if (seo.value.image) defineWebPage({ image: seo.value.image });
  if (seo.value.title) defineWebPage({ name: seo.value.title });
  if (seo.value.type) {
    if (seo.value.type == 'search')
      defineWebPage({ '@types': 'SearchResultsPage' });
  }
  if (getMode() == 'ssr') {
    defineWebPage({
      url: `${getUrl().scheme}://${getUrl().host}${getUrl().path}`,
    });
  }*/

  useHead({
    title: computed(() => seo.value.title),
    link: computed(() => {
      const _res: Array<any> = [];

      if (initial && getMode() == 'ssr') {
        _res.push({
          rel: 'canonical',
          href: `${getUrl().scheme}://${getUrl().host}${getUrl().path}`,
        });
      }
      if (seo.value.prev) {
        _res.push({
          rel: 'prev',
          href: seo.value.prev,
        });
      }
      if (seo.value.next) {
        _res.push({
          rel: 'next',
          href: seo.value.next,
        });
      }
      return _res;
    }),
    htmlAttrs: computed(() => {
      if (initial && getMode() == 'ssr')
        return { lang: computed(() => getLocale()) };
      return {};
    }),
    bodyAttrs: computed(() => {
      if (initial) return { itemtype: 'http://schema.org/WebPage' };
      return {};
    }),
    meta: computed(() => {
      const _res: Array<any> = [];

      if (initial) {
        if (getMode() == 'ssr') {
          _res.push(
            {
              name: 'og:locale',
              content: getLocale().replace('-', '_'),
            },
            {
              name: 'og:url',
              content: getUrl().full,
            }
          );
        }
        _res.push(
          {
            name: 'og:type',
            content: 'website',
          },
          {
            name: 'robots',
            content:
              'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          }
        );
      }
      if (seo.value.type) {
        _res.push({
          name: 'og:type',
          content: seo.value.type,
        });
      }
      if (seo.value.title) {
        _res.push(
          {
            name: 'og:title',
            content: seo.value.title,
          },
          {
            name: 'twitter:title',
            content: seo.value.title,
          }
        );
      }
      if (seo.value.description) {
        _res.push(
          {
            name: 'og:description',
            content: seo.value.description,
          },
          {
            name: 'twitter:description',
            content: seo.value.description,
          },
          {
            name: 'og:description',
            content: seo.value.description,
          },
          {
            name: 'description',
            content: seo.value.description,
          }
        );
      }
      if (seo.value.modified) {
        _res.push({
          name: 'article:published_time',
          content: seo.value.modified,
        });
      }
      if (seo.value.published) {
        _res.push({
          name: 'article:modified_time',
          content: seo.value.published,
        });
      }
      if (seo.value.imageWidth && seo.value.imageHeight) {
        _res.push(
          {
            name: 'og:image:width',
            content: seo.value.imageWidth,
          },
          {
            name: 'og:image:height',
            content: seo.value.imageHeight,
          }
        );
      }
      if (seo.value.imageType) {
        _res.push({
          name: 'og:image:type',
          content: seo.value.imageType,
        });
      }
      if (seo.value.image) {
        _res.push(
          {
            name: 'og:image',
            content: seo.value.image,
          },
          {
            name: 'twitter:image',
            content: seo.value.image,
          }
        );
      }

      return _res;
    }),
  });
};
