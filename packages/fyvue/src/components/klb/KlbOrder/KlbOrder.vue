<script setup lang="ts">
import { useCart } from '../KlbOrder/useCart';
import { useOrder } from '../KlbOrder/userOrder';
import { watch, ref, onMounted, computed, reactive } from 'vue';
import { KlbAPICatalogCart, KlbOrder } from '../../../dts/klb';
import { TrashIcon } from '@heroicons/vue/24/solid';
import { useFVStore } from '../../../utils/store';
import KlbUserLocationVue from '../KlbUser/KlbUserLocation.vue';
import { useTranslation } from '../../../utils/helpers';
import { useRouter, useRoute } from 'vue-router';
import KlbProcessOrderInternal from './KlbProcessOrderInternal.vue';
import FyLoader from '../../ui/FyLoader/FyLoader.vue';
import { useEventBus } from '../../../utils/helpers';

const cart = ref<KlbAPICatalogCart>();
const store = useFVStore();
const router = useRouter();
const route = useRoute();
const routeOrderUuid = computed(() => route.query.Order__);
const translate = useTranslation();
const isAuth = computed(() => store.isAuth);
const isReady = ref<boolean>(false);
const error = ref<string>();
const hasOrder = ref<KlbOrder>();
const eventBus = useEventBus();

watch(routeOrderUuid, async (v) => {
  if (v) {
    const _order = await useOrder()
      .getOrder(v.toString())
      .catch(() => {});
    if (_order && _order.result == 'success') hasOrder.value = _order.data;
  } else {
    hasOrder.value = undefined;
  }
});

const state = reactive({
  location: undefined,
});
withDefaults(
  defineProps<{
    shopPath?: string;
    mode?: 'b2c' | 'b2b';
    loginPath?: string;
  }>(),
  {
    shopPath: '/shop',
    mode: 'b2c',
    loginPath: '/login',
  }
);
const delProduct = async (productUuid: string) => {
  eventBus.emit('klb-order-main-loading', true);
  const _result = await useCart().delProduct(productUuid);
  if (_result) {
    cart.value = await useCart().getCart();
    await store.refreshCart();
  }
  eventBus.emit('klb-order-main-loading', false);
};
const createOrder = async () => {
  eventBus.emit('klb-order-main-loading', true);
  error.value = undefined;
  if (!state.location) {
    error.value = translate('klb_error_order_create_location_empty');
    return;
  }
  const _result = await useCart()
    .createOrder({
      User_Location__: state.location,
    })
    .catch((err) => {
      error.value = err.error;
    });
  if (_result && _result.result == 'success') {
    hasOrder.value = _result.data;
    router.push({
      path: router.currentRoute.value.path,
      query: { Order__: hasOrder.value.Order__ },
    });
  }
  await store.refreshCart();
  eventBus.emit('klb-order-main-loading', false);
};
const getLastUnfinishedOrder = async () => {
  //const _unfinishedOrder = await useOrder().getLastUnfinishedOrder();
};
onMounted(async () => {
  eventBus.emit('klb-order-main-loading', true);
  if (!routeOrderUuid.value) {
    if (route.query.product) {
      await addProductToCart(route.query.product.toString());
    }
    cart.value = await useCart().getCart();
  } else {
    const _order = await useOrder()
      .getOrder(routeOrderUuid.value.toString())
      .catch(() => {});
    if (_order && _order.result == 'success') {
      hasOrder.value = _order.data;
    }
  }
  //await getLastUnfinishedOrder();
  isReady.value = true;
  eventBus.emit('klb-order-main-loading', false);
});
const addProductToCart = async (productData: string) => {
  await useCart().resetCart();
  const _addResult = await useCart().addProduct(productData, '');
  if (_addResult) {
    await store.refreshCartData(_addResult);
  }
};
</script>
<template>
  <div class="klb-order" v-if="isReady">
    <FyLoader id="klb-order-main" />
    <h2>{{ $t('klb_order_cart_summary') }}</h2>
    <div class="card-container card-defaults" v-if="cart && !hasOrder">
      <div class="fv-typo mb-2" v-if="cart.data.products.length == 0">
        <p>
          {{ $t('klb_order_cart_is_empty') }}
        </p>
      </div>
      <div
        v-for="product in cart.data.products"
        :key="`cart_summary_${product.data.Catalog_Product__}`"
        class="cart-product"
      >
        <div class="cart-summary">
          <h3>
            {{ product.data['Basic.Name'] }}
          </h3>
          <div class="price">
            {{
              mode == 'b2c'
                ? product.data.Price.tax.display
                : product.data.Price.raw.display
            }}
            <span class="cycle" v-if="product.data['Basic.ServiceLifetime']"
              >/{{
                $formatKlbRecurringPaymentCycle(
                  product.data['Basic.ServiceLifetime']
                )
              }}</span
            >
            <button
              class="btn danger trash-icon"
              @click="delProduct(product.key)"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
        <div class="cart-summary is-desc" v-if="product.meta.description">
          {{ product.meta.description }}
        </div>
        <div class="cart-summary is-tax" v-if="mode == 'b2b'">
          <h3>
            {{ $t('klb_order_cart_vat') }} ({{ product.data.Price.tax_rate }}%)
          </h3>
          <div class="price">
            {{ product.data.Price.tax_only.display }}
          </div>
        </div>
      </div>
      <div class="cart-total">
        <div class="cart-summary" v-if="mode == 'b2c'">
          <h3>
            {{ $t('klb_order_cart_total') }}
            <small
              >({{
                $t('klb_order_tv_included', {
                  val: cart.data.total_vat_only.display,
                })
              }})</small
            >
          </h3>
          <div class="price">
            <b>{{ cart.data.total_vat.display }}</b>
          </div>
        </div>
        <template v-else>
          <div class="cart-summary vat">
            <h3>
              {{ $t('klb_order_cart_total_products') }}
            </h3>
            <div class="price">
              <b>{{ cart.data.total.display }}</b>
            </div>
          </div>
          <div class="cart-summary vat">
            <h3>
              {{ $t('klb_order_cart_total_taxes') }}
            </h3>
            <div class="price">
              <b>{{ cart.data.total_vat_only.display }}</b>
            </div>
          </div>
          <div class="cart-summary total">
            <h3>
              {{ $t('klb_order_cart_total') }}
            </h3>
            <div class="price">
              <b>{{ cart.data.total_vat.display }}</b>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="card-container card-defaults" v-if="hasOrder">
      <div
        v-for="product in hasOrder.Items"
        :key="`cart_summary_${product.Catalog_Product.Catalog_Product__}`"
        class="cart-product"
      >
        <div class="cart-summary">
          <h3>
            {{ product.Catalog_Product['Basic.Name'] }}
          </h3>

          <div class="price">
            {{
              mode == 'b2c'
                ? product.Catalog_Product.Price.tax.display
                : product.Catalog_Product.Price.raw.display
            }}
            <span
              class="cycle"
              v-if="product.Catalog_Product['Basic.ServiceLifetime']"
              >/{{
                $formatKlbRecurringPaymentCycle(
                  product.Catalog_Product['Basic.ServiceLifetime']
                )
              }}</span
            >
          </div>
        </div>
        <div
          class="cart-summary is-desc"
          v-if="product.Catalog_Product['Meta.description']"
        >
          {{ $t('klb_product_description_label') }}
          <span>{{ product.Catalog_Product['Meta.description'] }}</span>
        </div>
        <div class="cart-summary is-desc" v-if="product.Status">
          {{ $t('klb_product_status') }}
          <span class="fv-tag">{{
            $t(`klb_product_status_${product.Status.replace('-', '_')}`)
          }}</span>
        </div>
        <div class="cart-summary is-tax" v-if="mode == 'b2b'">
          <span>
            {{ $t('klb_order_cart_vat') }} ({{
              product.Catalog_Product.Price.tax_rate
            }}%)
          </span>
          <div class="price">
            {{ product.Catalog_Product.Price.tax_only.display }}
          </div>
        </div>
      </div>
      <div class="cart-total">
        <div class="cart-summary" v-if="mode == 'b2c'">
          <h3>
            {{ $t('klb_order_cart_total') }}
            <small
              >({{
                $t('klb_order_tv_included', {
                  val: hasOrder.Vat_Amount.display,
                })
              }})</small
            >
          </h3>
          <div class="price">
            <b>{{ hasOrder.Total_Vat.display }}</b>
          </div>
        </div>
        <template v-else>
          <div class="cart-summary vat">
            <h3>
              {{ $t('klb_order_cart_total_products') }}
            </h3>
            <div class="price">
              <b>{{ hasOrder.Total.display }}</b>
            </div>
          </div>
          <div class="cart-summary vat">
            <h3>
              {{ $t('klb_order_cart_total_taxes') }}
            </h3>
            <div class="price">
              <b>{{ hasOrder.Vat_Amount.display }}</b>
            </div>
          </div>
          <div class="cart-summary total">
            <h3>
              {{ $t('klb_order_cart_total') }}
            </h3>
            <div class="price">
              <b>{{ hasOrder.Total_Vat.display }}</b>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="mt-4">
      <h2>{{ $t('klb_order_billing_location') }}</h2>
      <template v-if="!hasOrder">
        <template v-if="isAuth"
          ><KlbUserLocationVue v-model="state.location"
        /></template>
        <template v-else>
          <div class="card-container card-defaults fv-typo">
            {{ $t('klb_order_you_need_to_be_logged_in') }}
            <br /><br /><router-link
              :to="`${loginPath}?return_to=${$route.path}`"
              class="btn primary btn-defaults"
            >
              {{ $t('klb_login_cta') }}
            </router-link>
          </div>
        </template>
      </template>
      <div v-else>
        {{ hasOrder.Billing_User_Location.Display.join(', ') }}
      </div>
      <p v-if="error" class="response-error">{{ error }}</p>
      <div class="mt-4 flex items-center justify-center">
        <button
          @click="createOrder()"
          class="btn primary btn-defaults big"
          v-if="!hasOrder"
        >
          {{ $t('klb_order_create_cta') }}
        </button>
      </div>
    </div>
    <div v-if="routeOrderUuid">
      <h2>{{ $t('klb_order_process') }}</h2>
      <KlbProcessOrderInternal :orderUuid="routeOrderUuid?.toString()" />
    </div>
  </div>
</template>
