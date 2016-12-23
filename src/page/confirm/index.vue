<template>
  <div class="confirm">
    <div class="tips">
      预计您15分钟可到达取货店
    </div>
    <div class="confirm-title">
      <div><img src="../../assets/images/eg01.jpg" alt=""> 罗森便利店 </div>
      <p>
         <span>已备货</span>
         <a href=""> <i class="icon-nav"></i>导航</a>
      </p>

    </div>
    <div class="swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
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
        <a class="btn btn-default" @click="handleContact" :href="'tel:'+telephone">
           <span class="icon-tele"></span>联系商家
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import AppFooter from '../../components/footer'
  import { Swipe, SwipeItem } from 'mint-ui'
  import { submitOrderConfirm } from '../../libs/api.js'

  export default {
    components: {
      AppFooter, Swipe, SwipeItem
    },
    data (){
      return {
        telephone: 0 
      }
    },
    created () {
      localStorage.setItem('telephone', '023-66668888')
      this.telephone = localStorage.getItem('telephone')
    },
    methods: {
      handleConfirm () {
        var reqData = {
          order_id: this.$route.query.order_id
        }
        submitOrderConfirm(reqData).then(function(rep){
          console.log(rep)
        })
        
      },
      handleDetail () {
        this.$router.go(-1)
      },
      handleContact () {
        
      }
    }
  }
</script>

<style lang="less">
  @import './confirm.less';
</style>
