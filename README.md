# fyvue
Vue lib for KLB systems (Doc soon™)

    import { createFyvue } from "@karpeleslab/fyvue";
    import { createApp } from "vue";
    const app = createApp(App);
    const fyvue = createFyvue();
    app.use(fyvue);
    ...

# Helpers
### EventBus
Shortcut to **[mitt](https://github.com/developit/mitt)** (event emitter / pubsub)

#### Composition API
    import { useEventBus } from "@karpeleslab/fyvue" 
    const eventBus = useEventBus();
    eventBus.emit('xxx',()=>{});
    eventBus.on('xxx',()=>{});
#### Standard API
    this.$eventBus.emit('xxx',()=>{});
    this.$eventBus.on('xxx'),()=>{});


# Global components
#### FyBreadcrumb
![enter image description here](https://imgur.com/kfCjKA4.png)

Standard breadcrumb generator.
##### Example:
`<FyBreadcrumb :nav="[{ name: $t('breadcrumb_dashboard'), to: '/' }, {name: $t('breadcrumb_backups')}]" />` 
*Last entry should never have a **to** property, indicating the current path.*

#### FyConfirm
Confirm modal for important use actions. `<FyConfirm />` should be included in your root template.
##### Example:
`eventBus.emit("showConfirm", { title: 'title', desc: 'desc', onConfirm: async () => {}})` 

#### FyInput
Generate an input with *[Vuevalidate](https://vuelidate-next.netlify.app/)*, handles errors and helpers. 
###### Example:
    <FyInput
    	  id="Firstname"
    	  :req="true"
    	  :showLabel="true"
    	  :placeholder="$t('billing_create_firstname_placeholder')"
    	  :validate="v$.firstname"
    	  :label="$t('billing_create_firstname_label')"
    	  :help="$t('billing_create_firstname_help_input')"
    />

#### FyLoader
Loader. `<FyLoader />` should be included in your root template.
##### Example:
    eventBus.emit("loader", true)
    eventBus.emit("loader", false)`

#### FyPaging
![enter image description here](https://imgur.com/fbEkrwe.png)

Generate pagination from standard Klb paging object.
##### Example:
Template:

    <FyPaging id="users":items="{"page_no":1,"count":"674","page_max":34,"results_per_page":20}" />

JS:

    eventBus.on('usersGoToPage',(page)=>{});

#### FySteps
![enter image description here](https://imgur.com/SUIfqXC.png)

Generate steps (x of total)
##### Example
    <FySteps
      :steps="[
        { name: 'steps_offer', icon: 'ri-file-list-line' },
        { name: 'steps_address', icon: 'ri-map-pin-line' },
        { name: 'steps_payment', icon: 'ri-secure-payment-fill' },
      ]"
      :currentStep="1"
    />
    
#### FyModal
Create a modal with custom content.
##### Example:
Template (optional properties: onClose & onOpen)

    <FyModal id="passwordLost" title="Recover Password" :onClose="()=>{}">
    	HTML CONTENT
    </FyModal>

 JS:

     eventBus.emit('passwordLostModal',true);
     eventBus.emit('passwordLostModal',false);

#### FyDatatable
![enter image description here](https://imgur.com/09gQsxF.png)

Generate a responsive table from an array of objects. All properties will be displayed as standard text but every cell can be customized with `<template v-slot:{{ROW_NAME}}_item="property"></template>`.

##### Example:
    <FyDatatable
      v-model:data="paymentHistory"
      :headers="{
        Invoice_Number: $t('billing_history_headers_invoice_number'),
        Invoice_Date: $t('billing_history_headers_created'),
        Paid: $t('billing_history_headers_paid'),
        Status: $t('billing_history_headers_status'),
        Total: $t('billing_history_headers_price'),
        Actions: $t('billing_history_headers_actions'),
      }"
    >
      <template v-slot:Actions_item="property">
        <a
          :href="property.data.item.Invoice_Url"
          target="_blank"
          class="btn neutral p-2"
        >
          Download PDF
        </a>
      </template>
    </FyDatatable>
        
        
## KLB components (Doc soon™)
- AccountUpdatePwd (Update user password)
- AccountUpdateEmail (Update user email)
- BillingUpdatePayment (Update user payment method)
- BillingAddressSingle  (Update user address (linked to billing profile))
- BillingProfileCreate (Create user billing profile)
- PasswordLost (Handle password lost from userflow @todo: redo this)
- SignInSignUp (Handle user sign-in/sign-up)
