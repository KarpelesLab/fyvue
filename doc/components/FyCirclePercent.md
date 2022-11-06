# FyCirclePercent
![FyCirclePercent](/components/FyCirclePercent.png)

## Usage

```vue
<div class="w-24 light">
  <FyCirclePercent :percent="60" color="red" />
</div>
```

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| percent | Number | 100 | Current Percent |
| textXY | Array\<Number\> | [18, 20.85] | Percent Text position in SVG |
| color | String | blue | Fill color (compatbile with svg stroke="") |

## Details

### CSS

@[code scss](../../../src/components/ui/FyCirclePercent/FyCirclePercent.scss)

### Code

@[code vue](../../../src/components/ui/FyCirclePercent/FyCirclePercent.vue)
