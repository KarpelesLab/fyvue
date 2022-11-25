<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ObjectS2Any } from '../../../dts';
import type { KlbAPICatalog } from '../../../dts/klb';
import { rest } from '../../../utils/rest';
import { useCart } from '../KlbOrder/useCart';
import { useHistory } from '../../../utils/ssr';
import { useFVStore } from '../../../utils/store';
const products = ref<KlbAPICatalog>();
const store = useFVStore();
const props = withDefaults(
  defineProps<{
    options?: ObjectS2Any;
    displayType?: 'subs' | 'shop';
    features?: string[];
    startOrderPath?: string;
    productMeta?: string;
  }>(),
  {
    options: (): ObjectS2Any => {
      return { sort: 'Basic.Priority:asc' };
    },
    displayType: 'subs',
    features: () => [],
    startOrderPath: '/user/order/start',
    productMeta: '',
  }
);
onMounted(async () => {
  const _products = await rest<KlbAPICatalog>('Catalog/Product:search', 'GET', {
    ...props.options,
    image_variation: [
      'scale_crop=320x160&format=png&alias=shop',
      'scale_crop=320x120&format=png&alias=subs',
    ],
  }).catch(() => {});

  if (_products && _products.result == 'success') {
    products.value = _products;
  }
});
const addProductToCart = async (productUuid: string) => {
  if (props.displayType == 'subs') {
    await useCart().resetCart();
    const _addResult = await useCart().addProduct(
      productUuid,
      props.productMeta
    );
    if (_addResult) {
      await store.refreshCartData(_addResult);
      useHistory().push(props.startOrderPath);
    }
  } else if (props.displayType == 'shop') {
    const _addResult = await useCart().addProduct(
      productUuid,
      props.productMeta
    );
    await store.refreshCartData(_addResult);
  }
};
</script>
<template>
  <div class="klb-product">
    <div v-if="products && displayType == 'subs'" class="subs">
      <div
        v-for="product in products?.data.data"
        :key="product.Catalog_Product__"
        class="card-container card-defaults"
      >
        <div>
          <h5>{{ product['Basic.Name'] }}</h5>
          <div class="price">
            <span class="price">{{ product.Price.display }}</span>
            <span class="cycle" v-if="product['Basic.ServiceLifetime']"
              >/{{
                $formatKlbRecurringPaymentCycle(
                  product['Basic.ServiceLifetime']
                )
              }}</span
            >
          </div>
          <img
            v-if="
              product.Image &&
              product.Image.list &&
              product.Image.list.length > 0 &&
              product.Image.list[0].Variation?.subs
            "
            :src="product.Image.list[0].Variation?.subs"
            class="product-image"
          />

          <ul role="list">
            <slot :name="product.Catalog_Product__" />
          </ul>
          <button
            @click="addProductToCart(product.Catalog_Product__)"
            class="btn primary"
          >
            {{ $t('klb_catalog_choose_plan') }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="products && displayType == 'shop'" class="shop">
      <div
        v-for="product in products?.data.data"
        :key="product.Catalog_Product__"
        class="card-container card-defaults"
      >
        <img
          v-if="
            product.Image &&
            product.Image.list &&
            product.Image.list.length > 0 &&
            product.Image.list[0].Variation?.shop
          "
          :src="product.Image.list[0].Variation?.shop"
          class="product-image"
        />
        <div class="inside">
          <h5>{{ product['Basic.Name'] }}</h5>
          <slot :name="product.Catalog_Product__" />
          <div class="price-btn">
            <span
              >{{ product.Price.display }}
              <span class="cycle" v-if="product['Basic.ServiceLifetime']"
                >/{{
                  $formatKlbRecurringPaymentCycle(
                    product['Basic.ServiceLifetime']
                  )
                }}</span
              ></span
            >
            <button
              class="btn primary btn-defaults"
              @click="addProductToCart(product.Catalog_Product__)"
            >
              {{ $t('klb_catalog_add_to_cart') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
