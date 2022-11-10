<script setup lang="ts">
const tableData = [
  { nickname: 'Fy', active: true, created: Date.now() },
  { nickname: 'Spirits', active: true, created: Date.now() },
  { nickname: 'MT', active: true, created: Date.now() },
  { nickname: '|PaRa-Boul', active: true, created: Date.now() },
];
</script>

<template>
  <FyDatatable
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
    <template v-slot:active_item="property">
      {{ property.data.item.active ? $t('alive') : $t('dead') }}
    </template>
  </FyDatatable>

  <div class="dark mt-4">
    <FyDatatable
      class="w-full"
      :headers="{
        nickname: $t('nickname'),
        active: $t('active'),
        created: $t('created'),
      }"
      :data="tableData"
    >
    </FyDatatable>
  </div>
</template>
