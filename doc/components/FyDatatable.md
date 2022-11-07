# FyDatatable
![FyDatatable](/components/FyDatatable.png)
<br />
Note **\<FyTable>** and **\<FyDatatable>** are almost similar except for their behavior on small resolutions. **\<FyTable>** will just add a scrolling on x and **\<FyDatatable>** will change the layout and use divs/flexbox instead of a table.
[[toc]]

## Usage

@[code vue](../../playground/src/components/TFyDatatable.vue)

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| headers | Object | {} | Object.key is the property name and Object.value is the label of the header <br /> ```{ User_: $t('header_uuuid') }``` |
| data | Array\<FyDatatableValue> | [] | Check usage. |
| showHeaders | Boolean | true | Show table headers |

## Details

### CSS

@[code sass](../../src/components/ui/FyDatatable/FyDatatable.scss)

### Code

@[code vue](../../src/components/ui/FyDatatable/FyDatatable.vue)
