import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import store from '../store';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// export default function(/* { store, ssrContext } */) {
//   const Router = new VueRouter({
//     scrollBehavior: () => ({ x: 0, y: 0 }),
//     routes,

//     // Leave these as they are and change in quasar.conf.js instead!
//     // quasar.conf.js -> build -> vueRouterMode
//     // quasar.conf.js -> build -> publicPath
//     mode: process.env.VUE_ROUTER_MODE,
//     base: process.env.VUE_ROUTER_BASE,
//   });

//   return Router;
// }

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
});

router.beforeEach(async (to, from, next) => {
  console.log(to);
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if (
    localStorage.getItem('token') &&
    !store.getters['userStore/getUserDetails']
  )
    await store.dispatch('userStore/getUser');

  // const loggedIn = localStorage.getItem('token');
  const loggedIn = store.state.userStore.userProfile;

  console.log(to.path, loggedIn);

  if (to.path == '/login' && loggedIn) {
    next('/');
  }
  // const a = store.getters['userStore/getUserDetails'];
  // console.log(a);
  if (requiresAuth && !loggedIn) {
    console.log();
    next('/login');
  }
  next();
});

export default router;
