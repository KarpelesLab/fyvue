<template>
  <div v-if="loading">
    <div class="absolute w-full h-full top-0 left-0  loading " style="z-index: 1000 !important;">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-800 p-10 rounded-full  shadow w-56 h-56 flex items-center justify-center  "
        style="top: 50%"
      >
        <div><div class="half-circle-spinner opacity-100">
          <div class="circle circle-1" />
          <div class="circle circle-2" />
        </div>
        <div
          class="w-full text-center font-bold mx-auto uppercase text-gray-100 mt-4 text-xs"
        >
          {{$t('global_loading_text')}}
        </div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FyLoader",
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.$eventBus.on("loading", (value) => {
      this.loading = value;
    });
  },
};
</script>
