import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import EventBus from './EventBus'
import 'vue-search-select/dist/VueSearchSelect.css'

Vue.use(BootstrapVue)
Vue.use(VueCookies)

VueCookies.config('1d')
Vue.config.productionTip = false
Vue.prototype.$bus = EventBus

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
