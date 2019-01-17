import firebase from 'firebase';
import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import EditGarden from './views/EditGarden.vue'
import Connect from './views/Connect.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,

  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/garden/:id',
      name: 'EditGarden',
      component: EditGarden,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/connect/:name',
      name: 'Connect',
      component: Connect,
      // meta: {
      //   requiresAuth: true
      // }
    },
  ]
});

// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//
//   if (requiresAuth && !currentUser) next('login');
//   else if (!requiresAuth && currentUser) next('home');
//   else next();
// });

export default router;
