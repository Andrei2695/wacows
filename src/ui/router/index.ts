import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/ui/stores'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/ui/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('@/ui/views/Home/HomeView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'inicio',
        component: () => import('@/ui/views/InicioView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'animales/lista',
        name: 'animales',
        component: () => import('@/ui/views/Animals/AnimalsView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'animales/addedit',
        name: 'animales/addedit',
        component: () => import('@/ui/views/Animals/AddUpdateAnimalsView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'lots/lista',
        name: 'lots',
        component: () => import('@/ui/views/Lots/LotsView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const sessionStore = useSessionStore()
  if (!sessionStore.session) {
    sessionStore.loadSession()
  }
  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && sessionStore.isAuthenticated) {
    next({ name: 'inicio' })
  } else {
    next()
  }
})

export default router
