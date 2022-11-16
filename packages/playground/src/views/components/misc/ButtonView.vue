<script setup>
const fvComponent = `<h2>With .btn-defaults</h2>
<div class="btn-box space-x-4">
  <button class="btn primary btn-defaults">.primary</button>
  <button class="btn danger btn-defaults">.danger</button>
  <button class="btn warning btn-defaults">.warning</button>
  <button class="btn valid btn-defaults">.warning</button>
  <button class="btn neutral btn-defaults">.neutral</button>
  <button class="btn disabled btn-defaults">.disabled</button>
  <button class="btn primary btn-defaults round">.primary + .round</button>

</div>
<h2>Without</h2>
<div class="space-x-4">
  <button class="btn primary">.primary</button>
  <button class="btn danger text-3xl font-bold p-5">.danger</button>
  <button class="btn warning p-2 rounded-xl">.warning</button>
  <button class="btn valid py-2 rounded-tl-full rounded-br-full px-6">.warning</button>
  <button class="btn neutral text-xl shadow-lg p-3">.neutral</button>
  <button class="btn disabled p-1.5">.disabled</button>
</div>`;
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>Button</h1>
    <p><b>fyvue</b> provides a CSS class for html buttons and links.</p>
    <p>
      You can override all colors manually or just change your tailwind setup
      (primary uses <b>fv-primary</b> color and neutral uses <b>fv-neutral</b>).
    </p>
  </div>
  <FyDocPreview :component="fvComponent" lang="html">
    <template #component>
      <div class="fv-typo">
        <h2>With .btn-defaults</h2>
        <p>
          <b>.btn-defaults</b> is the default padding/margin/font-size use by
          all fyvue components on buttons.
        </p>
        <div class="btn-box space-x-4">
          <button class="btn primary btn-defaults">.primary</button>
          <button class="btn danger btn-defaults">.danger</button>
          <button class="btn warning btn-defaults">.warning</button>
          <button class="btn valid btn-defaults">.warning</button>
          <button class="btn neutral btn-defaults">.neutral</button>
          <button class="btn disabled btn-defaults">.disabled</button>
          <button class="btn primary btn-defaults round">
            .primary + .round
          </button>
        </div>
        <h2>Without</h2>
        <div class="space-x-4">
          <button class="btn primary">.primary</button>
          <button class="btn danger text-3xl font-bold p-5">.danger</button>
          <button class="btn warning p-2 rounded-xl">.warning</button>
          <button class="btn valid py-2 rounded-tl-full rounded-br-full px-6">
            .warning
          </button>
          <button class="btn neutral text-xl shadow-lg p-3">.neutral</button>
          <button class="btn disabled p-1.5">.disabled</button>
        </div>
      </div>
    </template>
  </FyDocPreview>
</template>
