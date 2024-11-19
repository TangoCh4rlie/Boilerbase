import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/profile',
      component: () => import('@/views/ProfileView.vue'),
      beforeEnter: (to, from, next) => {
        const { user } = useAuthStore()
        if (user) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/boilerplate/:name',
      component: () => import('@/views/boilerplate/BoilerplateView.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/github/callback',
      component: () => import('@/views/login/CallbackView.vue')
    },
    {
      path: '/new',
      component: () => import('@/views/boilerplate/NewBoilerplateView.vue'),
      beforeEnter: (to, from, next) => {
        const { user } = useAuthStore()
        if (user) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ],
})

export default router
