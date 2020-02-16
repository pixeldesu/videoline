import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import store from './store';
import i18n from './plugins/i18n';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
