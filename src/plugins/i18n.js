import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '../translations';

Vue.use(VueI18n);

export default {
  locale: 'en',
  fallbackLocale: 'en',
  messages,
};
