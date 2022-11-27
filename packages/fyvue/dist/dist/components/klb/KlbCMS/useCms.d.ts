import type { Ref } from 'vue';
import type { FyVueBreadcrumb } from '../../../dts/index';
import type { SeoData } from '../../../dts/index';
import type { KlbAPIContentCmsSingle } from '../../../dts/klb';
export type CMSDisplayType = 'multiple' | 'single';
export declare function useCMS(): {
    getArticle: (slug: string, basePath: string, alias: string, siteName: string, breadcrumbBase: Array<FyVueBreadcrumb>, seo: Ref<SeoData>, is404: Ref<Boolean>, dataSingle: Ref<KlbAPIContentCmsSingle | undefined>, displayType?: Ref<CMSDisplayType> | undefined, blogName?: Ref<string> | undefined, breadcrumb?: Ref<Array<FyVueBreadcrumb>> | undefined, vars?: Array<string>) => Promise<{
        seo: Ref<SeoData>;
        is404: Ref<Boolean>;
        dataSingle: Ref<KlbAPIContentCmsSingle | undefined>;
        displayType: Ref<CMSDisplayType> | undefined;
        blogName: Ref<string> | undefined;
    }>;
};
