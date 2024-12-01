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
      name: 'home',
      meta: {
        title: 'Boilerbase - Homepage',
        requireAuth: false,
        breadcrumb: [
          { name: 'Home', link: '/' },
          { name: 'Boilerplates', link: '/boilerplates' },
          { name: 'New', link: '/new' },
          { name: 'Profile', link: '/profile' }
        ]
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      beforeEnter: (to, from, next) => {
        const { user } = useAuthStore()
        if (user) {
          next()
        } else {
          next('/login')
        }
      },
      meta: {
        title: 'Profile',
        requireAuth: true,
        breadcrumb: [
          { name: 'Boilerplates', link: '/boilerplates' },
        ]
      }
    },
    {
      path: '/boilerplate/:name',
      component: () => import('@/views/boilerplate/BoilerplateView.vue'),
      name: 'boilerplate-description',
      meta: {
        title: 'Boilerplate - Details',
        requireAuth: false,
      }
    },
    {
      path: '/login',
      component: () => import('@/views/login/LoginView.vue'),
      name: 'login',
      meta: {
        title: 'Login',
        requireAuth: false,
      }
    },
    {
      path: '/github/callback',
      component: () => import('@/views/login/CallbackView.vue'),
      name: 'callback',
      meta: {
        title: 'Github - Callback',
        requireAuth: false,
      }
    },
    {
      path: '/new',
      name: 'new-boilerplate',
      component: () => import('@/views/boilerplate/NewBoilerplateView.vue'),
      beforeEnter: (to, from, next) => {
        const { user } = useAuthStore()
        if (user) {
          next()
        } else {
          next('/login')
        }
      },
      meta: {
        title: 'New Boilerplate',
        requireAuth: true,
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ],
})

export default router
