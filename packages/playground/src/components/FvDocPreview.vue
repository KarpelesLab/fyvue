<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import {
  CodeBracketIcon,
  EyeIcon,
  SwatchIcon,
  ListBulletIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/solid';
import { useFVStore } from '@karpeleslab/fyvue';
import { computed } from 'vue';

const props = defineProps({
  component: {
    type: String,
  },
  props: {
    type: Array,
    default: () => [],
  },
  slots: {
    type: Array,
    default: () => [],
  },
  reqAuth: {
    type: Boolean,
    default: false,
  },
  lang: {
    type: String,
    default: 'javascript',
  },
});
const store = useFVStore();
const isAuth = computed(() => store.isAuth);
const componentFormated = () => {
  let cp = props.component.trim();
  if (cp.includes('_script_end_') && cp.includes('<template>')) {
    const cpSplit = cp.split('_script_end_');
    cpSplit[0] = cpSplit[0].replace('_script_', '');
    cpSplit[0] = cpSplit[0].replace('_script_end_', '<\/script>');
    return [
      { lang: 'javascript', content: cpSplit[0].trim() },
      { lang: 'html', content: cpSplit[1].trim() },
    ];
  } else if (cp.includes('_script_end_')) {
    cp = cp.replace('_script_', '');
    cp = cp.replace('_script_end_', '');
    return [{ lang: 'javascript', cp }];
  }

  return [{ lang: 'html', content: cp }];
};
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
          <slot name="component" v-if="!reqAuth || isAuth"></slot>
          <div v-else>
            <div class="fv-typo">
              <p>
                <ExclamationTriangleIcon class="w-5 h-5 inline-block -mt-0.5" />
                Preview requires authentication.
              </p>
              <br />
              <router-link to="/login" class="btn primary btn-defaults">
                Login / Create account
              </router-link>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel class="tab-compo">
        <div class="pt-1">
          <template
            v-for="(code, index) in componentFormated()"
            :key="`code_${index}`"
          >
            <h2 class="font-bold px-2 uppercase">
              {{
                code.lang
                  .replace('html', 'template')
                  .replace('javascript', 'Composition API')
              }}
            </h2>
            <FvHL class="mx-2" :lang="code.lang">{{ code.content }}</FvHL>
          </template>
        </div>
      </TabPanel>
      <TabPanel class="tab-compo" v-if="props.length > 0">
        <div class="p-0">
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
      <TabPanel class="tab-compo" v-if="slots.length > 0">
        <div class="p-0">
          <FyDatatable
            :data="slots"
            :headers="{
              name: 'Name',
              info: 'Role',
            }"
          >
          </FyDatatable>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
