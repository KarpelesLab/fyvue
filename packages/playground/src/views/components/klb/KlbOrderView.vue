<script setup>
const fvComponent = `<KlbOrder shopPath="/components/klb/KlbCatalog" mode="b2b" />`;

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
  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <KlbOrder
        shopPath="/components/klb/KlbCatalog"
        mode="b2b"
        loginPath="/components/klb/KlbLogin"
      />
    </template>
  </FyDocPreview>
</template>
