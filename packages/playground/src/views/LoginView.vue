<script setup></script>
<template>
  <div class="doc-contained flex-1 mt-4">
    <FyBreadcrumb :nav="$route.meta.breadcrumb" />

    <div class="card-container card-defaults mt-4">
      <div class="fv-typo">
        <h1>Sign in / Sign up</h1>
        <p>Some Klb components require authentication to work.</p>
      </div>
      <ClientOnly>
        <KlbLogin
          returnDefault="/"
          :forceAction="
            typeof $route.query.act == 'string' ? $route.query.act : undefined
          "
      /></ClientOnly>
    </div>
  </div>
</template>
