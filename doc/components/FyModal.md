# FyModal

![alt text](/components/FyModal.png)

## Usage

In Vue template:

```vue
<div class="w-24 light">
   <FyModal id="Test" title="Hey Title">
    <p>Hey</p>
   </FyModal>

   <button @click="$eventBus.emit('TestModal', true)">Open TestModal</button>
   <button @click="$eventBus.emit('TestModal', true)">Close TestModal</button>
   <button @click="customMethod()">Close after 5 seconds</button>
</div>
```

In scripts:

```ts
import { useEventBus } from "@karpeleslab/fyvue"
const eventBus = useEventBus()
const customMethod = () => {
  eventBus.emit('TestModal', true)
  setTimeout(() => { eventBus.emit('TestModal', false) }, 5000)
}
```

or with standard API:

```ts
export default {
  //...
  methods: {
    customMethod() {
      this.$eventBus.emit('TestModal', true);
      setTimeout(() => { this.$eventBus.emit('TestModal', false) }, 5000)
    }
  }
}
```

## Props

| Name | Type  | default | Info |
|---|---|---|---|
| id | String | CustomModal | Will be used for event names |
| title | String | ```""``` | Modal title (optional) |
| onOpen | Function | ```()=>{}``` | On open callback |
| onClose | Function | ```()=>{}``` | On close callback |
| closeIcon | Object | ```XCircleIcon``` | Close icon component |

## Details

### CSS

@[code sass](../../src/components/ui/FyModal/FyModal.scss)

### Code

@[code vue](../../src/components/ui/FyModal/FyModal.vue)
