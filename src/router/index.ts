import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Callback from '@/views/login/CallbackView.vue'
import Login from '@/views/login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/profile',
      component: () => import('@/views/ProfileView.vue')
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
        component: Login,
    },
    {
        path: '/github/callback',
        component: Callback,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ]
})

export default router
