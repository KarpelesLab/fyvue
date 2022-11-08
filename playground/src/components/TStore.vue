<script setup lang="ts">
import { useFVStore } from '@karpeleslab/fyvue';
import { onMounted, computed } from 'vue';
const store = useFVStore();
const isAuth = computed(() => store.isAuth)
onMounted(async () => {
  await store.refreshUser()
})
</script>
<template>
  IsAuth: {{isAuth}} <button v-if="isAuth" @click="store.logout()" >Logout</button> <button v-if="!isAuth" @click="$router.push('/tests/KlbLogin')" >Login</button>
  <br />
  User:
  <pre class="text-xs">{{store}}</pre>

</template>
