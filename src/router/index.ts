import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Callback from '@/views/login/CallbackView.vue'
import Login from '@/views/login/LoginView.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
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
      path: '/search',
      component: () => import('@/views/SearchView.vue')
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
      component: () => import('@/views/NewBoilerplateView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ],
})

export default router
