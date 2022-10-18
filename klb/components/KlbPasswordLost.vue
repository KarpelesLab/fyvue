<template>
    <Dialog :open="modalPwd" @close="setModalPwd" class="fixed inset-0 z-10 overflow-y-auto" style="background: rgba(0, 0, 0, 0.6)">
        <div class="flex items-center justify-center min-h-screen">
            <DialogOverlay />
            <div class="relative mx-1 md:mx0 w-full md:max-w-2xl w-10/12 mx-auto bg-white rounded p-6 shadow">
                <div>
                    <a href="javascript:void(0)" @click="setModalPwd(false)" class="float-right">
                        <XCircleIcon class="w-8 -mr-4 -mt-2 text-gray-500" /></a>
                    <DialogTitle class="text-xl mb-2">Recover my password</DialogTitle><br />
                    <div v-if="!successSentMail">
                        <FyInput id="email" placeholder="Email" type="email" :validate="v$.emailUser" label="Your email" :showLabel="true"></FyInput>
                        <a href="javascript:void(0)" @click="verifyEmail()" class="mt-2 float-right btn px-5 py-2 primary">Recover my password</a><br style="clear: both" />
                        <p v-if="emailErr" class="text-red-700 font-bold">
                            Invalid email.
                        </p>
                    </div>
                    <div v-else>
                        <p class="font-bold">Please check your emails to reset your password.</p>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>
<script>
//TODO: Redo
import FyInput from "./../../components/FyInput.vue";

import { XCircleIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import {
  required,
  email,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  components: {
    FyInput,
    XCircleIcon,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props: {
    show: {
      type: Number,
      default: 1
    }
  },
  setup() {
    let modalPwd = ref(false);

    return {
      modalPwd,
      setModalPwd(value) {
        modalPwd.value = value;
      },
      v$: useVuelidate(),
    };
  },
  created() {
    this.$eventBus.on('showPwdLost', (v) => { this.setModalPwd(v) })
  },
  data() {
    return {
      emailUser: "",
      emailErr: false,
      successSentMail: false
    };
  },
  validations() {
    return {
      emailUser: {
        required,
        email
      },
    };
  },
  methods: {
    openEmailModal() {
      this.setModalPwd(true);
    },
    async verifyEmail() {
      console.log(this.v$.emailUser);
      this.v$.emailUser.$touch();
      this.emailErr = false;
      if (!this.v$.emailUser.$invalid) {
        this.$rest('User:forgot_password', 'POST', { login: this.emailUser }).then(() => {
          this.successSentMail = true
        }).catch((err) => {
          console.log(err)
        });
      }

    },
  },
};
</script>
