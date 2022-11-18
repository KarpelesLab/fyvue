<script setup>
const fvComponent = `
`;

const props = [
  {
    name: 'options',
    type: '{}',
    info: 'Options for Product:search',
    def: "{ sort: 'Basic.Priority:asc' }",
  },
  {
    name: 'displayType?',
    type: '"subs"|"shop"',
    info: 'Display type',
    def: 'subs',
  },
  {
    name: 'startOrderPath?',
    type: 'string',
    info: 'Path to start an order',
    def: '/user/order/start',
  },
];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>KlbOrder</h1>
  </div>

  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <KlbOrder shopPath="/components/klb/KlbCatalog" mode="b2b" />
    </template>
  </FyDocPreview>
</template>
