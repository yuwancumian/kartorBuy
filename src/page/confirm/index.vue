<template>
  <div class="confirm">
    <div class="tips">
      预计您15分钟可到达取货店
    </div>
    <div class="confirm-title">
      <div><img src="../../assets/images/eg01.jpg" alt=""> 罗森便利店 </div>
      <p>
         <span>已备货</span>
         <a :href="navUrl"> <i class="icon-nav"></i>导航</a>
      </p>

    </div>
    <div class="swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img :src="slide[0]" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img :src="slide[1]" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img :src="slide[2]" alt="">
      </mt-swipe-item>
    </mt-swipe>
    </div> 
    <div class="submit-btn" @click="handleConfirm">
      <a>确定收货</a>
      <span>5小时候系统将自动确认收货</span>
    </div>
    <div class="confirm-link">
      <div class="wrapper">
        <a class="btn btn-default" @click="handleDetail">
            <span class="icon-cont"></span>订单详情
        </a>
        <a class="btn btn-default"  :href="'tel:'+telephone">
           <span class="icon-tele"></span>联系商家
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import AppFooter from '../../components/footer'
  import { Swipe, SwipeItem, MessageBox } from 'mint-ui'
  import { submitOrderConfirm } from '../../libs/api.js'

  export default {
    components: {
      AppFooter, Swipe, SwipeItem, MessageBox
    },
    data (){
      return {
        telephone: 0,
        slide: []
      }
    },
    created () {
      this.telephone = store.get('contact_mobile')
      this.slide = store.get('slide')
    },
    methods: {
      handleConfirm () {
        var _this = this
        var reqData = {
          order_id: this.$route.query.order_id
        }
        submitOrderConfirm(reqData)
          .then(function(rep){
            console.log(rep)
            MessageBox('提示', '操作成功')
              .then( () => {
                _this.$router.push({
                  name: 'store',
                  params: {
                    id: store.get('store_id')
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
      navUrl (){
        return 'appcall://mapnav?endname="test"&endlng=106.553029&endlat=29.567469'
      }
    }
  }
</script>

<style lang="less">
  @import './confirm.less';
</style>
