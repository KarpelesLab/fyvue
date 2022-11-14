<script setup lang="ts">
import { i18nextPromise, countriesPromise } from '@karpeleslab/fyvue';
import {
  SchemaOrgWebSite,
  SchemaOrgOrganization,
} from '@vueuse/schema-org/runtime';
import { ref } from 'vue';
await i18nextPromise;
await countriesPromise();
const query = ref<string>();
</script>

<template>
  <SchemaOrgOrganization
    name="fyvue"
    logo="https://www.fy-vue.com/fyvue.svg"
    same-as="['https://twitter.com/ungeek']"
  />
  <SchemaOrgWebSite name="fyvue" />
  <FyNavbar
    logo="/src/assets/fyvue.svg"
    title="fyvue"
    :links="[
      { to: '/', name: 'Getting Started' },
      /*
      { to: '/tests/i18n', name: 'I18N' },
      { to: '/tests/Store', name: 'Store' },
      {
        to: '#',
        name: 'KLB',
        childrens: [
          { to: '/tests/KlbLogin', name: 'KlbLogin' },
          { to: '/tests/KlbBilling', name: 'KlbBilling' },
          { to: '/tests/KlbAccount', name: 'KlbAccount' },
        ],
      },*/
    ]"
  >
    <template v-slot:logo>
      <img src="@/assets/fyvue.svg" class="h-10" />
    </template>
    <template v-slot:custom>
      <!--
      <div class="search relative">
        <form class="flex items-center">
          <router-link
            to="/search"
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
          >
            <svg
              class="w-5 h-5"
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
            <span class="sr-only">Search</span>
          </router-link>
          <div class="hidden relative md:block">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-500"
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
              <span class="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </form>
      </div>-->
    </template>
  </FyNavbar>
  <div class="website">
    <div class="cols">
      <nav class="website-nav">
        Test build
        <!--
        <div class="px-2">
          <RouterLink to="/"
            ><img src="@/assets/fyvue.svg" alt="fyvue" class="w-24 mb-6"
          /></RouterLink>
          <ul>
            <li>
              <b class="text-fv-primary-800 dark:text-fv-primary-400"
                >Helpers</b
              >
            </li>
            <li>
              <RouterLink to="/tests/i18n">i18n</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/Store">Store</RouterLink>
            </li>

            <li>
              <b class="text-fv-primary-800 dark:text-fv-primary-400">KLB</b>
            </li>
            <li>
              <RouterLink to="/tests/KlbLogin">KlbLogin</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/KlbAccount">KlbAccount</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/KlbBilling">KlbBilling</RouterLink>
            </li>

            <li>
              <b class="text-fv-primary-800 dark:text-fv-primary-400"
                >Components</b
              >
            </li>
            <li>
              <RouterLink to="/tests/FyCirclePercent"
                >FyCirclePercent</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/tests/FyModal">FyModal</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/FySteps">FySteps</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/FyBreadcrumb">FyBreadcrumb</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/FyConfirm">FyConfirm</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/FyDatatable">FyDatatable</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/FyTable">FyTable</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/FyLoader">FyLoader</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/FyInputBase">FyInputBase</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/FyInput">FyInput</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/FyPaging">FyPaging</RouterLink>
            </li>
          </ul>
        </div>-->
      </nav>
      <main>
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
  </div>
</template>
