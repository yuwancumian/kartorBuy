<template>
  <div class="pay">
    <!--<timer :left_time="left_time"></timer>-->
    <div class="tips">
      支付剩余时间 {{left_time |toMinite }} 
    </div>
    <!--<div class="ot-panel" style="margin-top: -1px">
      <pay-mode v-model="selected"></pay-mode>
    </div>-->
    <div class="ot-panel">
      <h3>
        <img :src="detail.store_icon" alt="">
        {{detail.store_name}}
      </h3>
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
        <span class="icon-discount"></span>全场 <span class="prom">{{detail.discount*10}}</span> 折   
        <div> - ¥<span class="cut">{{detail.discount_amount}}</span></div>
      </div>
      <div class="pay-info">
        <span style="color: #999">订单 ¥ <span class="total_price">{{detail.total_price}}</span>  优惠 ¥ <span class="cut">{{detail.discount_amount}}</span> 
          </span>
        <div>
          待支付 <span class="pay-price">¥{{detail.price}}</span>
        </div>
      </div>
    </div>
    <div class="ot-panel">
      <div class="title">配送费：<span style="float: right;color: #f43530;text-decoration: line-through"><span class="fee" style="color: #333">1元</span></span>
      </div>
    </div>
    <div class="ot-panel pay-remark">
      <div class="pan" id="pan1">
        <div class="title">
          称呼：
        </div>
        <input type="text" placeholder="请输入您的称呼" v-model="contact_name" />
      </div>
      <div class="pan">
        <div class="title">
          手机号：
        </div>
        <input type="text" placeholder="可及时联系到您的手机号" v-model="contact_mobile" />
      </div>
    </div>
    <div class="ot-panel pay-remark">
      <div class="pan">
        <div class="title">
          备注：
        </div>
        <input type="text" placeholder="口味、偏好等" v-model="order_remark" />
      </div>
    </div>
    
    <div class="ot-panel">
      <div class="container">
      <div>注：请尽量在下单后 6 小时内到取货地点取货，12 小时后如未确认收货，系统将自动确认收货</div>
      <span class="pay-ticket">商家不支持开发票</span>
      </div>
    </div>
    
    <app-title title="在线支付"></app-title>
    <footer>
      <div>待支付 <span> ¥ {{detail.price}}</span></div> 
      <a  class="router-link-active" @click.prevent="handleClick">确定支付</a>
      </footer>
  </div>
</template>

<script>
  import Timer from '../../components/timer'
  import Cell from '../../otter/components/cell'
  import AppFooter from '../../components/footer'
  import PayMode from './payMode.vue'
  import { MessageBox } from 'mint-ui'
  import { getOrderDetail, submitPay, submitOrderRemark } from '../../libs/api.js'
  export default {
    data(){
      return {
        active: false,
        selected: 2,
        left_time: 500,
        child_time: 0,
        total_price: 0,
        timer: false,
        discount: 8,
        create_time: '',
        update_date: '',
        products: [],
        detail: {},
        pay_detail:{},
        contact_name: '',
        contact_mobile: '',
        order_remark: '',
        url:''
      }
    },
    created () {
      var _this =  this
      var order_id = _this.$route.query.order_id || store.get('order_id')
      _this.contact_name = store.get('contact_name')
      _this.contact_mobile = store.get('contact_mobile')
      getOrderDetail(order_id).then(function(rep){
        _this.detail = rep.data.data
        //console.log(_this.detail.create_time)
      })
    },
    methods: {
      handleClick () {
        var _this = this
        var order_id = _this.$route.query.order_id || store.get('order_id')
        const remark_data = {
          order_id: order_id,
          user_id: store.get('user_id'),
          contact_name: _this.contact_name,
          contact_mobile: _this.contact_mobile,
          remark: _this.order_remark
        }
        submitOrderRemark(remark_data).then(function(rep){
          console.log(rep.data.data)
        })
        var req_data = {
          order_id: order_id
        }
        
        submitPay(req_data).then(function(rep){
          
            if (rep.data.code == 1) {
              MessageBox({
                title: '提示',
                message: '支付失败'
              })
              return
            }  else if (rep.data.code == 2) {
              MessageBox({
                title: '提示',
                message: '抱歉，商品库存不足'
              })
              return
            } else if (rep.data.code == 3) {
              MessageBox({
                title: '提示',
                message: '抱歉，商品已下架'
              }).then( () => {
                 _this.$router.push({
                  name: 'store', params: { id: _this.detail.store_id }
                 }) 
              })
              return
            } else if (rep.data.code == 4) {
              MessageBox({
                title: '提示',
                message: '抱歉，商店已歇业'
              }).then( () => {
                _this.$router.push('orderList')
              })
              return
            } else if (rep.data.code == 5) {
              MessageBox({
                title: '提示',
                message: '抱歉，商店未营业'
              })
              return
            } else if (rep.data.code == 6) {
              MessageBox({
                title: '提示',
                message: '抱歉，您有未结束订单'
              })
              return
            } else {

              _this.pay_detail = JSON.parse(rep.data.data)
              
              var pay_url = _this.pay_detail.data.payUrl
              window.location.href = pay_url
            }
        })
        .catch(function(err){
           MessageBox({
                title: '提示',
                message: '支付失败'
              })
        })
      }

    },
    computed: {
      left_time (){
        var _this = this
        _this.update_date = new Date(('' + _this.detail.create_time).replace(/-/g, "/") || 0)
        var now_date = new Date()
  
        if ( !_this.detail.create_time  ) {
          return 
        }
        var end_date = new Date(_this.update_date)
        
        end_date.setMinutes(_this.update_date.getMinutes()+14)
        var a = Date.parse(now_date)
        var b = Date.parse(end_date)
       _this.child_time = (b-a)/1000
        if (b > a){
          _this.child_time = (b-a)/1000
        } else {
          _this.child_time = 0
        }
        var x = setInterval(function(){
          if (_this.child_time > 0){
            _this.child_time -= 60
          } else {
            clearInterval(x)
          }
        },60000)
        return _this.child_time
       }
    },
    filters: {
      toMinite (value){
        return  Math.round(value/60) + ' 分 '+ value%60 + ' 秒'
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
