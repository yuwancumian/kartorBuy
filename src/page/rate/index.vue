<template>
  <div class="rate">
    <div class="rate-title">
      <img src="../../assets/images/eg01.jpg" alt="">
      罗森便利店
    </div>
    <div class="rate-grade">
      <h3>商家服务评价</h3>
      <rater></rater>
    </div>
    <div class="rate-list">
      <h3>请选择您想推荐或吐槽的商品</h3>
      <ul>
        <li>农夫山泉（300ml）
          <up-down></up-down>
        </li>
        <li>口香糖
          <up-down></up-down>
        </li>
        <li>可口可乐（无糖）
          <up-down></up-down>
        </li>
      </ul>
    </div>
    <div class="comm">
      <textarea placeholder="服务很好，商品很棒！"></textarea>
    </div>
    <div class="submit-btn">
      <p>提 交</p>
    </div>

  </div>
</template>

<script>
  import Rater from '../../components/rater'
  import UpDown from './updown.vue'
  import { submitStoreGrade, submitGoodsLike } from '../../libs/api.js'
  export default {
    components: {
      Rater, UpDown
    }
     
  }
</script>

<style lang="less">
  @import './rate.less';
</style>
