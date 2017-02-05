import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.config.debug = true

import './assets/less/site.less'
import App from './app'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Title from  './libs/title.vue'
import Device from './libs/device.vue'
Vue.filter('tofix', function(value){
  return value.toFixed(2)
})
Vue.use(VueRouter)
Vue.use(Mint)

//Vue.component('app-header',require('./components/header/header.vue'))
Vue.component('app-title', Title)
Vue.component('device', Device)

import Home from './page/home'
import Goods from './page/goods'
import Store from './page/store'
import Order from './page/order/order.vue'
import Pay from './page/pay'
import Refund from './page/refund'
import Rate from './page/rate'
import Confirm from './page/confirm'
import StoreList from './page/storeList'
import OrderList from './page/orderList'
import InputInfo from './page/inputInfo'
import Test from './page/test'

var routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/goods/:id',
    component: Goods
  },
  {
    path: '/store/:id',
    name: 'store',
    component: Store
  },
  {
    path: '/storeList',
    component: StoreList
  }, 
  {
    path: '/order/detail',
    component: Order
  }, 
  {
    path: '/orderList',
    component: OrderList
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/confirm',
    component: Confirm
  },
  {
    path: '/refund',
    component: Refund
  },
  {
    path: '/rate',
    component: Rate
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '/inputInfo',
    component: InputInfo
  }

]
var router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})


// new Vue({
//   router
// }).$mount('#app');
new Vue(
  Vue.util.extend({router}, App)
).$mount('#app')
