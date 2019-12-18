import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
Vue.use(Buefy)

import VueMqtt from 'vue-mqtt';
Vue.use(VueMqtt, 'ws://172.24.44.227:1888', {port: 1888, clientId: 'WebClient-' + parseInt(Math.random() * 100000)})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
