import Vue from 'vue';
import Vuex from 'vuex';

import app from './app';
import userStore from './userStore';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export default function(/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       userStore,
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: process.env.DEBUGGING,
//   });

//   return Store;
// }

const store = new Vuex.Store({
  modules: {
    app,
    userStore,
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING,
});

// store.dispatch('getUser');

export default store;
