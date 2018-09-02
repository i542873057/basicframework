import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './plugins/element.js'
import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router/index'
import store from './store'

import i18n from './lang' // Internationalization
import * as filters from './filters' // global filters

Vue.config.productionTip = false

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
