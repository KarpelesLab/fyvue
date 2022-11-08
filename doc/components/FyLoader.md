# FyLoader

<details>
  <summary>Preview</summary>

  ![FyLoader](/components/FyLoader.png)
</details>

[[toc]]

## Usage

@[code vue](../../playground/src/components/TFyLoader.vue)

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| id? | string | undefined | Use has ID to call the loader with ```eventBus``` |
| loader? | Object | ```DefaultLoader``` | Loader component ([check source for DefaultLoader](#defaultloader-vue)) |
| size? | string | 16 | css property in ```rem``` passed to the loader component |
| showLoadingText? | boolean | true | Passed to the loader component |


## Details

### CSS

@[code sass](../../src/components/ui/FyLoader/FyLoader.scss)

### Code

#### FyLoader.vue
@[code vue](../../src/components/ui/FyLoader/FyLoader.vue)

#### DefaultLoader.vue
@[code vue](../../src/components/ui/FyLoader/DefaultLoader.vue)
