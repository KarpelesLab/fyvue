<template>
  <div >
    <Dialog
      :open="modal"
      class="fy-modal"
      style="background: rgba(0, 0, 0, 0.8)"
      @close="setModal"
    >
      <div class="parent">
        <DialogOverlay />
        <div
          class="modal-container"
        >
          <div>
            <a
              href="javascript:void(0)"
              class="float-right"
              @click="handleEvents(false)"
            >
              <XCircleIcon class="close-icon"
            /></a>
            <DialogTitle class="title"> {{ title }} </DialogTitle><br />
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
