# FyBreadcrumb

<details>
  <summary>Preview</summary>

  ![FyBreadcrumb](/components/FyBreadcrumb.png)
</details>

[[toc]]

## Usage

```vue
<FyBreadcrumb
  :nav="[
    { name: 'breadcrumb_dashboard', to: '/dashboard' },
    { name: 'breadcrumb_account', to: '/dashboard/acccount' },
    { name: 'breadcrumb_billing' },
  ]"
/>
```

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| nav | Array\<FyVueBreadcrumb> | [] | Array of links <br />```[{ name: i18n_key, to?:'/xxx' }]``` |
| maxLength? | number | 15 | Max length for name of link |

## Details

### CSS

@[code sass](../../src/components/ui/FyBreadcrumb/FyBreadcrumb.scss)

### Code

@[code vue](../../src/components/ui/FyBreadcrumb/FyBreadcrumb.vue)
