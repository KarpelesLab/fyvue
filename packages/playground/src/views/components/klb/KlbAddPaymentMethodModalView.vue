<script setup>
const klbLogin = `
<template>
  <button
    @click="$eventBus.emit('ShowAddPaymentMethodModal', true)"
    class="btn primary btn-defaults"
  >
    Open modal
  </button>
  <KlbAddPaymentMethodModal />
</template>
`;
const props = [];
</script>
<template>
  <FyDocPreview :component="klbLogin" :props="props" :reqAuth="true">
    <template #component>
      <button
        @click="$eventBus.emit('ShowAddPaymentMethodModal', true)"
        class="btn primary btn-defaults"
      >
        Open modal
      </button>
      <KlbAddPaymentMethodModal />
    </template>
  </FyDocPreview>
</template>
