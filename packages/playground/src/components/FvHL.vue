<template>
  <pre
    :class="`language-${lang} text-sm`"
    v-highlight
  ><code><slot style="white-space: pre;" /></code></pre>
</template>
<script setup>
defineProps({
  lang: {
    type: String,
    default: 'javascript',
  },
});
</script>
