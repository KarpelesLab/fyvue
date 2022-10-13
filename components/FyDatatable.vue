<template>
  <table class="border-collapse w-full md:mx-0">
    <thead v-if="showHeaders">
      <tr>
        <th
          v-for="title in headers" :key="`header_${title}`"
          class="p- 2 font-bold uppercase bg-orange-600 text-sm text-gray-200 squared border border-orange-700 hidden md:table-cell"
        >
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in data" :key="index">
        <tr
          :class="`flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap mb-10 md:mb-0 ${bgColor(index)} md:border-0 border-orange-500`"
        >
          <template v-for="(title, property) in headers" :key="title">
            <td
              class="w-full -mt-4 md:mt-0 border-0  border-orange-500  md:w-auto py-3 px-0 md:px-3 text-gray-700 text-md text-left md:text-center block md:table-cell relative md:static "
            >
              <div
                class="w-full md:hidden  bg-orange-700 text-gray-200 px-2 py-1 text-xs font-bold uppercase mb-2"
                >{{ title }}</div
              >
              <div class="px-2 md:px-0">
              <slot
                :name="`${property}_item`"
                v-bind:data="{ prop: item[property], id: item.id, item: item, idx: index }"
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
<script>

export default {
  name: "FyDatatable",
  props: {
    showHeaders: {
      type: Boolean,
      default: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    bgColor(i) {
      if (i % 2 == 0) {
        return 'bg-gray-200'
      }
      return 'bg-white'
    }
  }
};
</script>
