# FyTable

<details>
  <summary>Preview</summary>

  ![FyTable](/components/FyTable.png)
</details>

Note **\<FyTable>** and **\<FyTable>** are almost similar except for their behavior on small resolutions. **\<FyTable>** will just add a scrolling on x and **\<FyTable>** will change the layout and use divs/flexbox instead of a table.
[[toc]]

## Usage

@[code vue](../../playground/src/components/TFyTable.vue)

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| headers | FyDatatableHeader | - | Object.key is the property name and Object.value is the label of the header <br /> ```{ User_: $t('header_uuuid') }``` |
| data? | Array\<FyDatatableValue> | [] | Check usage. |
| showHeaders? | Boolean | true | Show table headers |

### FyDatatable[Value/Headers]

```ts
export interface FyDatatableHeader {
  [key:string] : string;
}
export interface FyDatatableValue {
  [key:string]: any;
}
```

## Details

### Code

@[code vue](../../src/components/ui/FyTable/FyTable.vue)
