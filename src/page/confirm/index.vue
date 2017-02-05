<template>
  <div class="confirm">
    <div class="tips" v-if="duration!=='分钟'&& show == true">
      预计您{{duration}}可到达取货店
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
      <span>  {{live_time}} 系统将自动确认收货</span>
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
    <div id="map" style="display:none"></div>  
    <app-title title="驾图购"> </app-title>
  </div>
</template>

<script>
  import AppFooter from '../../components/footer'
  import { Swipe, SwipeItem, MessageBox } from 'mint-ui'
  import { getOrderDetail, getStoreInfo } from '../../libs/api.js'
  import { submitOrderConfirm } from '../../libs/api.js'
  import { getBmapD } from '../../libs/bMap.js'

  export default {
    components: {
      AppFooter, Swipe, SwipeItem, MessageBox
    },
    data (){
      return {
        contact_phone: 0,
        slide: [],
        detail: {},
        live_time: 0,
        lon: 0,
        lat: 0,
        end: {},
        show: false,
        duration: '分钟'
      }
    },
    created () {
      var _this = this
      const bdkey = 'heM8vbaENjtTNGRMAEBwqzm8x6UCcYnZ'
      var order_id = _this.$route.query.order_id
      var store_id = _this.$route.query.store_id
      

      getOrderDetail(order_id).then(function(rep){
        _this.detail = rep.data.data
        if ( _this.detail.create_time  ) {
          var create_date = new Date(('' + _this.detail.create_time).replace(/-/g, "/") || 0)

          create_date.setHours(create_date.getHours() + 12)
          var time = Date.parse(create_date)
          var timeagoInstance = new timeago(null, time); // 在这里设置相对时间

          console.log(time)
          _this.live_time = timeagoInstance.format(time, 'zh_CN');
        }

      })

      getStoreInfo(store_id).then(function(rep){
        console.log(rep.data.data.longitude)
        _this.contact_phone = rep.data.data.contact_phone
        var lon = rep.data.data.longitude
        var lat = rep.data.data.latitude
        _this.slide = rep.data.data.picture.split(',')
        BMap.Convertor.translate( lon, lat,  bdkey, function (point, status, message) {
          if(status) return console.log(message || "转换坐标出错:"+status, true);
          _this.lon = point[0]['lng']
          _this.lat = point[0]['lat']
          console.log(_this.lat)
          _this.end.lng = point[0]['lng']
          _this.end.lat = point[0]['lat']
          getBmapD(_this.end).then(function(rep){
              _this.duration = rep.duration
              _this.show = true
          }).catch(function (error) {
              console.error(error); 
          })
          var x = setInterval(function(){
            getBmapD(_this.end).then(function(rep){
              _this.duration = rep.duration
              _this.show = true
            }).catch(function (error) {
              console.error(error); 
            })
          }, 60000)
        })
        
      })
  
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
                window.history.replaceState({}, "","/#/storeList")
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
      navUrl (lon,lat){
        var _this = this
        return 'appcall://mapnav?endname=test&endlng='+ _this.lon + '&endlat=' + _this.lat
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
