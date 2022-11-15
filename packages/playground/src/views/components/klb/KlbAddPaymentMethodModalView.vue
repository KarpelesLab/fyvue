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
  <div class="fv-typo mb-2">
    <h1>KlbAddPaymentMethodModal</h1>
    <p>Opens a modal to add a payment method.</p>
  </div>

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
