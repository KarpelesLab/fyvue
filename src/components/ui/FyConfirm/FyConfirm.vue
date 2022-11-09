<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Dialog, DialogOverlay, DialogTitle } from "@headlessui/vue";
import type { FyvueConfirm } from '../../../dts';
import { useEventBus } from "../../../utils/helpers";

const eventBus = useEventBus();
const confirm = ref<boolean>(false)
const title = ref<string|null>(null)
const desc = ref<string|null>(null)
const onConfirm = ref<Function|null>(null)

const _onConfirm = async () => {
  if (onConfirm.value) {
    await onConfirm.value();
  }
  resetConfirm();
}
const resetConfirm = () => {
  title.value = null
  desc.value = null
  onConfirm.value = null
  confirm.value = false
}
const showConfirm = (data : FyvueConfirm) => {
  title.value = data.title;
  desc.value = data.desc;
  onConfirm.value = data.onConfirm;
  confirm.value = true;
}

onMounted(()=> {
  eventBus.on('resetConfirm', resetConfirm);
  eventBus.on('showConfirm', showConfirm)
})
onUnmounted(()=> {
  eventBus.off('resetConfirm', resetConfirm);
  eventBus.off('showConfirm', showConfirm)
})
</script>
<template>
    <div>
        <Dialog
            :open="confirm"
            @close="confirm=false"
            class="fy-modal is-confirm"
            style="background: rgba(0, 0, 0, 0.6); z-index:43 !important;"
        >
            <div class="parent">
                <DialogOverlay />
                <div
                    class="modal-container" style="width: 350px !important;"
                >
                    <div>
                        <DialogTitle class="title">{{
                            title
                        }}</DialogTitle
                        >
                        <div class="modal-content">
                          <div class="confirm-modal-desc default-p" v-if="desc">{{ desc }}</div><br />
                          <div class="btn-box">
                              <button
                                  @click="confirm=false"
                                  class="btn neutral btn-defaults"
                              >
                                  {{ $t("confirm_modal_cta_cancel") }}
                              </button>
                              <button
                                  @click="_onConfirm()"
                                  class="btn primary btn-defaults"
                              >
                                  {{ $t("confirm_modal_cta_confirm") }}
                              </button>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>
