<script setup lang="ts">
import { useFVStore } from '@karpeleslab/fyvue';
const store = useFVStore();
await store.refreshUser();
</script>
<template>
  <br />
  <KlbUpdateBillingLocation />
  <hr class="my-8" />
    <KlbUpdatePaymentMethod />
    <hr class="my-8" />
  <KlbBillingHistory />


</template>
