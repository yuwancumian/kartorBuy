<template>
	<div class="goods-info">
		<header>
			<img :src="goods_info.picture.split(',')[0]" alt="">
		</header>
    <div class="single-panel">
      <div class="container">
        <ul class="item-info">
          <li>{{goods_info.name}}</li>
          <li>  
            <span v-if="total>0"> 好评度 {{percent}}% </span>
          </li>
          <li>¥ {{goods_info.price}}</li>
        </ul>
        <counter v-on:addPrice="addP" v-on:minusPrice="minusP" > </counter>
        <div class="icon-return" v-if="goods_info.is_refundable == 2"></div>
      </div>
    </div>
    <div class="single-panel">
      <div class="container" v-if="total>0">
        <h4>商品评价</h4>
        <p>好评度 {{percent}} %</p>
        <div class="updown">
          <div class="up">
            <span class="icon-up"></span>
            {{goods_info.like_count}}
          </div>
          <div class="down">
            {{goods_info.dislike_count}}
            <span class="icon-down"></span>
          </div>
        </div>
        <mt-progress :value="percent" :bar-height="3"></mt-progress>
      </div>
      <div class="container" v-else>
        <h4>商品评价</h4>
        <div class="no-comm">
          暂无评价
        </div>
      </div>
    </div>
    <!-- <mt-cell title="saf" value="111"> </mt-cell> -->
    <app-footer 
      title="去结算" 
      :url="url" 
      :total_price="total_price">
    </app-footer>
	</div>
</template>

<script>
import {Cell} from 'mint-ui'
import { Progress, MessageBox, Indicator } from 'mint-ui'
import Counter from '../../components/counter'
import AppHeader from '../../components/header'
import AppFooter from '../../components/footer'
import { getGoodsInfo, submitOrder } from '../../libs/api.js'

export default {
  components: {
    Cell,
    Counter,
    AppHeader,
    AppFooter
  },
  data () {
    return {
      goods_info:{
        id: 12,
        name: '香菇粉丝素菜',
        price: 22.3,
        saled: 11,
        dislike_count: 3,
        like_count: 3,
        no_return: true,
        picture: ''
      },
      total_price: 0.00,
      goods_num: 0,
      goods_list: [],
      order_id: ''
    }
  },
  computed: {
    total: function() {
      return this.goods_info.dislike_count + this.goods_info.like_count
    },
    percent: function(){
      return Math.floor(100*this.goods_info.like_count/this.total)
    },
    url () {
      if ( store.get('contact_name') && store.get('contact_mobile') ) {
        return '/pay'
      } else {
        return '/inputInfo'
      }
    }
  },
  methods: {
    addP: function(counter){
      this.total_price = counter * this.goods_info.price
      console.log(this.total_price)
      this.goods_num = counter
      console.log(this.goods_num)
      if ( this.goods_num === 1 ) {
        this.goods_list.push({
          goods_id: parseInt(this.$route.params.id),
          goods_num: this.goods_num
        })
      } 
      if ( this.goods_num > 1 ) {
        this.goods_list[0].goods_num = this.goods_num
      }
      console.log(this.goods_list)
    },
    minusP: function(counter){
      this.total_price = counter * this.goods_info.price
      this.goods_num = counter

      if (this.goods_num === 0) {
        this.goods_list = []
      } else {
        this.goods_list[0].goods_num = this.goods_num
      }
      console.log(this.goods_list)
    }
  },
  created(){
    var _this = this
    _this.goods_list = []
    console.log()
    getGoodsInfo(this.$route.params.id)
      .then(function(rep){
        console.log(rep.data)
        _this.goods_info = rep.data.data
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  beforeRouteLeave (to, from, next) {
    var _this = this
    if ( to.path === "/inputInfo") {
      if ( this.goods_list.length == 0 ) {
        MessageBox('提示', '请添加商品')
      } else {
        store.set("goods_list",[{
          "goods_id": this.goods_info.id,
          "goods_num": this.goods_info.goods_num
        }])
      }
      store.set("store_id",this.goods_info.store_id)
      console.log(store.get("goods_list"))
      next()
    } else if (to.path === "/pay") {
      if ( this.goods_list.length == 0 ) {
        MessageBox('提示', '请添加商品')
      } else {
        var reqData = {
          store_id: store.get("store_id"),
          license_plate: "ysd20009",
          contact_name: this.contact_name,
          contact_mobile: this.contact_mobile,
          goods_list: this.goods_list
        }

        console.log(this.goods_list)
        Indicator.open()
        submitOrder(reqData).then(function(rep){
          console.log(rep) 
          Indicator.close()
          _this.order_id = rep.data.data.order_id
          store.set('order_id', _this.order_id)
          next()
        })
        .catch(function(error){
          console.log(error)
        })
      }
    } else {
      next()
    }
  }
}
</script>

<style lang="less">
@import '../../assets/less/var.less';
.goods-info{
  background: #fff;
  min-height: 100vh;
  padding-bottom: 48px;
  .container{
    position: relative;
    .icon-return{
      width: 52px;
      position: absolute;
      top: 0px;
      right: 10px;
    }
    .counter{
      top: auto;
      bottom: 3px;
    }
  }
	header{
		img{
			width: 100%;
		}
	}
  .updown{
    clear: both;
    .up{
      float: left;
    }
    .down{
      float: right;
    }
  } 
  .mt-progress{
    clear: both;
  }
  p{
    text-align: center;
  }
  h4{
    margin: 6px 0;
    font-weight: normal;
  }
  .mt-progress-progress{
    background: @color-primary; 
  }
  .no-comm{
    text-align: center;
    height: 100px;
    line-height: 100px;
    color: #c9c9c9;
  }
  footer{
    position: fixed;
    bottom:0;
  }
  .item-info{
    margin: 0;
    padding-left: 10px;
    line-height: 20px;
    min-height: 60px;
    li:nth-of-type(1){
      font-size: 16px;
    }
    li:nth-of-type(2){
      font-size: 12px;
      color: #666;
    }
    :nth-child(3){
      font-size: 16px;
      color: #f43530;
    }
  }
}
</style>
