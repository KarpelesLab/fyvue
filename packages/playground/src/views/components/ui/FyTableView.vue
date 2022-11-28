<script setup>
const fvComponent = `
_script_
const props = [
  {
    name: 'headers',
    type: 'object',
    info: 'Object.key is the property name and Object.value is the label.',
  },
  {
    name: 'data?',
    type: 'array',
    info: 'Array of objects',
    def: '[]',
  },
  {
    name: 'showHeaders?',
    type: 'array',
    info: 'Array of objects',
    def: 'true',
  },
];
_script_end_
<template>
  <FyTable
    :data="props"
    :headers="{
      name: 'Name',
      type: 'Type',
      def: 'Default',
      info: 'Role',
    }"
  >
    <template v-slot:def_item="property">
      {{ property.data.item.def ? property.data.item.def : 'undefined' }}
    </template>
  </FyTable>
</template>
`;
const props = [
  {
    name: 'headers',
    type: 'object',
    info: 'Object.key is the property name and Object.value is the label.',
  },
  {
    name: 'data?',
    type: 'array',
    info: 'Array of objects',
    def: '[]',
  },
  {
    name: 'showHeaders?',
    type: 'array',
    info: 'Array of objects',
    def: 'true',
  },
];
</script>
<template>
  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <FyTable
        :data="props"
        :headers="{
          name: 'Name',
          type: 'Type',
          def: 'Default',
          info: 'Role',
        }"
      >
        <template v-slot:def_item="property">
          {{ property.data.item.def ? property.data.item.def : 'undefined' }}
        </template>
      </FyTable>
    </template>
  </FyDocPreview>
</template>
