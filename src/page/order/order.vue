<template>
<div class="order">
  <navbar v-model="selected">
    <tab-item id="1">订单状态</tab-item>
    <tab-item id="2">订单详情</tab-item>
  </navbar>
  <mt-tab-container v-model="selected">
  <mt-tab-container-item id="1" style="padding-bottom: 50px">
  <div class="ot-step-container">

  <ot-step
    v-for="step in opt"
    :title="step.description"
    :status = "step.status"
    :pay = "pay"
    :label="step.create_time">
  </ot-step>
    <!-- <ot-step title="已完成" label="8月22日 20:51"  done desc="这里是信息的描述 "> -->
    <!--   <span class="icon-done"></span> -->
    <!-- </ot-step> -->
  </div>

    <div class="submit-btn" v-if="detail.status == 1">
      <p @click="submitCancel(detail.order_id)">取消订单</p>
      <router-link class="tap-link" :to="{path: '/pay', query: {order_id: detail.order_id}}">
        <div>去支付</div>
      </router-link>
    </div>

    <div class="submit-btn" v-if="detail.status == 2 ||detail.status == 3">
      <div @click = "submitCancel(detail.order_id)" class="filled">取消订单</div>
    </div>

    <div class="submit-btn"
      v-if="detail.status == 4 || detail.status == 5"
      >
      <p @click="handleRefund" v-if="detail.is_refundable==1">退款</p>
      <div @click="handleConfirm" :class="detail.is_refundable==1?'': 'filled'">确认收货</div>
    </div>

    <div class="submit-btn" v-if="detail.status == 6 && detail.is_comment == 0">
      <router-link class="tap-link" :to="{path: '/rate', query: {order_id: detail.order_id, store_id: detail.store_id}}">
        <div class="filled">去评价</div>
      </router-link>
    </div>
    <div class="service-tools" >
      <a href="tel: 4008054288" class="icon-phone tap-link" ></a>
      <a href="tel: 4008054288" class="icon-tell tap-link" v-if="detail.status == 6 || detail.status == 11"></a>
    </div>



  </mt-tab-container-item>
  <mt-tab-container-item id="2" style="background: #f5f5f5;min-height: 85vh">
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-if="slide[0]">
          <img :src="slide[0]" alt="">
        </mt-swipe-item>
        <mt-swipe-item v-if="slide[1]">
          <img :src="slide[1]" alt="">
        </mt-swipe-item>
        <mt-swipe-item v-if="slide[2]">
          <img :src="slide[2]" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="ot-panel">
      <h3>
        <img :src="detail.store_icon" alt="">
        {{detail.store_name}}
      </h3>
      <div class="ot-panel-bd">
        <table class="table table-price">
          <tr v-for="good in detail.goods">
            <td>{{good.goods_name}}</td>
            <td>x {{good.quantity}}</td>
            <td>¥ {{good.price}}</td>
          </tr>
        
        </table>
      </div>
      <div class="pay-info" v-if="detail.discount!= 1">
        <span class="icon-discount"></span> 全场 <span class="prom">{{detail.discount*10}}</span> 折
        <div> - ¥<span class="cut">{{detail.discount_amount}}</span></div>
      </div>
      <div class="pay-info">
        <span style="color: #999"> 订单 ¥ {{detail.total_price}}
          优惠 ¥{{detail.discount_amount}}
        
          </span>
        <div>
          支付 <span class="pay-price">¥{{detail.price}}</span>
        </div>
      </div>
    </div>
    <!--<panel :title="detail.store_name">
      <table class="table table-price">
        <tr v-for="good in detail.goods">
          <td>{{good.goods_name}}</td>
          <td>x {{good.quantity}}</td>
          <td>{{good.price}}</td>
        </tr>
        <tfoot class="tfoot">
          <td colspan="3" style="text-align: left">
            共 {{detail.total_num}} 件商品，实付
              <span class="total-price">{{detail.total_price}}</span>
            元
          </td>
        </tfoot>
      </table>
    </panel>-->
    <panel title="备注" v-if="mark && mark != 'undefined'">
      {{detail.remark}}
    </panel>
    <panel title="其他信息">
      <list title="下单时间" :text="detail.create_time"> </list>
      <list title="订单号" :text="detail.order_code">  </list>
      <list title="支付方式" :text="payment" v-if="detail.payment"> </list>
      <list title="车 牌 号" :text="detail.license_plate"></list>
      <list title="联 系 人" :text="detail.contact_name"></list>
      <list title="联系电话" :text="detail.contact_mobile"></list>
    </panel>
  </mt-tab-container-item>
  </mt-tab-container>
  <app-title title="订单"> </app-title>
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
import {getOrderStatus, getOrderDetail, submitOrderCancel} from '../../libs/api.js'
import {MessageBox} from 'mint-ui'

export default {
  data: function(){
    return {
      selected: '1',
      detail:{
        remark: '',
        create_time: '',
        order_code: '',
        license_plate: '',
        contact_mobile: '',
        contact_name: ''
      },
      opt: [
        {
          status: 1,
          description: '',
          create_time: ''
        }
      ],
      pay: false,
      slide: [],
      mark: ''
    }
  },
  created (){
    var _this = this
    getOrderDetail(this.$route.query.order_id).then(function(rep){
      console.log(rep.data.data)
      _this.detail = rep.data.data
      if ( _this.detail.remark ) {
        _this.mark = _this.detail.remark.replace(/(^\s+)|(\s+$)/g, "");
      }
      _this.slide = _this.detail.picture.split(',')
      store.set('slide', _this.slide);
      console.log(_this.contact_name)
    })
    // _this.opt = _this.opts.reverse()
    getOrderStatus(this.$route.query.order_id).then(function(rep){
      _this.opt = rep.data.data.opts.reverse()
      if(_this.opt.length >= 3){
        _this.pay = true;
      }
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
          order_id: this.$route.query.order_id,
          store_id: this.$route.query.store_id
        }
      })
    },
    submitCancel (id){
      var _this = this
      var reqData = {
        order_id: id
      }
      MessageBox.confirm('确定执行此操作?').then( ()=> {
       
        submitOrderCancel(reqData).then(function(rep){
          window.history.replaceState({}, "","/#/storeList")
          _this.$router.push('/orderList')
          console.log(rep)
        })
      });
    }

  },
  components: {
    Navbar, TabItem, TabContainer, TabContainerItem,
    Swipe,SwipeItem, OtCell,OtStep, Panel, List
  },
  computed: {
    payment (){
      if ( this.detail.payment == 1) {
        return '支付宝'
      }
      if ( this.detail.payment == 2 ) {
        return '微信'
      }
    }
  }
}
</script>

<style lang="less">
  @import './order.less';
</style>
