<script setup></script>
<template>
  <KlbPage
    pagesAlias="ctcm-dwt7xu-mmez-eh3f-xmg2-pqrzarfa"
    :showFooter="false"
    forceSlug="ssr-rest"
    :breadcrumbBase="$route.meta.breadcrumb ? $route.meta.breadcrumb : []"
  />
  <div class="fv-typo doc-contained margins flex-1">
    <h2>Usage</h2>

    <!-- prettier-ignore --><FvHL><pre>import { rest } from '@karpeleslab/fyvue'; // now
// import { rest } from '@karpeleslab/klbfw'</pre></FvHL>
    <p>
      The API remains exactly the same. Internally, "fyvue's rest" uses a pinia
      store to index rest results performed in the
      <a
        href="https://vuejs.org/api/sfc-script-setup.html#script-setup"
        target="_blank"
        >setup</a
      >
      context, It is then passed to the client via FW.initial.
    </p>
  </div>
</template>
