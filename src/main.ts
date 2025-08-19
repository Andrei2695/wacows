import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import '@/ui/assets/styles.css'
import router from '@/ui/router/index'
import { pinia } from '@/ui/stores'

import App from '@/App.vue'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
