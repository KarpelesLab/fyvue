# FyLoader
![FyLoader](/components/FyLoader.png)

[[toc]]

## Usage

@[code vue](../../playground/src/components/TFyLoader.vue)

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| id | String | null | Use has ID to call the loader with ```eventBus``` |
| loader | Object | ```DefaultLoader``` | Loader component ([check source for DefaultLoader](#defaultloader-vue)) |
| size | String | 16 | css property in ```rem``` passed to the loader component |
| showLoadingText | Boolean | true | Passed to the loader component |


## Details

### CSS

@[code sass](../../src/components/ui/FyLoader/FyLoader.scss)

### Code

#### FyLoader.vue
@[code vue](../../src/components/ui/FyLoader/FyLoader.vue)

#### DefaultLoader.vue
@[code vue](../../src/components/ui/FyLoader/DefaultLoader.vue)
