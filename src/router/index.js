import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/HomeView.vue';
import userRoutes from './module/user';
// import Register from '../views/register/Register.vue';
// import Login from '../views/login/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  ...userRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { //  判断是否需要登录
    //  判断用户是否登录
    if (store.state.userModule.token) {
      // 这里还要判断token的有效性
      next();
    } else {
      // 跳转登录
      router.push({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;
