<template>
  <div class="fv-typo">
    <h1>Klb SSR &gt; Rest</h1>
    <p>
      When we're using SSR we don't want to call the API on the server side and
      on the client side. To prevent this behaviour <small>(bad Vue)</small>
      <b>fyvue</b> provide a
      <a
        href="https://github.com/KarpelesLab/klbfw#restapi-method-params-context"
        target="_blank"
        >Rest</a
      >
      wrapper.
    </p>
    <!-- prettier-ignore --><FvHL><pre>import { rest } from '@karpeleslab/fyvue'; // now
// import { rest } from '@karpeleslab/klbfw'</pre></FvHL>
    <p>
      The API remains exactly the same. Internally, "fyvue's rest" uses a pinia
      store to index rest results performed in the
      <a
        href="https://vuejs.org/api/sfc-script-setup.html#script-setup"
        target="_blank"
        >setup</a
      >
      context, It is then passed to the client via FW.initial.
    </p>
  </div>
</template>
