# KLB i18next
You will need to import **i18nextPromise** from **@karpeleslab/fyvue** and await it in the setup context. This require the use of **[\<Suspense>](https://vuejs.org/guide/built-ins/suspense.html)**. With SSR this await will be invisible for the client.

@[code{1-4} vue](../../playground/src/App.vue)

## Use i18next
You can use **useTranslation** for composition API or **this.$t** for the standard API.
@[code vue](../../playground/src/components/Ti18n.vue)


## CSVs
### fyvue.csv
@[code csv](../../playground/etc/i18n/fyvue.csv)
