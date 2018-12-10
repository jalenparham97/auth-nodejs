import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import socket from 'socket.io-client'
import VueSocketIo from 'vue-socket.io-extended';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Vue.use(VueSocketIo, socket('localhost:8081'), { store });

Vue.config.productionTip = false

new Vue({
  // sockets: {
  //   connect() {
  //     console.log('Connected')
  //   },
  // },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
