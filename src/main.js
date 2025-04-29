import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import router from './router'
import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    // something vue-i18n options here ...
})

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
})

app.use(createPinia())
// app.use(router)

app.use(i18n)

app.use(vuetify)
app.mount('#app')
