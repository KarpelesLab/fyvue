import type { Ref } from 'vue';
import { rest } from '../../helpers/rest';
import { useHistory } from '../../helpers/ssr';
import type { SeoData } from '../../types';
import type { KlbAPIContentCmsSingle } from '../../KlbApiTypes';
import { BreadcrumbLink } from '@fy-/ui';
export type CMSDisplayType = 'multiple' | 'single';

export function useCMS() {
  return {
    getArticle: async (
      slug: string,
      basePath: string,
      alias: string,
      siteName: string,
      breadcrumbBase: Array<BreadcrumbLink>,
      seo: Ref<SeoData>,
      is404: Ref<Boolean>,
      dataSingle: Ref<KlbAPIContentCmsSingle | undefined>,
      displayType: Ref<CMSDisplayType> | undefined = undefined,
      blogName: Ref<string> | undefined = undefined,
      breadcrumb: Ref<Array<BreadcrumbLink>> | undefined = undefined,
      vars: Array<string> = [
        'strip&format=png&scale_crop=512x512&alias=squared',
        'strip&format=png&scale_crop=1280x100&alias=bannerx100',
        'strip&format=png&scale_crop=1200x630&alias=seo',
        'strip&format=png&alias=source',
      ]
    ) => {
      seo.value = {
        title: undefined,
        image: undefined,
        imageType: undefined,
        description: undefined,
        published: undefined,
        modified: undefined,
        keywords: undefined,
        imageWidth: undefined,
        imageHeight: undefined,
        type: 'article',
      };

      is404.value = false;
      if (displayType) displayType.value = 'single';

      const _data = await rest<KlbAPIContentCmsSingle>(
        `Content/Cms/${alias}:loadSlug`,
        'GET',
        {
          slug: slug,
          image_variation: vars,
        }
      ).catch((err) => {
        if (err.code == 404) {
          useHistory().status = 404;
          is404.value = true;
          seo.value.title = '404';
        }
        return;
      });
      if (_data && _data.result == 'success') {
        if (blogName) blogName.value = _data.data.content_cms.Name;
        if (breadcrumb && breadcrumb.value.length)
          if (blogName) {
            breadcrumb.value = [
              ...breadcrumbBase,
              { name: blogName.value, to: basePath },
              { name: _data.data.content_cms_entry_data.Title },
            ];
          } else {
            breadcrumb.value = [
              ...breadcrumbBase,
              { name: _data.data.content_cms_entry_data.Title },
            ];
          }
        dataSingle.value = _data;
        seo.value.published = new Date(
          parseInt(_data.data.content_cms_entry_data.Published.unixms)
        ).toISOString();
        seo.value.modified = new Date(
          parseInt(_data.data.content_cms_entry_data.Last_Modified.unixms)
        ).toISOString();
        seo.value.title = blogName
          ? _data.data.content_cms_entry_data.Title + ' - ' + blogName.value
          : _data.data.content_cms_entry_data.Title;
        if (_data.data.content_cms_entry_data.Short_Contents) {
          seo.value.description =
            _data.data.content_cms_entry_data.Short_Contents;
        }
        if (
          _data.data.content_cms_entry_data.Keywords &&
          _data.data.content_cms_entry_data.Keywords.length
        ) {
          seo.value.keywords =
            _data.data.content_cms_entry_data.Keywords.join(',').trim();
        }
        if (
          _data.data.content_cms_entry_data.Top_Drive_Item &&
          _data.data.content_cms_entry_data.Top_Drive_Item.Media_Image &&
          _data.data.content_cms_entry_data.Top_Drive_Item.Media_Image.Variation
        ) {
          seo.value.imageType =
            _data.data.content_cms_entry_data.Top_Drive_Item.Mime;
          seo.value.image =
            _data.data.content_cms_entry_data.Top_Drive_Item.Media_Image?.Variation[
              'seo'
            ];
          seo.value.imageWidth = '1200';
          seo.value.imageHeight = '630';
        }
      }

      return {
        seo,
        is404,
        dataSingle,
        displayType,
        blogName,
      };
    },
  };
}
