<script setup>
import {
  i18nextPromise,
  countriesPromise,
  useUserCheck,
  useEventBus,
} from '@karpeleslab/fyvue';

import { ref, computed, onUnmounted, onMounted } from 'vue';
import { CodeBracketSquareIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import { Backend } from '@karpeleslab/i18next-klb-backend';
import ComponentIndex from '@/componentIndex';
import { useFyHead } from '@fy-/head';

await i18nextPromise(Backend);
const route = useRoute();
const sideBarOpen = ref(false);
const computedRoute = computed(() => route);
const aside = ref();
const query = ref(route.params.query);
const eventBus = useEventBus();
onClickOutside(ref, () => (sideBarOpen.value = false));

if (!import.meta.env.SSR) {
  await useUserCheck();
  await countriesPromise();
}

onMounted(() => {
  eventBus.on('leaveSearchPage', () => {
    query.value = undefined;
  });
});
onUnmounted(() => {
  eventBus.off('leaveSearchPage', '*');
});

const fyhead = useFyHead();
fyhead.lazySeo({
  name: 'fyvue',
  type: 'website',
  image: 'https://fy-vue.com/fyvue.png',
  title: computed(() =>
    computedRoute.value.meta.title ? computedRoute.value.meta.title : 'fyvue'
  ),
  searchAction: '/search/{search_term_string}',
});
/*
useSeo(
  ref({
    name: 'fyvue',
    type: 'website',
    image: 'https://fy-vue.com/fyvue.svg',
    title: computed(() =>
      computedRoute.value.meta.title ? computedRoute.value.meta.title : 'fyvue'
    ),
    searchAction: '/search/{search_term_string}',
  }),
  true
);*/
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <FyNavbar
      title="fyvue"
      :showDashboardLink="false"
      :showCart="false"
      cartPath="/components/klb/KlbOrder"
      :links="[
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
        //{ to: '/contact', name: 'Contact' },
      ]"
    >
      <template v-slot:logo>
        <img src="@/assets/fyvue.svg" class="h-10" />
      </template>
      <template v-slot:custom>
        <div
          class="search relative !mb-4 !w-full md:!mb-0 md:!w-auto mx-0 md:mx-3"
          ref="searchContainer"
        >
          <div class="block md:flex items-center">
            <div class="relative md:block">
              <form
                class="flex flex-nowrap w-full"
                @submit.prevent="
                  () => {
                    if (query) $router.push(`/search/${query}`);
                    else {
                      $router.push(`/search/`);
                    }
                  }
                "
              >
                <FyInput
                  id="search"
                  ref="searchInputRef"
                  v-model="query"
                  type="search"
                  placeholder="Search..."
                >
                  <template v-slot:before>
                    <div class="flex items-center px-2">
                      <svg
                        class="w-5 h-5 text-fv-neutral-500"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </template>
                </FyInput>
              </form>
            </div>
          </div>
        </div>
      </template>
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
    <!--<pre>{{ fyhead }}</pre>-->
    <div class="flex-1 flex flex-col relative">
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
    </div>
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
        - Powered by vue/vite/fyvue &amp; tailwindcss.
      </div>
    </footer>
  </div>
  <FyConfirm />
</template>
