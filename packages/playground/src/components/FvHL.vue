<template>
  <div class="rounded-xl overflow-hidden">
    <pre
      :class="`language-${lang} text-sm -0`"
      v-highlight
    ><code><slot style="white-space: pre;" /></code></pre>
  </div>
</template>
<script setup>
defineProps({
  lang: {
    type: String,
    default: 'javascript',
  },
});
</script>
