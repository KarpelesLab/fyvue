import type { Ref } from 'vue';
import { getUrl, getLocale, getMode } from '@karpeleslab/klbfw';
import { useFyHead } from '@fy/head';
import type { FyHeadLazy } from '@fy/head';

export const useSeo = (seo: Ref<FyHeadLazy>, initial: boolean = false) => {
  if (initial) {
    seo.value.url = `${getUrl().scheme}://${getUrl().host}${getUrl().path}`;
    seo.value.canonical = `${getUrl().scheme}://${getUrl().host}${
      getUrl().path
    }`;
  }
  seo.value.locale = getLocale().replace('-', '_');
  if (!seo.value.type) seo.value.type = 'website';
  seo.value.robots =
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  useFyHead().lazySeo(seo.value, initial);
};
