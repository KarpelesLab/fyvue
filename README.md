# fyvue
Vue lib for KLB systems (Doc soon™)

```
import fyvue from "@karpeleslab/fyvue";
app.use(fyvue)
```
## Global components
- FyLoader (Global page loader, ```$eventBus.emit('loader', 'True|False')```)
- FyModal (Global Modal)
- FyDatatable (Global Datatable)
- FyConfirm (Confirm Modal, ```$eventBus.emit("showConfirm", { title: 'title', desc: 'desc'), onConfirm: callback()});```)
- FyBreadcrumb (Breadcrumb builder)
- FyNotif (Global notifications component, include in base layout, ```notify({group: "default", title: 'title', text: 'text',}, 4000 );```)
- FyInput (Input component with vuevalidate)
- FyPaging (Paging component)

## KLB components
- AccountUpdatePwd (Update user password)
- AccountUpdateEmail (Update user email)
- BillingUpdatePayment (Update user payment method)
- BillingAddressSingle  (Update user address (linked to billing profile))
- BillingProfileCreate (Create user billing profile)
- PasswordLost (Handle password lost from userflow @todo: redo this)
- SignInSignUp (Handle user sign-in/sign-up)
