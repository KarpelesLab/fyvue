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
              <template
                v-for="(_, property) in headers"
                :key="`${property as string}`"
              >
                <td>
                  <slot
                    :name="`${property as string}_item`"
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
