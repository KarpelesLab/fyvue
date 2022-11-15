<template>
    <div class="fv-typo">
      <h1>Klb SSR &gt; Router</h1>
      <p><b>fyvue</b> provides a
        <a href="https://router.vuejs.org/" target="_blank">vue-router</a> wrapper with an internal pinia store, this way you can add statusCode or redirect directly.</p>
      <FvHL><pre>// composition API
import { useHistory } from '@karpeleslab/fyvue';
useHistory().status = 404;
// or
useHistory().push('/login', 302)
// etc...</pre></FvHL>
</div>
</template>
