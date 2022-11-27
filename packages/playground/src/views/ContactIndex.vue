<script setup>
import { useSeo, useTranslation } from '@karpeleslab/fyvue';
import { ref } from 'vue';
const translate = useTranslation();
useSeo(ref({ title: 'Contact - Fyvue' }));
</script>
<template>
  <div>
    <h1>Contact</h1>
    <br />
    <div>
      <KlbSupport to="@support" />
    </div>
  </div>
</template>
<script setup></script>
