<template>
  <div class="">
    <Dialog
      :open="modal"
      class="fixed inset-0 z-10 overflow-y-auto"
      style="background: rgba(0, 0, 0, 0.8)"
      @close="setModal"
    >
      <div class="flex items-center justify-center min-h-screen text-black">
        <DialogOverlay />
        <div
          class="relative mx-1 md:mx0 w-full md:max-w-2xl w-10/12 mx-auto bg-white rounded p-6 shadow -mt-44"
        >
          <div>
            <a
              href="javascript:void(0)"
              class="float-right"
              @click="handleEvents(false)"
            >
              <XCircleIcon class="w-8 -mr-4 -mt-2 text-gray-500"
            /></a>
            <DialogTitle class="text-xl mb-2"> {{ title }} </DialogTitle><br />
            <slot />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { ref } from "vue";
import { Dialog, DialogOverlay, DialogTitle } from "@headlessui/vue";
import { XCircleIcon } from "@heroicons/vue/24/solid";
export default {
  name: "FyModal",
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    XCircleIcon,
  },
  props: {
    id: { type: String, default: "CustomModal" },
    title: { type: String, default: "" },
    onOpen: { type: Function, default: () => {} },
    onClose: { type: Function, default: () => {} },
  },
  setup() {
    let modal = ref(false);

    return {
      modal,
      setModal(value) {
        modal.value = value;
      },
    };
  },
  data() {
    return {};
  },
  created() {
    this.$eventBus.on(`${this.id}Modal`, this.handleEvents);
  },
  unmounted() {
    this.$eventBus.off(`${this.id}Modal`, this.handleEvents);
  },
  methods: {
    handleEvents(v) {
      this.setModal(v);
      if (v == false) {
        this.onClose();
      } else {
        this.onOpen();
      }
    },
  },
};
</script>
