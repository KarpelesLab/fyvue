<script setup lang="ts">
import type { FyDatatableValue } from '../../../types'
defineProps({
  showHeaders: {
    type: Boolean,
    default: true
  },
  headers: {
    type: Object,
    default: {}
  },
  data: {
    type: Array<FyDatatableValue>,
    default: []
  }
})
const bgColor = (i : number) => {
  return i % 2 == 0 ? 'bg-color-1' : 'bg-color-2'
}
</script>
<template>
  <table class="border-collapse w-full md:mx-0 fy-datatable" v-if="data && data.length > 0">
    <thead v-if="showHeaders">
      <tr>
        <th
          v-for="title in headers" :key="`header_${title}`"
        >
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in data" :key="index">
        <tr
          :class="`tr ${bgColor(index)} `"
        >
          <template v-for="(title, property) in headers" :key="title">
            <td
              class="td "
            >
              <div
                class="div"
                >{{ title }}</div
              >
              <div class="div-cell">
              <slot
                :name="`${property}_item`"
                v-bind:data="{ prop: item[property], item: item, idx: index }"
              >
                <span v-if="item[property]">{{ item[property] }}</span><span v-else>n/a</span>
              </slot>
            </div>
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>
