<script setup lang="ts">
import type { ObjectS2S, ObjectS2Any } from '../../../dts';

withDefaults(
  defineProps<{
    showHeaders?: boolean;
    headers: ObjectS2S;
    data?: Array<ObjectS2Any>;
  }>(),
  {
    showHeaders: true,
    data: () => [],
  }
);

const bgColor = (i: number) => {
  return i % 2 == 0 ? 'bg-color-1' : 'bg-color-2';
};
</script>
<template>
  <table
    class="border-collapse w-full md:mx-0 fy-datatable"
    v-if="data && data.length > 0"
  >
    <thead v-if="showHeaders">
      <tr>
        <th v-for="title in headers" :key="`header_${title}`">
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="data">
        <tr
          :class="`tr ${bgColor(index as number)} `"
          v-for="(item, index) in data"
          :key="index"
        >
          <template v-for="(title, property) in headers" :key="title">
            <td class="td">
              <div class="div">{{ title }}</div>
              <div class="div-cell">
                <slot
                  :name="`${property as string}_item`"
                  v-bind:data="{ prop: item[property], item: item, idx: index }"
                >
                  <span v-if="item[property]">{{
                    item[property].toString()
                  }}</span
                  ><span v-else>n/a</span>
                </slot>
              </div>
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>
