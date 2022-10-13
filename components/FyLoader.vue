<template>
  <div v-if="loading">
    <div class="absolute w-full h-full top-0 left-0  loading " style="z-index: 1000 !important;">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-800 p-10 rounded-full  shadow w-42 h-42 flex items-center justify-center  "
        style="top: 50%"
      >
        <div><div class="half-circle-spinner opacity-100">
          <div class="circle circle-1" />
          <div class="circle circle-2" />
        </div>
        <div
          class="w-full text-center font-bold mx-auto uppercase text-gray-100 mt-4"
        >
          {{$t('global_loading_text')}}...
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
<style type="scss">
.loading {
  background-color: rgba(255,255,255,.5)
}
.half-circle-spinner, .half-circle-spinner * {
      box-sizing: border-box;
    }

    .half-circle-spinner {
      width: 100px;
      height: 100px;
      border-radius: 100%;
      position: relative;
      margin: 0 auto;
    }

    .half-circle-spinner .circle {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border: calc(100px / 8) solid transparent;
    }

    .half-circle-spinner .circle.circle-1 {
      border-top-color: #ff3900;
      animation: half-circle-spinner-animation 1s infinite;
    }

    .half-circle-spinner .circle.circle-2 {
      border-bottom-color: #ff3900;
      animation: half-circle-spinner-animation 1s infinite alternate;
    }

    @keyframes half-circle-spinner-animation {
      0% {
        transform: rotate(0deg);

      }
      100%{
        transform: rotate(360deg);
      }
    }
</style>
