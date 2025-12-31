import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/Transactions.vue'),
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('../views/Accounts.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Categories.vue'),
    },
  ],
})

export default router
