<template>
  <div class="fv-typo">
    <h1>KLB i18next</h1>
    <p>
      You will need to import <b>i18nextPromise</b> from
      <b>@karpeleslab/fyvue</b> and await it in the setup context. This require
      the use of
      <a
        href="https://vuejs.org/guide/built-ins/suspense.html#suspense"
        target="_blank"
        ><code v-text="`<Suspense>`"></code></a
      >. With SSR this await will be invisible for the client.
    </p>
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
