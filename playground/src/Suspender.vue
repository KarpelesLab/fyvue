<template>
  <Suspense>
    <template #default>
      <App />
    </template>
    <template #fallback>
      <div>(Loading)</div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import App from "./App.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "SuspenserApp",
  components: {
    App,
  },
});
</script>
