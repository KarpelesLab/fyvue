<script setup>
const fvComponent = `
<template>
  <FyNavbar
        title="fyvue"
        :links="[
          { to: '/', name: 'Getting Started' },
          {
            to: '#',
            name: 'SSR',
            childrens: [
              { to: '/ssr', name: 'Getting Started' },
              { to: '/ssr/rest', name: 'Rest' },
              { to: '/ssr/router', name: 'Router' },
            ],
          },
          { to: '/contact', name: 'Contact' },
        ]"
      >
        <template v-slot:logo>
          <img src="@/assets/fyvue.svg" class="h-10" />
        </template>
        <template v-slot:custom
          ><div
            class="hidden md:block text-xs text-fv-neutral-500 dark:text-fv-neutral-300"
          >
            Anything you want &#127925;
          </div>
        </template>
      </FyNavbar>
</template>
`;

const props = [
  {
    name: 'title?',
    type: 'string',
    info: 'Site name',
  },
  {
    name: 'showTitle?',
    type: 'boolean',
    info: 'Show site name',
  },
  {
    name: 'darkLight?',
    type: 'boolean',
    info: 'Add a switch dark/light theme button',
    def: 'true',
  },
  {
    name: 'loginPath?',
    type: 'string',
    info: 'Login URL for default button',
    def: '/login',
  },
  {
    name: 'accountPath?',
    type: 'string',
    info: 'Account/User dashboard URL from default button',
    def: '/user',
  },
  {
    name: 'showDashboardLink?',
    type: 'boolean',
    info: 'Show default Dashboard button',
    def: 'true',
  },
];

const slots = [
  {
    name: 'buttons',
    info: 'Slot for buttons like login/sign up, etc...',
  },
  {
    name: 'logo',
    info: 'Slot the logo image or text',
  },
  {
    name: 'custom',
    info: 'Slot between nav links and buttons, for search inputs for example',
  },
];
</script>
<template>
  <div class="fv-typo mb-2">
    <h1>FyNavbar</h1>
    <p>
      Note if you're using the "buttons" slot the following props are ignored:
      loginPath, accountPath, showDashboardLink.
    </p>
  </div>

  <FyDocPreview :component="fvComponent" :props="props" :slots="slots">
    <template #component>
      <FyNavbar
        title="fyvue"
        :links="[
          { to: '/', name: 'Getting Started' },
          {
            to: '#',
            name: 'SSR',
            childrens: [
              { to: '/ssr', name: 'Getting Started' },
              { to: '/ssr/rest', name: 'Rest' },
              { to: '/ssr/router', name: 'Router' },
            ],
          },
          { to: '/contact', name: 'Contact' },
        ]"
      >
        <template v-slot:buttons>
          <router-link to="/login" class="btn primary btn-defaults"
            >Login</router-link
          >
        </template>
        <template v-slot:logo>
          <img src="@/assets/fyvue.svg" class="h-10" />
        </template>
        <template v-slot:custom
          ><div
            class="hidden md:block mr-4 text-xs text-fv-neutral-500 dark:text-fv-neutral-300"
          >
            Anything you want &#127925;
          </div>
        </template>
      </FyNavbar>
    </template>
  </FyDocPreview>
</template>
