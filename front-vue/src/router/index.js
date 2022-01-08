import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/ProductList.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Purchase from '../views/Purchase.vue';
import Error from '../views/Error.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/error',
    name: 'Error',
    component: Error,
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: Purchase,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '*',
    name: 'Error',
    component: Error,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  }
  next();
});

export default router;
