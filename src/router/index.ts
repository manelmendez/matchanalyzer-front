import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false, onceLogged: true }
    },
    {
      path: '/',
      component: AppLayout,
      children: [
          {
              path: '/',
              name: 'dashboard',
              component: () => import('@/views/HomeView.vue'),
              meta: { requiresAuth: true }
          },
          {
            path: '/teams',
            name: 'teams',
            component: () => import('@/views/teams/MyTeams.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/teams/:id',
            name: 'teams-id',
            component: () => import('@/views/teams/_id/_id.vue'),
            meta: { requiresAuth: true }
          }
          // {
          //   path: '/competitions',
          //   name: 'competitions',
          //   component: () => import('@/views/Competitions.vue'),
          //   meta: { requiresAuth: true }
          // },
          // {
          //   path: '/teams',
          //   name: 'teams',
          //   component: () => import('@/views/Teams.vue'),
          //   meta: { requiresAuth: true }
          // },
        ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  // method to check if user needs to be logged to access a page
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser') || 'null')
    if (!authUser) {
      next({ name: 'login' })
    } else {
      isAuth()
      next()
    }
  }
  // method to not allow a user to go to certain pages once logged
  else if (to.meta.onceLogged) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser') || 'null')
    if (authUser) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})
function isAuth() {
  // check expiry of token
  try {
    const authUser = JSON.parse(window.localStorage.getItem('authUser') || 'null')
    const token = authUser.token
    const tokenDecoded = JSON.parse(atob(token.split('.')[1]))
    if (tokenDecoded.exp < Date.now() / 1000) {
      console.log('Token caducado')
      window.localStorage.removeItem('authUser')
      router.push({ name: 'login' })
    } else {
      console.log('Token válido')
    }
  } catch (error) {
    console.log(error)
  }
}

export default router
