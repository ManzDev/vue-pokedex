import Vue from 'vue/dist/vue.esm';
import VueRouter from 'vue-router';
import App from './App.vue';

const routes = [
  { path: '/', redirect: '/id/1' },
  { path: '/id/:id', name: 'id', component: App }
];

const router = new VueRouter({
  routes,
  //mode: 'history'   // Requires Server-Side
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');