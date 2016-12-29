<template>
<div class="order">
  <navbar v-model="selected">
    <tab-item id="1">订单状态</tab-item>
    <tab-item id="2">订单详情</tab-item>
  </navbar>
  <mt-tab-container v-model="selected">
  <mt-tab-container-item id="1" style="padding-bottom: 50px">
  <div class="ot-step-container" style="background: #fff;">
    
    <ot-step v-for="step in opt" :title="step.description" :label="step.create_time"></ot-step>
    <ot-step title="已完成" label="8月22日 20:51"  done desc="这里是信息的描述 ">
      <span class="icon-done"></span>
    </ot-step>
  </div>
    <div class="submit-btn">
      <p @click="handleRefund">退货</p>
      <div @click="handleConfirm">确认收货</div>
    </div>
      
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img :src="slide[0]" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="slide[0]" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="slide[0]" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <panel title="罗森便利店">
      <table class="table table-price">
        <tr v-for="good in detail.goods">
          <td>{{good.goods_name}}</td>
          <td>x {{good.quantity}}</td>
          <td>{{good.price}}</td>
        </tr>
        <tr class="tfoot">
          <td colspan="3">
            共3件商品，实付
              <span class="total-price">{{detail.total_price}}</span>
            元 
          </td>
        </tr>
      </table>
    </panel>
    <panel title="备注" v-if="detail.remark">
      {{detail.remark}}
    </panel>
    <panel title="其他信息">
    <list title="下单时间" :text="detail.create_time"> </list>
    <list title="订单号" :text="detail.order_code">  </list>
      <list title="支付方式"> </list>
      <list title="车牌号" :text="detail.license_plate"></list>
      <list title="联系人" :text="contact_name"></list>
      <list title="联系电话" :text="contact_mobile"></list>
    </panel>
  </mt-tab-container-item>
</mt-tab-container>

</div>
</template>


<script>
import Navbar from '../../components/navbar'
import TabItem from '../../components/tabItem'
import { TabContainer, TabContainerItem } from 'mint-ui'
import { Swipe, SwipeItem } from 'mint-ui'
import OtCell from '../../otter/components/cell'
import OtStep from '../../otter/components/step'
import Panel from '../../components/panel'
import List from '../../components/list'
import AppFooter from '../../components/footer'
import {getOrderStatus, getOrderDetail} from '../../libs/api.js'

export default {
  data: function(){
    return {
      selected: '1',
      detail:{
        remark: '',
        create_time: '',
        order_code: '',
        license_plate: ''
      },
      opt: [
        {
          status: 1,
          description: '已下单',
          create_time: '2016-12-17 21:13:19'
        },
        {
          status: 2,
          description: '已下单',
          create_time: '2016-12-17 21:13:19'
        },
        {
          status: 3,
          description: '已下单',
          create_time: '2016-12-17 21:13:19'
        },
      ],
      contact_mobile: '',
      contact_name: '', 
      slide: []
    }
  },
  created (){
    var _this = this
    getOrderDetail(this.$route.query.order_id).then(function(rep){
      console.log(rep.data.data)
      _this.detail = rep.data.data
      _this.slide = _this.detail.picture.split(',')
      _this.contact_name = store.get('contact_name')
      _this.contact_mobile = store.get('contact_mobile')
      store.set('slide', _this.slide)
    })
  },
  methods: {
    handleRefund () {
      this.$router.push({ 
        path: '/refund', 
        query: { 
          order_id: this.$route.query.order_id,
          store_id: this.$route.query.store_id
        }
      })
    },
    handleConfirm () {
      this.$router.push({ 
        path: '/confirm', 
        query: { 
          //store_id: this.$route.query.store_id,
          order_id: this.$route.query.order_id
        }
      })
    }
  },
  components: {
    Navbar, TabItem, TabContainer, TabContainerItem,
    Swipe,SwipeItem, OtCell,OtStep, Panel, List
  }
}
</script>

<style lang="less">
  @import './order.less';
</style>
