<template>
  <div class="home">
    <mt-swipe :show-indicators="false" :continuous="false" :auto="0">
      <mt-swipe-item>
        <img src="../../assets/images/slide-01.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../assets/images/slide-02.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <router-link to="storeList">
          <img src="../../assets/images/slide-03.jpg" alt="">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <app-title title="驾图购"> </app-title>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui'
  import { getUserInfo } from '../../libs/api.js'
  export default {
    components: {
      Swipe, SwipeItem
    },
    data (){
      return {
      }
    },

    created () {
      var _this = this
      getUserInfo().then(function(rep){
         _this.user_id = rep.data.data.user_id
         _this.license_plate = rep.data.data.license_plate
         _this.contact_name = rep.data.data.real_name
         _this.contact_mobile = rep.data.data.contact_mobile
        store.set('user_id',_this.user_id)
        store.set('license_plate',_this.license_plate)
        if (_this.contact_name ) {
          store.set('contact_name', _this.contact_name)
        }
        if ( _this.contact_mobile) {
          store.set('contact_mobile', _this.contact_mobile)
        }
      })
      // if (store.get('visited')) {
      //   this.$router.push('/storeList')
      // } 
    },
    mounted(){
      console.log($('.home'))
      store.set('visited', true)
    }
  }
</script>
<style lang="less">
  .home{
    height: 100vh;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
