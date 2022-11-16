<template>
  <div class="fv-typo">
    <h1>Sign in / Sign up</h1>
    <p>Some Klb components require authentication to work.</p>
  </div>
  <KlbLogin
    returnDefault="/"
    :forceAction="
      typeof $route.query.act == 'string' ? $route.query.act : undefined
    "
  />
</template>
