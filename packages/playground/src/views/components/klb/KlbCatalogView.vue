<script setup>
import { CheckBadgeIcon, StarIcon } from '@heroicons/vue/24/solid';
const fvComponent = `<div class="fv-typo text-center"><h2>DisplayType: subs</h2></div>
<div>
  <KlbCatalog
    :options="{ sort: 'Basic.Priority:asc' }"
    displayType="subs"
  >
    <template #cpr-njapte-ir6z-ewpn-2jw5-gnwk4ghy>
      <li><CheckBadgeIcon /> <span>My Super feature</span></li>
      <li class="disabled">
        <CheckBadgeIcon /> <span>My Super feature 2</span>
      </li>
      <li class="disabled">
        <CheckBadgeIcon /> <span>My Super feature 3</span>
      </li>
    </template>
    <template #cpr-phkom6-ib7v-bsbg-t72a-sjlzvrya>
      <li><CheckBadgeIcon /> <span>My Super feature</span></li>
      <li><CheckBadgeIcon /> <span>My Super feature 2</span></li>
      <li><CheckBadgeIcon /> <span>My Super feature 3</span></li>
    </template>
  </KlbCatalog>
</div>
<div class="fv-typo text-center mt-4"><h2>DisplayType: shop</h2></div>
<div>
  <KlbCatalog
    :options="{ sort: 'Basic.Priority:asc' }"
    displayType="shop"
  >
    <template #cpr-njapte-ir6z-ewpn-2jw5-gnwk4ghy>
      <div class="fv-typo">
        <p>Mon super product, you should definitivly buy.</p>
      </div>
    </template>
    <template #cpr-phkom6-ib7v-bsbg-t72a-sjlzvrya>
      <div class="fv-typo">
        <p>An other super product.</p>
      </div>
      <div class="rating">
        <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
        <span>5.0</span>
      </div>
    </template>
  </KlbCatalog>
</div>
`;

const props = [
  {
    name: 'options',
    type: '{}',
    info: 'Options for Product:search',
    def: "{ sort: 'Basic.Priority:asc' }",
  },
  {
    name: 'displayType?',
    type: '"subs"|"shop"',
    info: 'Display type',
    def: 'subs',
  },
  {
    name: 'startOrderPath?',
    type: 'string',
    info: 'Path to start an order',
    def: '/user/order/start',
  },
];
</script>
<template>
  <FyDocPreview :component="fvComponent" :props="props">
    <template #component>
      <div class="fv-typo text-center"><h2>DisplayType: subs</h2></div>
      <div>
        <KlbCatalog
          :options="{ sort: 'Basic.Priority:asc' }"
          displayType="subs"
          startOrderPath="/components/klb/KlbOrder"
        >
          <template #cpr-phkom6-ib7v-bsbg-t72a-sjlzvrya>
            <li><CheckBadgeIcon /> <span>My Super feature</span></li>
            <li class="disabled">
              <CheckBadgeIcon /> <span>My Super feature 2</span>
            </li>
            <li class="disabled">
              <CheckBadgeIcon /> <span>My Super feature 3</span>
            </li>
          </template>
          <template #cpr-njapte-ir6z-ewpn-2jw5-gnwk4ghy>
            <li><CheckBadgeIcon /> <span>My Super feature</span></li>
            <li><CheckBadgeIcon /> <span>My Super feature 2</span></li>
            <li><CheckBadgeIcon /> <span>My Super feature 3</span></li>
          </template>
        </KlbCatalog>
      </div>
      <div class="fv-typo text-center mt-4"><h2>DisplayType: shop</h2></div>
      <div>
        <KlbCatalog
          :options="{ sort: 'Basic.Priority:asc' }"
          displayType="shop"
          startOrderPath="/components/klb/KlbOrder"
        >
          <template #cpr-phkom6-ib7v-bsbg-t72a-sjlzvrya>
            <div class="fv-typo">
              <p>Mon super product, you should definitivly buy.</p>
            </div>
          </template>
          <template #cpr-njapte-ir6z-ewpn-2jw5-gnwk4ghy>
            <div class="fv-typo">
              <p>An other super product.</p>
            </div>
            <div class="rating">
              <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              <span>5.0</span>
            </div>
          </template>
        </KlbCatalog>
      </div>
    </template>
  </FyDocPreview>
</template>
