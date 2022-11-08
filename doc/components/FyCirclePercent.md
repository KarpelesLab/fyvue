# FyCirclePercent

<details>
  <summary>Preview</summary>

  ![FyCirclePercent](/components/FyCirclePercent.png)
</details>

[[toc]]

## Usage

```vue
<div class="w-24 light">
  <FyCirclePercent :percent="60" color="red" />
</div>
```

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| percent | number | 100 | Current Percent |
| textXY? | Array\<number\> | [18, 20.85] | Percent Text position in SVG |
| color? | string | blue | Fill color (compatbile with svg stroke="") |

## Details

### CSS

@[code sass](../../src/components/ui/FyCirclePercent/FyCirclePercent.scss)

### Code

@[code vue](../../src/components/ui/FyCirclePercent/FyCirclePercent.vue)
