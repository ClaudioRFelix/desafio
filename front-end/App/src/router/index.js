import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Cadastro from '../views/CadastroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cadastro/?email=:email&indpessoa=:indpessoa',
      name: 'cadastro',
      component: Cadastro
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
 