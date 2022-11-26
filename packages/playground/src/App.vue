<script setup>
import {
  i18nextPromise,
  countriesPromise,
  useUserCheck,
  useSeo,
} from '@karpeleslab/fyvue';
import { Head, useHead } from '@vueuse/head';
import {
  SchemaOrgWebSite,
  SchemaOrgOrganization,
} from '@vueuse/schema-org/runtime';
import { SchemaOrgWebPage } from '@vueuse/schema-org/runtime';

import { ref, computed, watch } from 'vue';
import { CodeBracketSquareIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import { Backend } from '@karpeleslab/i18next-klb-backend';
import ComponentIndex from '@/componentIndex';
import { getUrl } from '@karpeleslab/klbfw';

await i18nextPromise(Backend);
const route = useRoute();
const sideBarOpen = ref(false);
const computedRoute = computed(() => route);
const aside = ref();
onClickOutside(ref, () => (sideBarOpen.value = false));

if (!import.meta.env.SSR) {
  await useUserCheck();
  await countriesPromise();
}

useSeo(
  ref({
    name: 'fyvue',
    type: 'website',
    image: 'https://fy-vue.com/fyvue.svg',
    title: computed(() =>
      computedRoute.value.meta.title ? computedRoute.value.meta.title : 'fyvue'
    ),
    description:
      'fyvue is a Vue Plugin providing components, helpers for Vue, Tailwind, vite-ssr, KLB APIs, and more. At some point in the future, it will do my job for me.',
  }),
  true
);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <FyNavbar
      title="fyvue"
      :showDashboardLink="false"
      :showCart="true"
      cartPath="/components/klb/KlbOrder"
      :links="[
        { to: '/', name: 'Getting Started' },
        { to: '/blog', name: 'Blog' },
        {
          to: '#',
          name: 'SSR',
          childrens: [
            { to: '/ssr', name: 'Getting Started' },
            { to: '/ssr/rest', name: 'Rest' },
            { to: '/ssr/router', name: 'Router' },
          ],
        },
        {
          to: '/components',
          name: 'Components',
        },
        {
          to: '#',
          name: 'Helpers',
          childrens: [
            { to: '/helpers/events', name: 'Events' },
            { to: '/helpers/i18n', name: 'i18n' },
            { to: '/helpers/formatting', name: 'Formatting' },
            { to: '/helpers/store', name: 'Store' },
            { to: '/helpers/styles', name: 'Styles' },
          ],
        },
        // { to: '/contact', name: 'Contact' },
      ]"
    >
      <template v-slot:logo>
        <img src="@/assets/fyvue.svg" class="h-10" />
      </template>
      <template v-slot:custom> </template>
    </FyNavbar>
    <aside
      class="fixed shadow right-2 top-1/2 -translate-y-1/2 max-h-screen overflow-y-auto"
      :class="
        sideBarOpen
          ? 'w-64 rounded-xl  bg-fv-neutral-100 dark:bg-fv-neutral-900 border-2 border-fv-primary-500 z-20'
          : 'w-12 h-12 rounded-full bg-fv-primary-800 dark:bg-fv-primary-100 z-20'
      "
      aria-label="Sidebar"
      ref="aside"
    >
      <div class="py-4 px-4" v-if="sideBarOpen">
        <nav class="website-nav">
          <button
            @click="sideBarOpen = false"
            class="flex items-center float-right -mt-3 -mr-2"
          >
            <XMarkIcon class="m-1 w-6"></XMarkIcon>
          </button>
          <h2 class="font-bold">UI</h2>
          <div class="link-group">
            <router-link
              v-for="(c, i) in ComponentIndex.ui"
              :key="`${i.toString()}_${c}`"
              :to="`/components/ui/${c}`"
            >
              {{ c }}
            </router-link>
          </div>
          <h2 class="font-bold mt-2">Klb</h2>
          <div class="link-group">
            <router-link
              v-for="(c, i) in ComponentIndex.klb"
              :key="`${i.toString()}_${c}`"
              :to="`/components/klb/${c}`"
            >
              {{ c }}
            </router-link>
          </div>
          <h2 class="font-bold mt-2">Misc</h2>
          <div class="link-group">
            <router-link
              v-for="(c, i) in ComponentIndex.misc"
              :key="`${i.toString()}_${c}`"
              :to="`/components/misc/${c}`"
            >
              {{ c }}
            </router-link>
          </div>
        </nav>
      </div>
      <button
        @click="sideBarOpen = true"
        class="flex items-center justify-center w-12 h-12"
        v-else
      >
        <CodeBracketSquareIcon
          class="w-9 dark:text-fv-primary-800 text-fv-primary-50"
        />
      </button>
    </aside>
    <FyBreadcrumb
      v-if="$route.meta.breadcrumb"
      :nav="$route.meta.breadcrumb"
      class="container mx-auto max-w-screen-xl mt-2 md:mt-3"
    />
    <main
      v-if="!$route.path.includes('blog') && !$route.path.includes('pages')"
      class="relative w-full flex-grow bg-white dark:bg-fv-neutral-900 rounded container mx-auto max-w-screen-xl p-2 md:p-4 lg:p-6 my-2 md:my-3"
    >
      <RouterView v-slot="{ Component }">
        <Suspense timeout="0">
          <template #default><component :is="Component" /></template>
          <template #fallback
            ><FyLoader
              id="app-suspender"
              :force="true"
              :show-loading-text="false"
          /></template>
        </Suspense>
      </RouterView>
    </main>
    <RouterView v-else v-slot="{ Component }">
      <Suspense timeout="0">
        <template #default><component :is="Component" /></template>
        <template #fallback
          ><FyLoader
            id="app-suspender"
            :force="true"
            :show-loading-text="false"
        /></template>
      </Suspense>
    </RouterView>
    <footer
      class="flex items-center justify-center py-2 bg-white dark:bg-fv-neutral-900"
    >
      <div class="text-center text-xs fv-typo">
        &copy; 2022 - made with &hearts; by
        <b
          ><a href="https://twitter.com/un_geek" target="_blank"
            >Florian Gasquez</a
          ></b
        >
        - Powered by vue/vite/fyvue &amp; tailwindcss.<br />
        <RouterLink to="/pages/about">About fyvue</RouterLink>
        <small> (test KlbPage component)</small>
      </div>
    </footer>
  </div>
  <FyConfirm />
</template>
