import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        path: '/designer/pc'
      }
    },
    {
      path: '/designer/:device',
      name: 'designer',
      component: () => import('../views/Designer.vue')
    }
  ]
})

export default router
