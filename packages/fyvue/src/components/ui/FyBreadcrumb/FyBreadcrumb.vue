<script setup lang="ts">
import type { FyVueBreadcrumb } from '../../../dts';
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
//import { SchemaOrgBreadcrumb } from '@vueuse/schema-org/runtime';
const props = withDefaults(
  defineProps<{
    nav: FyVueBreadcrumb[];
    maxLength?: number;
  }>(),
  {
    maxLength: 32,
    nav: () => [],
  }
);

/*
const schemaOrgFormat = computed(() => {
  const _nav: any[] = [];
  props.nav.forEach((e) => {
    _nav.push({
      item: e.to,
      name: e.name,
    });
  });
  return _nav;
});
*/
</script>
<template>
  <nav class="fy-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <template v-for="(item, index) in nav" :key="`bc_${index.toString()}`">
        <li
          :class="
            item.to ? (index == 0 ? 'li-home' : 'li-normal') : 'li-current'
          "
          :aria-current="item.to ? undefined : 'page'"
        >
          <ChevronRightIcon v-if="index != 0" />

          <router-link :to="item.to" v-if="item.to">
            <HomeIcon v-if="index === 0" />
            {{ $cropText($t(item.name).toString(), maxLength) }}
          </router-link>
          <span v-else>
            {{ $cropText($t(item.name).toString(), maxLength) }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
