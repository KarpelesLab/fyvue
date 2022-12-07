<script setup>
const fvComponent = `
<div class="btn-box space-x-4">
  <button class="btn primary">.primary</button>
  <button class="btn danger">.danger</button>
  <button class="btn warning">.warning</button>
  <button class="btn valid">.warning</button>
  <button class="btn neutral">.neutral</button>
  <button class="btn disabled">.disabled</button>
  <button class="btn primary round">.primary + .round</button>
</div>
<div class="space-x-4 mt-8">
  <button class="btn primary">.primary</button>
  <button class="btn danger text-3xl !font-bold !p-5">.danger</button>
  <button class="btn warning !p-2 !rounded-xl">.warning</button>
  <button
    class="btn valid !py-2 !rounded-tl-full !rounded-br-full !px-6"
  >
    .warning
  </button>
  <button class="btn neutral !text-xl !shadow-lg !p-3">.neutral</button>
  <button class="btn disabled !p-1.5">.disabled</button>
</div>
<div class="space-x-4 mt-8">
  <button class="btn primary big">.primary + .big</button>
  <button class="btn primary small">.primary + .small</button>
  <button class="btn primary text-4xl">.primary + .text-4xl</button>
</div>`;
</script>
<template>
  <FyDocPreview :component="fvComponent" lang="html">
    <template #component>
      <div class="fv-typo">
        <div class="btn-box space-x-4">
          <button class="btn primary">.primary</button>
          <button class="btn danger">.danger</button>
          <button class="btn warning">.warning</button>
          <button class="btn valid">.warning</button>
          <button class="btn neutral">.neutral</button>
          <button class="btn disabled">.disabled</button>
          <button class="btn primary round">.primary + .round</button>
        </div>
        <div class="space-x-4 mt-8">
          <button class="btn primary">.primary</button>
          <button class="btn danger text-3xl !font-bold !p-5">.danger</button>
          <button class="btn warning !p-2 !rounded-xl">.warning</button>
          <button
            class="btn valid !py-2 !rounded-tl-full !rounded-br-full !px-6"
          >
            .warning
          </button>
          <button class="btn neutral !text-xl !shadow-lg !p-3">.neutral</button>
          <button class="btn disabled !p-1.5">.disabled</button>
        </div>
        <div class="space-x-4 mt-8">
          <button class="btn primary big">.primary + .big</button>
          <button class="btn primary small">.primary + .small</button>
          <button class="btn primary text-4xl">.primary + .text-4xl</button>
        </div>
      </div>
    </template>
  </FyDocPreview>
</template>
