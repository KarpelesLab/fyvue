<script setup></script>
<template>
  <KlbPage
    pagesAlias="ctcm-dwt7xu-mmez-eh3f-xmg2-pqrzarfa"
    :showFooter="false"
    forceSlug="helpers-i18n"
    :breadcrumbBase="$route.meta.breadcrumb ? $route.meta.breadcrumb : []"
  />
  <div class="fv-typo doc-contained margins flex-1">
    <h2>Usage</h2>
    <!-- prettier-ignore --><FvHL><pre>// composition API, this should be in your root template
import { i18nextPromise } from '@karpeleslab/fyvue';
import { Backend } from '@karpeleslab/i18next-klb-backend'; // Or any i18next Backend

await i18nextPromise(Backend);
</pre></FvHL>
    <h2>Using translations</h2>
    <p>
      You can use <b>useTranslation</b> for the composition API or
      <b>this.$t</b> for the options API.
    </p>
    <!-- prettier-ignore --><FvHL><pre>// composition api
import { useTranslation, rest } from '@karpeleslab/fyvue';
const translate = useTranslation();
console.log(translate('confirm_modal_cta_confirm'));

//options api & templates
console.log(this.$t('confirm_modal_cta_confirm'))
</pre></FvHL>
  </div>
</template>
