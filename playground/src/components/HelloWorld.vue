<script setup lang="ts">
import { useFVStore } from '@karpeleslab/fyvue';
const store = useFVStore();
</script>
<template>
  <pre>{{store}}</pre>
</template>
