<template>
  <div class="fv-404">
    <div class="">
      <div class="title-404">404</div>
      <div class="content-404">
        {{ $t('fv_404_title') }}
      </div>
      <br /><br />
      <button @click="$router.go(-1)" class="btn primary btn-defaults">
        {{ $t('fv_404_back_to_home') }}
      </button>
    </div>
  </div>
</template>
