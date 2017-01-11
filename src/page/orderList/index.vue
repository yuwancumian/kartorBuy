<template>
  <div class="order-list">
    <app-title title="订单"></app-title>
    <div class="ot-panel" v-for="order in orders">
      <div class="ot-panel-bd">
        <router-link 
          :to="{ path: 'order/detail', query: { order_id: order.order_id, store_id: order.store_id }}">
        <div class="row">
          <div class="col-3">
            <img :src="order.store_icon" alt="">
          </div>
          <div class="col-21 order-in">
            <h4>
              <div>{{order.store_name}}</div>
              <span>{{order.status | statusToText}}</span>
            </h4>
            
            <table class="table table-price">
              <tr v-for="good in order.goods">
                <td>{{good.name}}</td>
                <td>x {{good.quantity}}</td>
                <td>¥{{good.price}}</td>
              </tr>
              <tfoot class="tfoot">
                <th colspan="3" style="text-align: right;font-weight: normal;">共 {{order.total_num}} 件商品，实付
                  <span class="total-price">¥ {{order.total_price}}</span>  
                </th>
              </tfoot>
            </table>
          
          </div>
        </div>
        
      </div>
      <div class="ot-panel-ft" v-if="order.status != 7">
        <router-link
          class="btn btn-default" 
          v-if="order.status == 1"
          :to= "{path: 'pay', query: {order_id: order.order_id}}">
          去支付
        </router-link>
        <router-link 
          v-if="order.status == 4 || order.status == 5 "
          class="btn btn-default"
          :to="{ path: 'confirm', query: {order_id: order.order_id, store_id: order.store_id}}">
          确认收货
        </router-link>
        <router-link 
          v-if="order.status == 6"
          class="btn btn-default"
          :to="{ path: 'rate', query: {order_id: order.order_id, store_id: order.store_id}}">
          去评价
        </router-link>
        <a v-if="order.status == 2 || order.status == 3"class="btn btn-default" @click="submitCancel(order.order_id)">取消订单</a>
        </router-link>
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
            window.location.reload()
            console.log(rep)
          })
        });
      }
    },
    filters: {
      statusToText (value) {
        switch (value) {
          case 1:
            return '待支付'
          case 2:
            return '已支付，待备货'
          case 3:
            return '已支付，待备货'
          case 4:
            return '已备货'
          case 5:
            return '已到达取货点'
          case 6:
            return '交易成功'
          case 7:
            return '已取消'
          case 8:
            return '申请退款'
          case 9: 
            return '退款中'
          case 10:
            return '同意退款'
          case 11:
            return '拒绝退款'
          case 12:
            return '退款成功'
        }
      }
    }
  }
</script>

<style lang="less">
  @import './orderList.less';
</style>
