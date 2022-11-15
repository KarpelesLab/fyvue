<script setup>
const klbLogin = `
<KlbLogin
  returnDefault="/"
  :forceAction="$route.query.act"
/>
`;
const props = [
  { name: 'returnTo', type: 'string', info: 'Default return URL after login.' },
  {
    name: 'forceAction',
    type: 'string',
    info: 'Force action options on User Flow (delete_account, etc...)',
  },
];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>KlbLogin</h1>
    <p>
      This component provide an interface for Klb User Flow allowing to sign in
      users.
    </p>
  </div>

  <FyDocPreview :component="klbLogin" :props="props">
    <template #component>
      <KlbLogin
        returnDefault="/"
        :forceAction="
          typeof $route.query.act == 'string' ? $route.query.act : undefined
        "
      />
    </template>
  </FyDocPreview>
</template>
