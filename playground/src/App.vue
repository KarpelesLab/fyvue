<script setup lang="ts">
import { i18nextPromise } from '@karpeleslab/fyvue';
await i18nextPromise;
</script>

<template>
  <div class="website">
    <div class="cols">
      <nav>
        <div class="px-2">
          <RouterLink to="/"><img src="@/assets/fyvue.svg" alt="fyvue" class="w-24 mb-6" /></RouterLink>
          <ul>
            <li><b class="text-violet-800">Helpers</b></li>
            <li>
              <RouterLink to="/tests/i18n">i18n</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/Store">Store</RouterLink>
            </li>

            <li><b class="text-violet-800">KLB</b></li>
            <li>
              <RouterLink to="/tests/KlbLogin">KlbLogin</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/KlbAccount">KlbAccount</RouterLink>
            </li>
            <li>
              <RouterLink to="/tests/KlbBilling">KlbBilling</RouterLink>
            </li>

            <li><b class="text-violet-800">Components</b></li>
            <li>
              <RouterLink to="/tests/FyCirclePercent">FyCirclePercent</RouterLink>
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
        </div>
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
