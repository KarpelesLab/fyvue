<script setup lang="ts">
import type { FyVueBreadcrumb } from '../../../dts';
import { ArrowRightIcon } from '@heroicons/vue/24/solid'

withDefaults(defineProps<{
  nav: FyVueBreadcrumb[],
  maxLength?: number
}>(), {
  maxLength: 15,
  nav: () => []
})

</script>
<template>
  <div
    class="fy-breadcrumb"
    aria-label="Breadcrumb"
  >
    <ol>
      <template v-for="item in nav">
        <li
          v-if="item.to"
          :key="item.to"
          class="bc-innactive"
        >
          <router-link
            :to="item.to"
            class="bc-active link"
          >
            {{
              $cropText($t(item.name).toString(), maxLength)
            }}
          </router-link>
          <ArrowRightIcon class="icon bc-innactive" />
        </li>
        <li
          v-else
          v-bind:key="`e-${item.to}`"
          class="bc-current"
        >
          <span class="bc-innactive">{{ $cropText($t(item.name).toString(), maxLength) }}</span>
        </li>
      </template>
    </ol>
  </div>
</template>
