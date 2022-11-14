<script setup lang="ts">
import { i18nextPromise, countriesPromise } from '@karpeleslab/fyvue';
import { Head } from '@vueuse/head';
import {
  SchemaOrgWebSite,
  SchemaOrgOrganization,
} from '@vueuse/schema-org/runtime';
import { onMounted, ref } from 'vue';
import { CodeBracketSquareIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import { useToggle } from '@vueuse/core';
await i18nextPromise;
const query = ref<string>();
const sideBarOpen = ref<boolean>(false);
const toggleSidebar = useToggle(sideBarOpen);
onMounted(async () => {
  await countriesPromise();
});
</script>

<template>
  <Head>
    <title>fyvue</title>
    <meta property="og:title" content="fyvue" />
    <meta property="og:site_name" content="fyvue" />
    <meta property="og:url" :content="`https://fy-vue.com/`" />
  </Head>
  <SchemaOrgOrganization
    name="fyvue"
    logo="https://www.fy-vue.com/fyvue.svg"
    same-as="['https://twitter.com/ungeek']"
  />
  <SchemaOrgWebSite name="fyvue" />
  <div class="flex flex-col min-h-screen">
    <FyNavbar
      logo="/src/assets/fyvue.svg"
      title="fyvue"
      :links="[
        { to: '/', name: 'Getting Started' },
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
          to: '#',
          name: 'Helpers',
          childrens: [
            { to: '/helpers', name: 'Summary' },
            { to: '/helpers/formatting', name: 'Formatting' },
            { to: '/helpers/events', name: 'Events' },
            { to: '/helpers/i18n', name: 'i18n' },
            { to: '/helpers/store', name: 'Store' },
          ],
        },
        { to: '/contact', name: 'Contact' },
      ]"
    >
      <template v-slot:logo>
        <img src="@/assets/fyvue.svg" class="h-10" />
      </template>
      <template v-slot:custom> </template>
    </FyNavbar>
    <div class="relative w-full p-2 md:p-4 lg:p-6 flex-grow">
      <aside
        class="fixed shadow right-2 top-1/2 -translate-y-1/2 max-h-screen overflow-y-auto"
        :class="
          sideBarOpen
            ? 'w-64 rounded-xl  bg-fv-neutral-50 dark:bg-fv-neutral-800 border-2 border-fv-primary-500'
            : 'w-12 h-12 rounded-full bg-fv-primary-800 dark:bg-fv-primary-100'
        "
        aria-label="Sidebar"
      >
        <div class="py-4 px-4" v-if="sideBarOpen">
          <nav class="website-nav">
            <button
              @click="sideBarOpen = false"
              class="flex items-center float-right -mt-3 -mr-2"
            >
              <XMarkIcon class="m-1 w-6"></XMarkIcon>
            </button>
            <h2 class="font-bold">UI Components</h2>
            <div class="link-group">
              <router-link to="/components/ui/FyBreadcrumb">
                FyBreadcrumb
              </router-link>
              <router-link to="/components/ui/FyCirclePercent">
                FyCirclePercent
              </router-link>
              <router-link to="/components/ui/FyConfirm">
                FyConfirm
              </router-link>
              <router-link to="/components/ui/FyDatatable">
                FyDatatable
              </router-link>
              <router-link to="/components/ui/FyInput"> FyInput </router-link>
              <router-link to="/components/ui/FyLoader"> FyLoader </router-link>
              <router-link to="/components/ui/FyNavbar"> FyNavbar </router-link>
              <router-link to="/components/ui/FyPaging"> FyPaging </router-link>
              <router-link to="/components/ui/FySteps"> FySteps </router-link>
              <router-link to="/components/ui/FyTable"> FyTable </router-link>
            </div>
            <h2 class="font-bold mt-2">Klb Components</h2>
            <div class="link-group">
              <router-link to="/components/klb/KlbDeleteAccount">
                KlbDeleteAccount
              </router-link>
              <router-link to="/components/klb/KlbUpdateEmailModal">
                KlbUpdateEmailModal
              </router-link>
              <router-link to="/components/klb/KlbUpdatePasswordPModal">
                KlbUpdatePasswordPModal
              </router-link>
              <router-link to="/components/klb/KlbAddPaymentMethodModal">
                KlbAddPaymentMethodModal
              </router-link>
              <router-link to="/components/klb/KlbBillingHistory">
                KlbBillingHistory
              </router-link>
              <router-link to="/components/klb/KlbUpdateBillingLocation">
                KlbUpdateBillingLocation
              </router-link>
              <router-link to="/components/klb/KilbUpdatePaymentMethod">
                KilbUpdatePaymentMethod
              </router-link>
              <router-link to="/components/klb/KlbLogin">
                KlbLogin
              </router-link>
            </div>
            <h2 class="font-bold mt-2">CSS Components</h2>
            <div class="link-group">
              <router-link to="/components/css/button"> Button </router-link>
              <router-link to="/components/css/typo"> Typo </router-link>
              <router-link to="/components/css/helpers"> Helpers </router-link>
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
      <main class="bg-white dark:bg-fv-neutral-900 p-2 md:p-4 xl:-6">
        <div class="px-2">
          <RouterView v-slot="{ Component }">
            <Suspense timeout="0">
              <component :is="Component" />
              <template #fallback>
                <div>Loading...</div>
              </template>
            </Suspense>
          </RouterView>
        </div>
      </main>
    </div>
    <footer
      class="flex items-center justify-center h-12 bg-white dark:bg-fv-neutral-900"
    >
      <div>&copy; 2022 - made with &hearts; by <b>Florian Gasquez</b></div>
    </footer>
  </div>
</template>
