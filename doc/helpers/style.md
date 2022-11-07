# Styling Fyvue

You can choose to use Fyvue's default styles, they use **[tailwindcss](https://tailwindcss.com/docs/guides/vite)** and support a base dark and light theme.

```sass
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "@karpeleslab/fyvue/fyvue.scss";

// You can override default styles here.
```

To customize the components, you can simply change tailwind bindings for fv-primary and fv-neutral, override the classes or use your own CSS and not include ```fyvue.scss```.

## TailwindCSS colors

### fv-primary

<div style="display: flex">
<div v-for='color in { "50": "#f5f3ff","100": "#ede9fe", "200": "#ddd6fe", "300": "#c4b5fd", "400": "#a78bfa", "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9", "800": "#5b21b6","900": "#4c1d95" }' :key="color" style="width: 4rem; height: 4rem; text-align: center; font-size: .8rem;"><div :style="`width: 100%; height: 2rem;background-color:${color}`"></div>{{ color }}</div>
</div>

### fv-neutral

<div style="display: flex">
<div v-for='color in {
    "50": "#f8fafc",
    "100": "#f1f5f9",
    "200": "#e2e8f0",
    "300": "#cbd5e1",
    "400": "#94a3b8",
    "500": "#64748b",
    "600": "#475569",
    "700": "#334155",
    "800": "#1e293b",
    "900": "#0f172a"
  }' :key="color" style="width: 4rem; height: 4rem; text-align: center; font-size: .8rem;"><div :style="`width: 100%; height: 2rem;background-color:${color}`"></div>{{ color }}</div>
</div>

You can override them by simply changing your ```tailwind.config```, for example:
```js
const colors = require('tailwindcss/colors')

module.exports = {
  //...
  theme: {
    extend: {
      colors: {
        "fv-primary": colors.emerald,
        "fv-neutral": {
          "50": "#f5f3ff",
          "100": "#ede9fe",
          "200": "#ddd6fe",
          "300": "#c4b5fd",
          "400": "#a78bfa",
          "500": "#8b5cf6",
          "600": "#7c3aed",
          "700": "#6d28d9",
          "800": "#5b21b6",
          "900": "#4c1d95"
        }
      }
    },
  },
  //...
}
```
