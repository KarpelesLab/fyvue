<script setup>
const fvComponent = `<ClientOnly><p>This is not render via SSR</p></ClientOnly>`;
const props = [];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>ClientOnly</h1>
    <p>
      Everything inside the <b>ClientOnly</b> component is rendered only on
      client (after mount in vue lifecycle). This is usefull to use client
      libraries, or to do something only on the client side without causing a
      <a
        href="https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch"
        target="_blank"
        >hydration mismatch</a
      >
      error.
    </p>
  </div>

  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <div class="flex">
        <ClientOnly><p>This is not render via SSR</p></ClientOnly>
      </div>
    </template>
  </FyDocPreview>
</template>
