<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import {
  CodeBracketIcon,
  EyeIcon,
  SwatchIcon,
  ListBulletIcon,
} from '@heroicons/vue/24/solid';
const comp = `
<KlbLogin
  returnDefault="/"
  :forceAction="$route.query.act"
/>
`;
</script>
<template>
  <div class="fv-typo">
    <h1>KlbLogin</h1>
  </div>

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
      <Tab v-slot="{ selected }"
        ><button :class="selected ? 'selected' : ''">
          <span>
            <SwatchIcon class="w-5 h-5 inline-block -mt-0.5" /> Props
          </span>
        </button></Tab
      >
      <Tab v-slot="{ selected }"
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
          <KlbLogin
            returnDefault="/"
            :forceAction="
              typeof $route.query.act == 'string' ? $route.query.act : undefined
            "
          />
        </div>
      </TabPanel>
      <TabPanel class="tab-compo">
        <div v-highlight class="-my-2">
          <pre class="language-html"><code>{{ comp.trim() }}</code></pre>
        </div>
      </TabPanel>
      <TabPanel class="tab-compo"></TabPanel>
      <TabPanel class="tab-compo"></TabPanel>
    </TabPanels>
  </TabGroup>
</template>
