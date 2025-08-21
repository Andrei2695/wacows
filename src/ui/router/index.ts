import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/ui/views/LoginView.vue'
import HomeView from '@/ui/views/Home/HomeView.vue'

import { useSessionStore } from '@/ui/stores'

const routes = [
  { path: '/login', name: 'Login', component: LoginView, meta: { requiresAuth: false } },
  {
    path: '/',
    component: HomeView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'inicio',
        component: () => import('@/ui/views/InicioView.vue'),
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
  if (!sessionStore.session?.token) {
    await sessionStore.cleanSession()
  }

  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && sessionStore.isAuthenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
