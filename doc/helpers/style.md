# Styling Fyvue

You can choose to use Fyvue's default styles, they use **[tailwindcss](https://tailwindcss.com/docs/guides/vite)** and support a base dark and light theme.

```sass
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "@karpeleslab/fyvue/fyvue.scss";
```

To customize the components, you can simply override the classes or use your own CSS and not include ```fyvue.scss```.
