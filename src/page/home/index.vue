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
        <router-link to="location">
          <img src="../../assets/images/slide-03.jpg" alt="">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <app-title title="I am a Homepage"> </app-title>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui'
  export default {
    components: {
      Swipe, SwipeItem
    },
    mounted(){
      console.log($('.home'))
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
