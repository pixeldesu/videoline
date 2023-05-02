import { createApp } from 'vue'
import createVuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'

createApp(App)
  .use(createVuetify)
  .mount('#app')
