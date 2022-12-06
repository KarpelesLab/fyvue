import type { Ref } from 'vue';
import { getUrl, getLocale, getMode } from '@karpeleslab/klbfw';
import { useFyHead } from '@fy-/head';
import { computed } from 'vue';

export interface FyHeadLazy {
  name?: string;
  title?: string;
  image?: string;
  imageType?: string;
  imageWidth?: string;
  imageHeight?: string;
  description?: string;
  published?: string;
  modified?: string;
  keywords?: string;
  type?: 'blog' | 'search' | 'article' | 'website';
  searchAction?: string;
  next?: string;
  prev?: string;
  canonical?: string;
  locale?: string;
  robots?: string;
  url?: string;
}

export const useSeo = (seo: Ref<FyHeadLazy>, initial: boolean = false) => {
  useFyHead({
    title: computed(() => seo.value.title),
    links: computed(() => {
      const _res: Array<any> = [];

      if (initial && getMode() == 'ssr') {
        _res.push({
          rel: 'canonical',
          href: `${getUrl().scheme}://${getUrl().host}${getUrl().path}`,
          key: 'canonical',
        });
      }
      if (seo.value.prev) {
        _res.push({
          rel: 'prev',
          href: seo.value.prev,
          key: 'prev',
        });
      }
      if (seo.value.next) {
        _res.push({
          rel: 'next',
          href: seo.value.next,
          key: 'next',
        });
      }
      return _res;
    }),
    /*htmlAttrs: computed(() => {
      if (initial && getMode() == 'ssr')
        return { lang: computed(() => getLocale()) };
      return {};
    }),
    bodyAttrs: computed(() => {
      if (initial) return { itemtype: 'http://schema.org/WebPage' };
      return {};
    }),*/
    metas: computed(() => {
      const _res: Array<any> = [];

      if (initial) {
        if (getMode() == 'ssr') {
          _res.push(
            {
              property: 'og:locale',
              content: getLocale().replace('-', '_'),
            },
            {
              property: 'og:url',
              content: getUrl().full,
            }
          );
        }
        _res.push(
          {
            property: 'og:type',
            content: 'website',
          },
          {
            name: 'robots',
            content:
              'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          }
        );
      }
      if (seo.value.name) {
        _res.push({
          property: 'og:site_name',
          content: seo.value.name,
        });
      }
      if (seo.value.type) {
        _res.push({
          property: 'og:type',
          content: seo.value.type,
        });
      }
      if (seo.value.title) {
        _res.push(
          {
            property: 'og:title',
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
            property: 'og:description',
            content: seo.value.description,
          },
          {
            name: 'twitter:description',
            content: seo.value.description,
          },
          {
            property: 'og:description',
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
          property: 'article:published_time',
          content: seo.value.modified,
        });
      }
      if (seo.value.published) {
        _res.push({
          property: 'article:modified_time',
          content: seo.value.published,
        });
      }
      if (seo.value.imageWidth && seo.value.imageHeight) {
        _res.push(
          {
            property: 'og:image:width',
            content: seo.value.imageWidth,
          },
          {
            property: 'og:image:height',
            content: seo.value.imageHeight,
          }
        );
      }
      if (seo.value.imageType) {
        _res.push({
          property: 'og:image:type',
          content: seo.value.imageType,
        });
      }
      if (seo.value.image) {
        _res.push(
          {
            property: 'og:image',
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
