<script setup lang="ts">
import { useFVStore } from '@karpeleslab/fyvue';
const store = useFVStore();
await store.refreshUser();
</script>
<template>
  <KlbUpdateEmailModal />
  <KlbUpdatePasswordModal />
  <KlbDeleteAccount url="/tests/KlbLogin" />
</template>
