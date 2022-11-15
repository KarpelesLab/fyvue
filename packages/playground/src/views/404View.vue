<template>
  <Head>
    <title>404 - fyvue</title>
  </Head>
  <div class="rounded-lg p-10">
    <div
      class="error-page flex flex-col lg:flex-row items-center justify-center my-20 text-center lg:text-left"
    >
      <div class="mt-10 lg:mt-0 text-center">
        <div class="intro-x text-4xl font-medium">404</div>
        <div class="intro-x text-xl font-medium mt-5">Dead Link :(</div>
        <br />
          <img src="@/assets/deadlink.png" class="bg-neutral-700 p-4 w-56 rounded-xl" />
        <br />
        <router-link to="/" class="btn primary btn-defaults text-center">
          Go Back
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Head } from '@vueuse/head';
import { useHistory } from '@karpeleslab/fyvue';
useHistory().status = 404;
</script>
