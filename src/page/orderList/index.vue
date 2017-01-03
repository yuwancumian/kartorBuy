<template>
  <div class="order-list">
    <div class="ot-panel" v-for="order in orders">
      <div class="ot-panel-bd">
        <div class="row">
          <div class="col-3">
            <img :src="order.store_icon" alt="">
          </div>
          <div class="col-21 order-in">
            <h4>
                {{order.store_name}}
                <span> 已支付，待备货</span>
              </h4>
            
            <table class="table table-price">
              <tr v-for="good in order.goods">
                <td>{{good.name}}</td>
                <td>x {{good.quantity}}</td>
                <td>{{good.price}}</td>
              </tr>
              <tr class="tfoot">
                <td colspan="3">
                  共3件商品，实付
                    <span class="total-price">{{order.total_price}}</span>
                  元 
                </td>
              </tr>
            </table>
          
          </div>
        </div>
        
      </div>
      <div class="ot-panel-ft">
        <router-link 
          class="btn btn-default" 
          :to="{ path: 'order/detail', query: { order_id: order.order_id, store_id: order.store_id }}">
          查看订单
        </router-link>
        <router-link 
          class="btn btn-default"
          :to="{ path: 'rate', query: {order_id: order.order_id, store_id: order.store_id}}">去评论</router-link>
        <a class="btn btn-default" @click="submitCancel(order.order_id)">取消订单</a>
      </div>
    </div>
    
  </div>
</template>

<script>
  import OtPanel from '../../components/panel'
  import { getOrderList, submitOrderCancel } from '../../libs/api.js'
  import {MessageBox} from 'mint-ui'
  export default {
    data(){
      return {
        orders: [
          {
            store_name:'',
            store_id: 0,
            goods: null  
          }
        ]
      }
    },
    created(){
      var _this = this
      var reqData = {
        user_id: store.get('user_id'),
        status: 0
      }
      getOrderList(reqData).then(function(rep){
        _this.orders = rep.data.data
        console.log(_this.order)
      })
    },
    methods: {
      submitCancel (id){
        var reqData = {
          order_id: id
        }
        MessageBox.confirm('确定执行此操作?').then( ()=> {
          submitOrderCancel(reqData).then(function(rep){
            console.log(rep)
          })
        });
      }
    }
  }
</script>

<style lang="less">
  @import './orderList.less';
</style>
