<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto flex my-6">
    <nav class="w-32 flex flex-col items-center border-r border-gray-200 pr-2 mr-2">
      <RouterLink to="/"><img src="@/assets/fyvue.svg" alt="fyvue" class="w-24 mb-6" /></RouterLink>
      <ul>
        <li><RouterLink to="/tests/FyCirclePercent">FyCirclePercent</RouterLink></li>
        <li><RouterLink to="/tests/FyModal">FyModal</RouterLink></li>
        <li><RouterLink to="/tests/FySteps">FySteps</RouterLink></li>

      </ul>
    </nav>
    <main class="flex-1"><RouterView /></main>
  </div>
</template>
