import { createApp } from 'vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Eye, EyeOff, LogOut, Home, BrickWall, Tractor, Truck } from 'lucide-vue-next'

import '@/ui/assets/styles.css'
import router from '@/ui/router/index'
import { pinia } from '@/ui/stores'

import App from '@/App.vue'

const app = createApp(App)

app.component('Eye', Eye)
app.component('EyeOff', EyeOff)
app.component('LogOut', LogOut)
app.component('Home', Home)
app.component('BrickWall', BrickWall)
app.component('Tractor', Tractor)
app.component('Truck', Truck)

app.use(router)
app.use(pinia)

app.mount('#app')
