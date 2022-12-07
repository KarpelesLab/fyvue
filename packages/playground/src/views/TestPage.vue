<script setup>
import {
  KeyIcon,
  CogIcon,
  GifIcon,
  EyeDropperIcon,
} from '@heroicons/vue/24/solid';
</script>
<template>
  <NavSide
    :links="[
      { to: '/', name: 'Accueil', icon: CogIcon },
      { to: '/test', name: 'Shorts', icon: KeyIcon },
      { to: '/ssr', name: 'Abonnements', icon: EyeDropperIcon },
      { to: '/helpers', name: 'Originals', icon: GifIcon },
    ]"
  />
</template>
