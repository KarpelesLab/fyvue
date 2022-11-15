<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import {
  CodeBracketIcon,
  EyeIcon,
  SwatchIcon,
  ListBulletIcon,
} from '@heroicons/vue/24/solid';

defineProps({
  component: {
    type: String,
  },
  props: {
    type: Array,
    default: [],
  },
  slots: {
    type: Array,
    default: [],
  },
});
</script>
<template>
  <TabGroup class="compo-view" as="div">
    <TabList class="tabs-compo">
      <Tab v-slot="{ selected }"
        ><button :class="selected ? 'selected' : ''">
          <span>
            <EyeIcon class="w-5 h-5 inline-block -mt-0.5" /> Preview
          </span>
        </button></Tab
      >
      <Tab v-slot="{ selected }"
        ><button :class="selected ? 'selected' : ''">
          <span>
            <CodeBracketIcon class="w-5 h-5 inline-block -mt-0.5" /> Code
          </span>
        </button></Tab
      >
      <Tab v-slot="{ selected }" v-if="props.length > 0"
        ><button :class="selected ? 'selected' : ''">
          <span>
            <SwatchIcon class="w-5 h-5 inline-block -mt-0.5" /> Props
          </span>
        </button></Tab
      >
      <Tab v-slot="{ selected }" v-if="slots.length > 0"
        ><button :class="selected ? 'selected' : ''">
          <span>
            <ListBulletIcon class="w-5 h-5 inline-block -mt-0.5" /> Slots
          </span>
        </button></Tab
      >
    </TabList>
    <TabPanels>
      <TabPanel class="tab-compo">
        <div class="p-4">
          <slot name="component"></slot>
        </div>
      </TabPanel>
      <TabPanel class="tab-compo">
        <div v-highlight class="-my-2">
          <pre
            class="language-html"
          ><code>{{ component.trim().replace('_script_','<script setup>').replace('_script_end_', '</script>\n') }}</code></pre>
        </div>
      </TabPanel>
      <TabPanel class="tab-compo" v-if="props.length > 0">
        <div class="p-4">
          <FyDatatable
            :data="props"
            :headers="{
              name: 'Name',
              type: 'Type',
              def: 'Default',
              info: 'Role',
            }"
          >
            <template v-slot:def_item="property">
              {{
                property.data.item.def ? property.data.item.def : 'undefined'
              }}
            </template>
          </FyDatatable>
        </div>
      </TabPanel>
      <TabPanel class="tab-compo" v-if="slots.length > 0"></TabPanel>
    </TabPanels>
  </TabGroup>
</template>
