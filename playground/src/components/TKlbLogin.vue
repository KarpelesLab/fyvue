<template>
  <div class="p-4">
    <KlbLogin
      returnDefault="/tests/Store"
      :forceAction="typeof $route.query.act == 'string' ? $route.query.act : undefined"
    />
  </div>
  <div class="dark bg-slate-900 p-4">
    <KlbLogin
      returnDefault="/"
      :forceAction="typeof $route.query.act == 'string' ? $route.query.act : undefined"
    />
  </div>
</template>
