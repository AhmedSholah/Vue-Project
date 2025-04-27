import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    // something vue-i18n options here ...
})

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(createPinia())
// app.use(router)

app.use(i18n)

const vuetify = createVuetify({
    components,
    directives,
})

app.use(vuetify)

app.mount('#app')
