<template>
  <form @submit.prevent="onSubmit" v-if="!completed" class="">
    <div v-for="field of fields" :key="field.label">
      <div class="input-group">
        <template v-if="field.cat == 'label'">
          <p class="form-error-label" v-if="field.style == 'error'">
            {{ field.label }}
          </p>
          <p class="font-medium" v-else>
            <template v-if="field.link !== void 0">
              <a class="underline" :href="field.link">{{ field.label }}</a>
            </template>
            <template v-else>
              {{ field.label }}
            </template>
          </p>
        </template>
        <template v-if="field.cat == 'input'">
          <div
            v-if="
              field.type == 'text' ||
              field.type == 'password' ||
              field.type == 'email'
            "
            class="w-full"
          >
            <label class="label-basic my-4" :for="`login${field.name}`"
              >{{ field.label }}
              <sup class="text-red-700" v-if="req.includes(field.name)"
                >*</sup
              ></label
            >
            <div class="input-box">
              <input
                :placeholder="field.name == 'name' ? 'John Doe' : field.label"
                class="input-basic"
                :type="field.type"
                v-model="formData[field.name]"
                :id="`login${field.name}`"
                :ref="`login${field.name}`"
              />
              <slot name="icon"> </slot>
            </div>
            <div class="error-form mt-4" v-if="field.name in errors">
              {{ errors[field.name] }}
            </div>
          </div>
          <div v-if="field.type == 'checkbox'">
            <div class="mt-6">
              <label class="inline-flex text-xs" :for="`login${field.name}`">
                <input
                  type="checkbox"
                  class="form-checkbox"
                  :id="`login${field.name}`"
                  v-model="formData[field.name]"
                />
                <span class="ml-2">
                  <a
                    class="underline hover:text-slate-500"
                    :href="field.link"
                    target="_blank"
                    >{{ field.label }}</a
                  >
                </span>
              </label>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="flex items-center justify-center my-8">
      <template v-for="field of fields" :key="field.id">
        <a
          @click="userFlowOauth2(field.id)"
          v-if="field.type && field.type == 'oauth2'"
          href="javascript:void(0);"
        >
          <img
            :key="`${field.label}oauth`"
            class="h-10 w-10 block mr-4 my-0 rounded my-2 p-2 float-right rounded-full border"
            :alt="field.info.Name"
            :src="field.button.logo"
            :style="`background: ${field.button['background-color']}`"
          />
        </a>
      </template>
    </div>
    <button
      class="block text-lg mx-auto p-2 px-4 btn primary"
      type="submit"
      v-if="showNext"
    >
      Next
    </button>
  </form>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
//import PasswordLost from "@/fyvue/klwb/components/passwordLost.vue";
import { rest } from "@karpeleslab/klbfw";

export default {
  name: "DefaultSignin",
  components: {
    // PasswordLost,
  },
  props: {
    returnDefault: {
      type: String,
      default: "null",
    },
    forceAction: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      email: "",
      password: "",
      globalFormError: "",
      errors: {},
      step: "email",
      fields: [],
      formData: {
        return_to: "/l/en-US/",
        session: null,
        action: this.forceAction ? this.forceAction : undefined
      },
      completed: false,
      currentMessage: "Please input your email address",
      message: "",
      req: [],
      showPwdMod: false,
      returnTo: "",
      showNext: true,
    };
  },
  created() {
    this.userFlow();
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      email: {},
      password: {},
    };
  },
  methods: {
    userFlowOauth2(idOauth) {
      this.showPwdMod = false;
      this.$eventBus.emit("loading", true);
      this.req = [];
      this.formData.oauth2 = idOauth;
      rest("User:flow", "POST", this.formData)
        .then((response) => {
          if (response.result == "success") {
            window.location = response.data.url;
          }
        })
        .catch((error) => {
          this.addErrors(error);
          this.$eventBus.emit("loading", false);
          this.globalFormError = error.error;
        });
    },
    pwdLostOpen() {
      this.$eventBus.emit("showPwdLost", true);
    },
    addErrors(response) {
      this.errors = {};
      if (response.param) {
        this.errors[response.param] = response.message;
      }
    },
    checkBoxes() {
      if (Array.isArray(this.fields)) {
        for (let i = 0; i < this.fields.length; i++) {
          if (this.fields[i].cat == "input") {
            if (this.fields[i].type == "checkbox") {
              this.formData[this.fields[i].name] = false;
            } else {
              this.formData[this.fields[i].name] = "";
            }
          }
        }
      }
    },
    getFirstInput() {
      if (Array.isArray(this.fields)) {
        if (this.fields.length == 0) {
          this.showNext = false;
        }
        for (let i = 0; i < this.fields.length; i++) {
          if (this.fields[i].cat == "input") {
            return `login${this.fields[i].name}`;
          }
        }
      } else {
        this.showNext = false;
      }
    },
    checkStep(message) {
      if (message == "[I18N:user_flow_register]") {
        this.step = "registration";
      } else {
        this.step = "email";
      }
    },

    userFlow() {
      if (this.returnDefault) {
        this.returnTo = this.returnDefault;
      } else {
        this.returnTo =
          this.$route.query.return_to === void 0
            ? "/"
            : this.$route.query.return_to;
      }

      this.showPwdMod = false;
      this.$eventBus.emit("loading", true);
      this.req = [];
      if (
        this.$route.query.session != undefined &&
        this.$route.query.session != null
      ) {
        this.formData.session = this.$route.query.session;
      }

      rest("User:flow", "POST", this.formData)
        .then((response) => {
          //localStorage.userSession = response.data.session;
          this.fields = response.data.fields;
          this.formData = {
            //return_to: "http://localhost:8080/l/en-US/",
            session: response.data.session,
          };
          this.checkBoxes();
          this.message = response.data.message;
          this.$eventBus.emit("loading", false);
          this.req = response.data.req;
          if (response.data.complete == true && response.data.user) {
            this.$store
              .dispatch("setSession", response.data.user.User__)
              .then(() => {
                this.completed = true;
                console.log(this.returnTo);
                window.location = this.returnTo;
              });
          } else {
            this.$nextTick(() => {
              try {
                let firstInput = this.$refs[this.getFirstInput()];
                firstInput[0].focus();
              } catch (err) {
                console.log(err);
              }
            });
          }
        })
        .catch((error) => {
          // handle errors here
          if (error.code == 0) {
            this.showPwdMod = true;
          }
          this.addErrors(error);
          this.$eventBus.emit("loading", false);
          this.globalFormError = error.error;
        });
    },
    async onSubmit() {
      this.userFlow();
    },
  },
};
</script>
