<script setup lang="ts">
const tableData = [
  { nickname: 'Fy', active: true, created: new Date().toISOString() },
  { nickname: 'Spirits', active: true, created: new Date().toISOString() },
  { nickname: 'MT', active: true, created: new Date().toISOString() },
  { nickname: '|PaRa-Boul', active: true, created: new Date().toISOString() },
];
</script>

<template>
  <FyTable
    class="w-full"
    :headers="{
      nickname: $t('nickname'),
      active: $t('active'),
      created: $t('created'),
    }"
    :data="tableData"
  >
    <template v-slot:created_item="property">
      {{
        $t('global_datetime', {
          val: new Date(property.data.prop),
          formatParams: {
            val: {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          },
        })
      }}
    </template>
  </FyTable>

  <div class="dark mt-4">
    <FyTable
      class="w-full"
      :headers="{
        nickname: $t('nickname'),
        active: $t('active'),
        created: $t('created'),
      }"
      :data="tableData"
    >
    </FyTable>
  </div>
</template>
