<template>
  <div class="fv-typo mb-2">
    <h3>Params</h3>
    <p>
      <b>OnMount</b> (boolean, defaulted to <b>true</b>) if you set it to false
      it will call <b>User:get</b> in the <b>setup</b> context, witch means it
      will be done on the <b>SSR</b> side if you have SSR enabled.
    </p>
    <h3>Example</h3>
    <p>(In setup context, in your root template)</p>
    <!-- prettier-ignore --><FvHL><pre>import { useUserCheck } from "@karpeleslab/fyvue";
useUserCheck()</pre></FvHL>
    <h3>Usage</h3>
    Just add a <b>reqLogin</b> meta on the routes you want to protect, for
    example:
    <!-- prettier-ignore --><FvHL><pre>{
  path: "/user",
  component: () => import("@/layouts/dashboardLayout.vue"),
  meta: {
    reqLogin: true,
  },
  children: [
    //...
  ]
}</pre></FvHL>
  </div>
</template>
