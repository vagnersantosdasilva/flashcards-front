import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import http from './http'
import provedor from './provedor'

import {BootstrapVue, BootstrapVueIcons, IconsPlugin} from 'bootstrap-vue'
import Boxicons from 'boxicons';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.prototype.$boxicons = Boxicons;
Vue.prototype.$http = http

new Vue({
  router,
  store:provedor,
  render: h => h(App)
}).$mount('#app')
