<template>
  <div class="rate">
    <div class="rate-title">
      <img :src="store_icon" alt="">
      <span>{{store_name}}</span>
    </div>
    <div class="rate-grade">
      <h3>商家服务评价</h3>
      <rater></rater>
    </div>
    <div class="rate-list">
      <h3>请选择您想推荐或吐槽的商品</h3>
      <ul>
        <li v-for = "goods in goods_list">
          <span>{{goods.goods_name}}</span>
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
  import { getOrderDetail, getStoreInfo, submitStoreGrade, submitGoodsLike, submitGoodsUnlike } from '../../libs/api.js'
  import { MessageBox } from 'mint-ui'
  export default {
    components: {
      Rater, UpDown
    },
    data () {
      return {
        store_icon:'',
        store_name:'',
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
      getStoreInfo(_this.$route.query.store_id).then(function(rep){
        _this.store_icon = rep.data.data.store_icon
        _this.store_name = rep.data.data.store_name
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
          MessageBox.confirm('评论成功！').then(() => {
            _this.$router.push('orderList')
          })
        }) 
      }

    }
     
  }
</script>

<style lang="less">
  @import './rate.less';
</style>
