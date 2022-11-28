<script setup></script>
<template>
  <KlbPage
    pagesAlias="ctcm-dwt7xu-mmez-eh3f-xmg2-pqrzarfa"
    :showFooter="false"
    forceSlug="ssr-router"
    :breadcrumbBase="$route.meta.breadcrumb ? $route.meta.breadcrumb : []"
  />
  <div class="fv-typo doc-contained margins flex-1">
    <h2>Usage</h2>
    <!-- prettier-ignore --><FvHL><pre>// composition API
import { useHistory } from '@karpeleslab/fyvue';
useHistory().status = 404;
// or
useHistory().push('/login', 302)
// etc...</pre></FvHL>
  </div>
</template>
