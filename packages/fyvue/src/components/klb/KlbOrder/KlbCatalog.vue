<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ObjectS2Any } from '../../../dts';
import type { KlbAPICatalog } from '../../../dts/klb';
import { rest } from '../../../utils/rest';
const products = ref<KlbAPICatalog>();
const props = withDefaults(
  defineProps<{
    options?: ObjectS2Any;
    displayType?: string;
    features?: string[];
    startOrderPath?: string;
  }>(),
  {
    options: (): ObjectS2Any => {
      return { sort: 'Basic.Priority:asc' };
    },
    displayType: 'subs',
    features: () => [],
    startOrderPath: '/user/order/start',
  }
);
onMounted(async () => {
  const _products = await rest<KlbAPICatalog>(
    '/Catalog/Product:search',
    'GET',
    {
      ...props.options,
      image_variation: [
        'scale_crop=320x160&format=png&alias=shop',
        'scale_crop=320x120&format=png&alias=subs',
      ],
    }
  ).catch(() => {});
  if (_products && _products.result == 'success') {
    products.value = _products;
  }
});
</script>
<template>
  <div class="klb-product">
    <div v-if="products && displayType == 'subs'" class="subs">
      <div
        v-for="product in products?.data.data"
        :key="product.Catalog_Product__"
        class="card"
      >
        <div>
          <h5>{{ product['Basic.Name'] }}</h5>
          <div class="price">
            <span class="price">{{ product.Price.display }}</span>
            <span class="cycle"
              >/{{
                $formatKlbRecurringPaymentCycle(
                  product['Basic.ServiceLifetime']
                )
              }}</span
            >
          </div>
          <img
            v-if="
              product.Image.list.length > 0 &&
              product.Image.list[0].Variation?.subs
            "
            :src="product.Image.list[0].Variation?.subs"
            class="product-image"
          />

          <ul role="list">
            <slot :name="product.Catalog_Product__" />
          </ul>
          <router-link
            :to="`${startOrderPath}?Catalog_Product__=${product.Catalog_Product__}`"
            class="btn primary"
          >
            {{ $t('klb_catalog_choose_plan') }}
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="products && displayType == 'shop'" class="shop">
      <div
        v-for="product in products?.data.data"
        :key="product.Catalog_Product__"
        class="card"
      >
        <img
          v-if="
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
              <span class="cycle"
                >/{{
                  $formatKlbRecurringPaymentCycle(
                    product['Basic.ServiceLifetime']
                  )
                }}</span
              ></span
            >
            <button class="btn primary btn-defaults">
              {{ $t('klb_catalog_add_to_cart') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
