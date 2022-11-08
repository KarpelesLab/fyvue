
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
</script>
<template>
  <div class="fy-table" v-if="data && data.length">
    <div class="table-container">
      <table>
        <thead v-if="showHeaders">
          <tr>
            <th v-for="(title, property) in headers" :key="property">
              {{ title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in data" :key="index">
            <tr>
              <template v-for="(_, property) in headers" :key="`${property}`">
                <td
                >
                  <slot
                    :name="`${property}_item`"
                    v-bind:data="{
                      prop: item[property],
                      item: item,
                      idx: index,
                    }"
                  >
                    <span v-if="item[property]">{{ item[property] }}</span
                    ><span v-else>n/a</span>
                  </slot>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
