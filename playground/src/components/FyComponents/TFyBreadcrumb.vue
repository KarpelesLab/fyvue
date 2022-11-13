<template>
  <FyBreadcrumb
    :nav="[
      { name: $t('breadcrumb_dashboard'), to: '/dashboard' },
      { name: $t('breadcrumb_account'), to: '/dashboard/acccount' },
      { name: $t('breadcrumb_billing') },
    ]"
  />
  <div class="dark bg-neutral-700">
    <FyBreadcrumb
      :nav="[
        { name: $t('breadcrumb_dashboard'), to: '/dashboard' },
        { name: $t('breadcrumb_account'), to: '/dashboard/acccount' },
        { name: $t('breadcrumb_billing') },
      ]"
    />
  </div>
</template>
