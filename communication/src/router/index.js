import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/parent',
    name: 'Parent',
    component: () => import('../views/Parent.vue')
  },
  {
    path: '/grandpa',
    name: 'Grandpa',
    component: () => import('../views/Grandpa.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
