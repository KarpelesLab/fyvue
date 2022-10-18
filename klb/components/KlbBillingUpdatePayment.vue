<template>
  <div v-if="user">
    <form
      @submit.prevent="submitEditPaymentInfo"
      v-if="isEditing"
      class="bg-orange-100 rounded p-3"
    >
      <div class="input-group w-full">
        <div class="mr-4 w-16">
          <label class="label-basic" for="typeDef"
            >{{ $t("billing_create_creditcard_label") }}
          </label>
        </div>
        <div class="w-full">
          <div class="input-box w-full">
            <div id="theCard" class="input-basic w-full"></div>
          </div>
        </div>
      </div>
      <button
        class="block font-extrabold mx-auto p-2 mt-4 btn primary"
        type="submit"
      >
        {{ $t("save_billing_data") }}
      </button>
    </form>
    <div v-else class="bg-orange-100 rounded p-3">
      <div v-if="billing && billing.Methods && billing.Methods.length > 0">
        {{ $t("payment_method_billing") }}: <b>{{ billing.Methods[0].Name }}</b
        ><br />
        {{ $t("payment_method_exp") }}:
        <b>{{ billing.Methods[0].Expiration }}</b>
        <button
          class="block font-extrabold mx-auto p-2 mt-4 btn primary"
          @click="switchToEdit"
        >
          {{ $t("edit_billing_method") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUser } from "./../../klb/api/user";
import {
  getUserBilling,
  getPaymentMethod,
  changePaymentMethodByID,
} from "./../../klb/api/billing";
import { getLocationByID } from "./../../klb/api/location";
import { notify } from "notiwind";
import i18next from "./../../klb/api/i18n";
import { eventBus } from "./../..";
const user = ref(null);
const billing = ref(null);
const isEditing = ref(false);
const stripe = ref(null);
const stripePK = ref(null);
const stripeCard = ref(null);
const cardToken = ref(null);
const location = ref(null);

const switchToEdit = async () => {
  isEditing.value = true;
  stripePK.value = await getPaymentMethod();
  if (
    stripePK.value &&
    stripePK.value.data &&
    stripePK.value.data.Fields &&
    stripePK.value.data.Fields.cc_token &&
    stripePK.value.data.Fields.cc_token.attributes.key
  ) {
    stripe.value = window.Stripe(
      stripePK.value.data.Fields.cc_token.attributes.key
    );
    stripeCard.value = stripe.value
      .elements()
      .create("card", { hidePostalCode: true });
    stripeCard.value.mount("#theCard");
  }
};

const submitEditPaymentInfo = async () => {
  eventBus.emit('loading', true);
  cardToken.value = await stripe.value.createToken(stripeCard.value, {
    name: `${location.value.data.First_Name} ${location.value.data.Last_Name}`,
    email: user.value.Email,
  });
  await changePaymentMethodByID(
    billing.value.Methods[0].User_Billing_Method__,
    cardToken.value.token.id
  );

  billing.value = await getUserBilling();
  if (billing.value.data.length != 0) {
    location.value = await getLocationByID(
      billing.value.data[0].User_Location__
    );
    billing.value = billing.value.data[0];
  }
  isEditing.value = false;
  eventBus.emit('loading', false);
  notify(
    {
      group: "default",
      title: i18next.t("notif_success_title"),
      text: i18next.t("update_success_confirm"),
    },
    4000
  );
};
onMounted(async () => {
  user.value = await getUser();
  if (user.value) {
    billing.value = await getUserBilling();
    if (billing.value.data.length != 0) {
      location.value = await getLocationByID(
        billing.value.data[0].User_Location__
      );
      billing.value = billing.value.data[0];
      console.log(billing);
    }
  }
});
</script>
