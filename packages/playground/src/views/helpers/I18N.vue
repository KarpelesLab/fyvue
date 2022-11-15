<template>
    <div class="fv-typo">
      <h1>KLB i18next</h1>
      <p>You will need to import <b>i18nextPromise</b> from <b>@karpeleslab/fyvue</b> and await it in the setup context. This require the use of <a
        href="https://vuejs.org/guide/built-ins/suspense.html#suspense"
        target="_blank"
        ><code v-text="`<Suspense>`"></code></a
      >. With SSR this await will be invisible for the client.</p>
      <FvHL>// composition API, this should be in your root template
import { i18nextPromise } from '@karpeleslab/fyvue';
await i18nextPromise;

// or if you want to do this on the client side (no need for suspense here)
onMounted(async() => { await i18nextPromise })
</FvHL>
<h2>Using translations</h2>
<p>You can use <b>useTranslation</b> for the composition API or <b>this.$t</b> for the options API.</p>
<FvHL>// composition api
import { useTranslation, rest } from '@karpeleslab/fyvue';
const translate = useTranslation();
console.log(translate('confirm_modal_cta_confirm'));

//options api & templates
console.log(this.$t('confirm_modal_cta_confirm'))
</FvHL>
</div>
</template>
