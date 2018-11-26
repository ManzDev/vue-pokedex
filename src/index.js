import Vue from 'vue/dist/vue.esm';
import VueRouter from 'vue-router';
import App from './App.vue';

const routes = [
  { path: '/id/:id', name: 'id', component: App },
  { path: '/name/:name', name: 'name', component: App },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');