<template>
  <div class="confirm">
    <div class="tips">
      预计您15分钟可到达取货店
    </div>
    <div class="confirm-title">
      <div>
        <img :src="detail.store_icon" alt=""> 
        <span>{{ detail.store_name }} </span>
      </div>
      <p>
        <span>{{ detail.status | statusToText }}</span>
        <a :href="navUrl"> <i class="icon-nav"></i>导航</a>
      </p>

    </div>
    <div class="swipe" v-if="slide.length>0" >
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
    <div class="submit-btn" @click="handleConfirm">
      <a>确定收货</a>
      <span>5小时后系统将自动确认收货</span>
    </div>
    <div class="confirm-link">
      <div class="wrapper">
        <a class="btn btn-default" @click="handleDetail">
            <span class="icon-cont"></span>订单详情
        </a>
        <a class="btn btn-default"  :href="'tel:' + contact_phone">
           <span class="icon-tele"></span>联系商家
        </a>
      </div>
    </div>  
    <app-title title="驾图购"> </app-title>
  </div>
</template>

<script>
  import AppFooter from '../../components/footer'
  import { Swipe, SwipeItem, MessageBox } from 'mint-ui'
  import { getOrderDetail, getStoreInfo } from '../../libs/api.js'
  import { submitOrderConfirm } from '../../libs/api.js'

  export default {
    components: {
      AppFooter, Swipe, SwipeItem, MessageBox
    },
    data (){
      return {
        contact_phone: 0,
        slide: [],
        detail: {},
        lng: 0,
        lat: 0
      }
    },
    created () {
      var _this = this
      var order_id = _this.$route.query.order_id
      var store_id = _this.$route.query.store_id
      
      getOrderDetail(order_id).then(function(rep){
        _this.detail = rep.data.data
      })
      getStoreInfo(store_id).then(function(rep){
        _this.contact_phone = rep.data.data.contact_phone
        // _this.lng = rep.data.data.longitude
        // _this.lat = rep.data.data.latitude
        var gps_lng  = rep.data.data.longitude
        var gps_lat = rep.data.data.latitude

        _this.slide = rep.data.data.picture.split(',')
      })
              // axios.get('http://www.baidu.com')
  
    },
    methods: {
      handleConfirm () {
        var _this = this
        var reqData = {
          order_id: this.$route.query.order_id
        }
        MessageBox.confirm('是否确认已领取到货物？')
          .then( () => {
            submitOrderConfirm(reqData)
              .then(function(rep){
                console.log(rep)
                window.history.replaceState({}, "","/#/storeList");
                _this.$router.push({
                  path: 'rate',
                  query: {
                    order_id: store.get('order_id'),
                    store_id: store.get('store_id')
                  }
                })
              })
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      handleDetail () {
        var _this = this
        console.log(_this.$router)
        _this.$router.push({
          path: 'order/detail',
          query: {
            order_id: store.get('order_id'),
            store_id: store.get('store_id')
          }
        })
      }
    },
    computed: {
      navUrl (lng,lat){
        var _this = this
        return 'appcall://mapnav?endname="test"&endlng="+_ this.lng + "&endlat=" + _this.lat'
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
  @import './confirm.less';
</style>
