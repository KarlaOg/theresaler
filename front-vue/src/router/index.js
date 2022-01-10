import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ProductShow from '../views/ProductShow.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Purchase from '../views/Purchase.vue';
import Error from '../views/Error.vue';
import ProductCreate from '../views/Admin/ProductCreate.vue';
import ProductList from '../views/Admin/ProductList.vue';
import { getAdminRole } from '@/services/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'ProductShow',
    component: ProductShow,
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
    path: '/admin/create-product',
    name: 'ProductCreate',
    component: ProductCreate,
    meta: { requiresAdmin: true, requiresAuth: true },
  },
  {
    path: '/admin/list-products',
    name: 'ProductList',
    component: ProductList,
    meta: { requiresAdmin: true, requiresAuth: true },
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
  const admin = getAdminRole();
  const loggedIn = localStorage.getItem('user');
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  }
  if (to.matched.some((record) => record.meta.requiresAdmin) && !admin) {
    next('/error');
  }
  next();
});

export default router;
