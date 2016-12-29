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
        <li v-for = "goods in goods_list">
            {{goods.goods_name}}
            <up-down 
              @handleUp = "submitRateUp(goods.goods_id)" 
              @handleDown ="submitRateDown(goods.goods_id)"> 
            </up-down>
        </li>
        
      </ul>
    </div>
    <div class="comm">
      <textarea placeholder="服务很好，商品很棒" v-model="comment"></textarea>
    </div>
    <div class="submit-btn" @click="submitRate">
      <p>提 交</p>
    </div>

  </div>
</template>

<script>
  import Rater from '../../components/rater'
  import UpDown from './updown.vue'
  import { getOrderDetail, submitStoreGrade, submitGoodsLike, submitGoodsUnlike } from '../../libs/api.js'
  export default {
    components: {
      Rater, UpDown
    },
    data () {
      return {
        goods_list: [],
        comment: ''
      }
    },
    created () {
      var _this = this
      getOrderDetail(_this.$route.query.order_id).then(function(rep){
        _this.goods_list = rep.data.data.goods 
        console.log(rep.data.data.goods)
      }) 
    },
    methods:{
      submitRateUp ( id ) {
        var _this = this
        var reqData = {
          user_id: store.get('user_id'),
          store_id: _this.$route.query.store_id,
          order_id: _this.$route.query.order_id,
          goods_id: id
        }
        submitGoodsLike( reqData ).then(function(rep){
          console.log(rep)
        })  
      },
      submitRateDown ( id ) {
        var _this = this
        var reqData = {
          user_id: store.get('user_id'),
          store_id: _this.$route.query.store_id,
          order_id: _this.$route.query.order_id,
          goods_id: id
        }
        submitGoodsUnlike( reqData ).then(function(rep){
          console.log(rep)
        })
      },
      submitRate () {
        var _this =  this
        var reqData = {
          user_id: store.get('user_id'),
          store_id: _this.$route.query.store_id,
          order_id: _this.$route.query.order_id,
          score: $('.set-star .active').length - 1,
          comment: _this.comment
        }
        submitStoreGrade ( reqData ).then(function(rep){
          console.log(rep) 
        }) 
      }

    }
     
  }
</script>

<style lang="less">
  @import './rate.less';
</style>
