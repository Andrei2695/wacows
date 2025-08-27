import { createApp } from 'vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Eye,
  EyeOff,
  LogOut,
  Home,
  BrickWall,
  Tractor,
  Truck,
  Plus,
  Droplet,
  Pencil,
  Trash2,
  BadgeCheck,
  Badge,
  MapPinXInside,
  FileHeart,
} from 'lucide-vue-next'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import '@/ui/assets/custom.scss'
import '@/ui/assets/styles.css'
import router from '@/ui/router/index'
import { pinia } from '@/ui/stores'
import App from '@/App.vue'

const app = createApp(App)

app.component('EasyDataTable', Vue3EasyDataTable)
app.component('IconEye', Eye)
app.component('IconEyeOff', EyeOff)
app.component('IconLogOut', LogOut)
app.component('IconHome', Home)
app.component('IconBrickWall', BrickWall)
app.component('IconTractor', Tractor)
app.component('IconTruck', Truck)
app.component('IconPlus', Plus)
app.component('IconDroplet', Droplet)
app.component('IconPencil', Pencil)
app.component('IconTrash', Trash2)
app.component('IconBadgeCheck', BadgeCheck)
app.component('IconBadge', Badge)
app.component('IconMapPinXInside', MapPinXInside)
app.component('IconFileHeart', FileHeart)

app.use(router)
app.use(pinia)

app.mount('#app')
