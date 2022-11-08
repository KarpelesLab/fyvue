# FyPaging

<details>
  <summary>Preview</summary>

  ![FyPaging](/components/FyPaging.png)
</details>

[[toc]]

## Usage

@[code vue](../../playground/src/components/TFyPaging.vue)

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| items | KLBPaging | KLBPaging | KLBPaging API format* |
| id | string | null | use for events when changing page |

### KLB Paging
```ts
interface KLBPaging {
  page_no: number;
  results_per_page: number;
  page_max: 1;
  page_max_relation: string;
  count: number;
}
```

## Details

### CSS

@[code sass](../../src/components/ui/FyPaging/FyPaging.scss)

### Code

#### FyPaging.vue
@[code vue](../../src/components/ui/FyPaging/FyPaging.vue)
