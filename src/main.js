import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

Vue.prototype.$notify = Element.Notification;

Vue.use(Element);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
