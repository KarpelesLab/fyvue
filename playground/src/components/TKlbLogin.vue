<template>
  <div class="p-4 bg-fv-neutral-100 dark:bg-fv-neutral-900">
    <KlbLogin
      returnDefault="/tests/Store"
      :forceAction="
        typeof $route.query.act == 'string' ? $route.query.act : undefined
      "
    />
  </div>

</template>
