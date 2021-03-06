import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ProductShow from '../views/ProductShow.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import MyPurchase from '../views/MyPurchase.vue';
import MyBets from '../views/MyBets.vue';
import Purchase from '../views/Purchase.vue';
import PurchaseItem from '../views/PurchaseItem.vue';
import Error from '../views/Error.vue';
import ProductCreate from '../views/Admin/ProductCreate.vue';
import ProductEdit from '../views/Admin/ProductEdit.vue';
import Purchases from '../views/Admin/Purchases.vue';
import Bets from '../views/Admin/Bets.vue';
import UsersList from '../views/Admin/UsersList.vue';
import ProductsList from '../views/Admin/ProductsList.vue';
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
    path: '/cart',
    name: 'PurchaseItem',
    component: PurchaseItem,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/my-purchase',
    name: 'MyPurchase',
    component: MyPurchase,
    meta: { requiresAuth: true },
  },
  {
    path: '/my-bet',
    name: 'MyBets',
    component: MyBets,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/create-product',
    name: 'ProductCreate',
    component: ProductCreate,
    meta: { requiresAdmin: true, requiresAuth: true },
  },
  {
    path: '/admin/edit-product/:id',
    name: 'ProductEdit',
    component: ProductEdit,
    props: true,
    meta: { requiresAdmin: true, requiresAuth: true },
  },
  {
    path: '/admin/list-products',
    name: 'ProductsList',
    component: ProductsList,
    meta: { requiresAdmin: true, requiresAuth: true },
  },
  {
    path: '/admin/list-users',
    name: 'UsersList',
    component: UsersList,
    meta: { requiresAdmin: true, requiresAuth: true },
  },
  {
    path: '/admin/purchases',
    name: 'Purchases',
    component: Purchases,
    meta: { requiresAdmin: true, requiresAuth: true },
  },
  {
    path: '/admin/bets/:id',
    name: 'Bets',
    component: Bets,
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
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  },
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
