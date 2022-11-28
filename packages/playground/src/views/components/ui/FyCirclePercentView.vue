<script setup>
const fvComponent = `
<div class="flex">
  <FyCirclePercent class="w-24 h-24" :percent="60" color="red" />
  <FyCirclePercent class="w-24 h-24" :percent="25" color="green" />
  <FyCirclePercent class="w-24 h-24" :percent="100" color="#FF00FF" />
</div>
`;
const props = [
  {
    name: 'percent',
    type: 'number',
    info: 'Current Percent',
  },
  {
    name: 'textXY?',
    type: 'Array<number>',
    info: 'Percent Text position in SVG',
    def: '[18, 20.85]',
  },
  {
    name: 'color?',
    type: 'string',
    info: 'Fill color (compatbile with svg stroke="")',
    def: 'blue',
  },
];
</script>
<template>
  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <div class="flex">
        <FyCirclePercent class="w-24 h-24" :percent="60" color="red" />
        <FyCirclePercent class="w-24 h-24" :percent="25" color="green" />
        <FyCirclePercent class="w-24 h-24" :percent="100" color="#FF00FF" />
      </div>
    </template>
  </FyDocPreview>
</template>
