<script setup lang="ts">
import { i18nextPromise } from "@karpeleslab/fyvue";
await i18nextPromise;
</script>

<template>
  <div class="container mx-auto flex my-6 min-h-screen">
    <nav class="w-32 flex flex-col items-center border-r border-gray-200 pr-2 mr-2">
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
    </nav>
    <main class="flex-1 relative">
      <RouterView />
    </main>
  </div>
</template>
