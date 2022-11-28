<script setup>
const fvComponent = `
<FyBreadcrumb
  :nav="[
    { name: 'fyvue', to: '/' },
    { name: 'Components', to: '/components' },
    { name: 'UI', to: '/components/ui' },
    { name: 'FyBreadcrumb' },
  ]"
/>
`;
const props = [
  {
    name: 'nav',
    type: 'array',
    info: 'Array of objects with a "name" and "to" property. "to" should be null on current page.',
  },
  {
    name: 'maxLength?',
    type: 'number',
    info: 'Max length to display for names (will crop at maxLenght)',
  },
];
</script>
<template>
  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <FyBreadcrumb
        :nav="[
          { name: 'fyvue', to: '/' },
          { name: 'Components', to: '/components' },
          { name: 'UI', to: '/components/ui' },
          { name: 'FyBreadcrumb' },
        ]"
      />
    </template>
  </FyDocPreview>
</template>
