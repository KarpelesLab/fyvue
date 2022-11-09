# FyModal

<details>
  <summary>Preview</summary>

  ![FyModal](/components/FyModal.png)
</details>

[[toc]]

## Usage

@[code vue](../../playground/src/components/TFyModal.vue)


## Props

| Name | Type  | default | Info |
|---|---|---|---|
| id | string | - | Will be used for event names |
| title? | string | ```""``` | Modal title (optional) |
| onOpen? | Function | undefined | On open callback |
| onClose? | Function | undefined | On close callback |
| closeIcon? | Object | ```XCircleIcon``` | Close icon component |

## Details

### CSS

@[code sass](../../src/components/ui/FyModal/FyModal.scss)

### Code

@[code vue](../../src/components/ui/FyModal/FyModal.vue)
