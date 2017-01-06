<template>
  <div class="pay">
    <timer :left_time="left_time"></timer>
    <div class="ot-panel" style="margin-top: -1px">
      <pay-mode v-model="selected"></pay-mode>
    </div>
    <div class="ot-panel">
      <h3>{{detail.store_name}}</h3>
      <div class="container">
        <table class="table-price">
          <tr v-for="product in detail.goods">
            <td>{{product.goods_name}}</td>
            <td>x {{product.quantity}}</td>
            <td> {{product.price}} </td>
          </tr>
        </table>
      </div>
      <div class="pay-info">
        <span class="icon-discount"></span>全场 <span class="prom">9</span> 折   
        <div> -¥<span class="cut">{{detail.discount_amount}}</span></div>
      </div>
      <div class="pay-info">
        订单 ¥ <span class="total_price">{{detail.total_price}}</span>  优惠 ¥ <span class="cut">{{detail.discount_amount}}</span> 
        <div>
          待支付 ¥<span class="pay_price">{{pay_price}}</span>
        </div>
      </div>
    </div>
    <div class="ot-panel pay-remark">
      <div class="title">
        备注：
      </div>
      <input type="text" placeholder="在此输入备注" />
    </div>
    <div class="ot-panel">
      <div class="container">
      <div>注：请尽量在下单后 6 小时内到取货地点取货，12 小时后如未确认收货，系统将自动确认收货</div>
      <span>商家不支持开发票</span>
      </div>
    </div>
    
    <app-title title="在线支付"></app-title>
    <app-footer title="确定支付" :total_price="total_price" url="/"></app-footer>
  </div>
</template>

<script>
  import Timer from '../../components/timer'
  import Cell from '../../otter/components/cell'
  import AppFooter from '../../components/footer'
  import PayMode from './payMode.vue'
import { getOrderDetail } from '../../libs/api.js'
  export default {
    data(){
      return {
        active: false,
        selected: 2,
        left_time: 10,
        total_price: 0,
        timer: false,
        discount: 8,
        create_time: '',
        products: [
          {
            'title':'农夫山泉',
            'price': 12.20,
            'amount': 3
          },
          {
            'title': '口香糖',
            'price': 9.1,
            'amount': 1
          },
          {
            'title': '可口可乐',
            'price': 3.50,
            'amount': 4
          }
        ],
        detail: {}
      }
    },
    created () {
      var _this =  this
      var order_id = _this.$route.query.order_id || store.get('order_id')
      getOrderDetail(order_id).then(function(rep){
        _this.detail = rep.data.data
        console.log(_this.detail.create_time)
      })
    },
    methods: {
      left_time (){
        var update_date = this.detail.create_time
        console.log(update_date)
        var now_date = new Date()
        var end_date = new Date(update_date.getTime())
        end_date.setMinutes(update_date.getMinutes()+15)
        if (Date.parse(end_date) > Date.parse(now_date)){
          return (Date.parse(end_date) - Date.parse(now_date))/1000
        } else {
          return 0
        }
      }
    },
    computed: {
      pay_price (){
        return parseFloat(this.detail.total_price - this.detail.discount_amount).toFixed(2)
      }
    },
    components: {
      Timer, Cell, AppFooter, PayMode
    }
  }
</script>

<style lang="less">
  @import './pay.less';
</style>
