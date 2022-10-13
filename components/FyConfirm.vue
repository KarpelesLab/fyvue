<template>
    <div class="text-black">
        <Dialog
            :open="confirm"
            @close="setConfirm"
            class="fixed inset-0 z-50 overflow-y-auto"
            style="background: rgba(0, 0, 0, 0.6)"
        >
            <div class="flex items-center justify-center min-h-screen">
                <DialogOverlay />
                <div
                    class="text-black relative mx-1 md:mx0 w-full max-w-md mx-auto bg-white rounded p-6 shadow"
                >
                    <div>
                        <DialogTitle class="mb-2 text-lg">{{
                            title
                        }}</DialogTitle
                        >{{ desc }}<br /><br v-if="desc" />
                        <div class="flex justify-between">
                            <button
                                @click="setConfirm(false)"
                                class="btn neutral p-2"
                            >
                                {{ $t("confirm_modal_cta_cancel") }}
                            </button>
                            <button
                                @click="onConfirm()"
                                class="btn primary p-2"
                            >
                                {{ $t("confirm_modal_cta_confirm") }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script>
import { ref } from "vue";
import { Dialog, DialogOverlay, DialogTitle } from "@headlessui/vue";

export default {
  name: "FyConfirm",
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  setup() {
    let confirm = ref(false);

    return {
      confirm,
      setConfirm(value) {
        confirm.value = value;
      },
    };
  },
  data() {
    return {
      title: "",
      desc: "",
      onConfirm: () => {},
    };
  },
  created() {
    this.$eventBus.on("resetConfirm", () => {
      this.title = "";
      this.onConfirm = () => {};
      this.setConfirm(false);
    });
    this.$eventBus.on("showConfirm", (data) => {
      this.title = data.title;
      this.desc = data.desc;
      this.onConfirm = data.onConfirm;
      this.setConfirm(true);
    });
  },
};
</script>
