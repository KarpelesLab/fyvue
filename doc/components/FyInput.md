# FyInput

<details>
  <summary>Preview</summary>

  ![FyTable](/components/FyInput.png)
</details>

**Note:** FyInput & FyBaseInput are almost similar but FyInput use vuevalidate model as ```props.modelValue``` instead of a simple reference or reactive property.

[[toc]]

## Usage
### Vuelidate
@[code vue](../../playground/src/components/TFyInput.vue)

### Just FyInput
@[code vue](../../playground/src/components/TFyInputBase.vue)

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| id | String | - | used for input ID & "for" on \<label /> |
| showLabel? | Boolean | true | Show input label |
| label? | String | undefined | Label text |
| type | "text"<br />"password"<br />"email"<br />"checkbox"<br />"select"<br />"textarea  | text | Input type (check type to see currently supported) |
| placeholder? | String | undefined | Input placeholder text  |
| autocomplete? | String | undefined | HTML autocomplete attribute  |
| checkboxTrueValue? | String | on | true value on checkbox |
| checkboxFalseValue? | String | off | false value on checkbox |
| req? | Boolean | false | is field required? |
| help? | String | undefined | Help text displayed below the input |
| error? | ErrorObject[] | undefined | Error for usage with Vuelidate instead of string |
| errorVuelidate? | String | undefined | Error text displayed below the input |
| linkIcon? | String | undefined | Link added after the label (usefull for terms & conditions for exemple) |
| modelValue? |  string<br />number<br />string[]<br />undefined  | null | reference to your input value (check usage) |
| checkboxValue? |  any[]<br />Set\<any><br />undefined<br />boolean  | null | reference to your input value (check usage) |
| options? | Array<string[]> | [] | List for options for select formatted as follows: [['key','value'], etc...] (check usage) |

## Details

### CSS

@[code sass](../../src/components/ui/FyInput/FyInput.scss)

### Code

#### FyInput.vue
@[code vue](../../src/components/ui/FyInput/FyInput.vue)

