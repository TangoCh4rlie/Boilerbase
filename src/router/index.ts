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
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/github/callback',
        component: Callback,
    }
  ]
})

export default router
