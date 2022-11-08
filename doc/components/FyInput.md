# FyInput

<details>
  <summary>Preview</summary>

  ![FyTable](/components/FyInput.png)
</details>

**Note:** FyInput & FyBaseInput are almost similar but FyInput use vuevalidate model as ```props.modelValue``` instead of a simple reference or reactive property.

[[toc]]

## Usage
This example will live check user inputs and returns errors visually.
@[code vue](../../playground/src/components/TFyInput.vue)

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| id? | String | undefined | used for input ID & "for" on \<label /> |
| showLabel? | Boolean | true | Show input label |
| label? | String | undefined | Label text |
| type | String | text | Input type (checkbox,textarea,email,text,etc...) |
| placeholder? | String | undefined | Input placeholder text  |
| autocomplete? | String | undefined | HTML autocomplete attribute  |
| checkboxTrueValue? | String | on | true value on checkbox |
| checkboxFalseValue? | String | off | false value on checkbox |
| req? | Boolean | false | is field required? |
| help? | String | undefined | Help text displayed below the input |
| linkIcon? | String | undefined | Link added after the label (usefull for terms & conditions for exemple) |
| modelValue | any | null | reference to your input value (check usage) |
| options? | Array<string[]> | [] | List for options for select formatted as follows: [['key','value'], etc...] (check usage) |



## Details

### CSS

@[code sass](../../src/components/ui/FyInput/FyInput.scss)

### Code

#### FyInput.vue
@[code vue](../../src/components/ui/FyInput/FyInput.vue)
