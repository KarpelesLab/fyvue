<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
} from "@headlessui/vue";
import { ref, onMounted, onUnmounted, h } from 'vue'
import { useEventBus } from "../../../helpers";
import { XCircleIcon } from "@heroicons/vue/24/solid";

const props = withDefaults(defineProps<{
  id: string,
  title?: string,
  onOpen?: Function,
  onClose?: Function,
  closeIcon?: Object
}>(), {
  closeIcon: () => h(XCircleIcon)
})

const eventBus = useEventBus();

const isOpen = ref<boolean>(false);
const setModal = (value: boolean) => {
  if (value === true) if (props.onOpen) props.onOpen();
  else {
    if (props.onClose) props.onClose();
  }
  isOpen.value = value;
};
onMounted(() => {
  eventBus.on(`${props.id}Modal`, setModal);
});
onUnmounted(() => {
  eventBus.off(`${props.id}Modal`, setModal);
});
</script>
<template>
  <TransitionRoot :show="isOpen" as="template" enter="duration-300 ease-out" enter-from="opacity-0"
    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
    <Dialog :open="isOpen" @close="setModal" style="background: rgba(0, 0, 0, 0.8)" class="fy-modal">
      <div class="parent">
        <DialogPanel class="modal-container">
          <DialogTitle class="title" v-if="title">
            {{ title }}
            <a href="javascript:void(0)" @click="setModal(false)">
              <component :is="closeIcon" class="close-icon" />
            </a>
          </DialogTitle>
          <a href="javascript:void(0)" @click="setModal(false)" v-else>
            <component :is="closeIcon" class="close-icon is-alone" />
          </a>
          <div :class="!title ? 'is-alone modal-content' : 'modal-content'">
            <slot />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
