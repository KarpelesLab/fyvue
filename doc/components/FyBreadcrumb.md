# FyBreadcrumb
![FyBreadcrumb](/components/FyBreadcrumb.png)
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

## Details

### CSS

@[code sass](../../src/components/ui/FyBreadcrumb/FyBreadcrumb.scss)

### Code

@[code vue](../../src/components/ui/FyBreadcrumb/FyBreadcrumb.vue)
