<script setup>
import { Web3Connect } from '@fy-/w3';
</script>
<template>
  <div>
    <ClientOnly>
      <Web3Connect force-chain-by-name="polygon" />
    </ClientOnly>
  </div>
</template>
