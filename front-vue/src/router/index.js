import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Register from '../components/Register/Register.vue'
import Products from '../components/Product/GetAllProducts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'Register',
    component: Register
  },
  {
    path: '/produit',
    name: 'Products',
    component: Products
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
