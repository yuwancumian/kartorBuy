<template>
	<div class="goods-info">
		<header>
			<img :src="goods_info.picture" alt="">
		</header>
    <div class="single-panel">
      <div class="container">
        <ul class="item-info">
          <li>{{goods_info.name}}</li>
          <li>月销量{{goods_info.saled}}  
            <span v-if="total>0"> 好评度 {{percent}}% </span>
            <span v-else> 暂无评价</span>
          </li>
          <li>{{goods_info.price}}</li>
        </ul>
        <counter v-on:addPrice="addP" v-on:minusPrice="minusP" > </counter>
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
      url="/inputInfo" 
      :total_price="total_price">
    </app-footer>
	</div>
</template>

<script>
import {Cell} from 'mint-ui'
import { Progress } from 'mint-ui'
import Counter from '../../components/counter'
import AppHeader from '../../components/header'
import AppFooter from '../../components/footer'
import {getGoodsInfo} from '../../libs/api.js'

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
      good_num: 0
    }
  },
  computed: {
    total: function() {
      return this.goods_info.dislike_count + this.goods_info.like_count
    },
    percent: function(){
      return Math.floor(100*this.goods_info.like_count/this.total)
    }
  },
  methods: {
    addP: function(counter){
      this.total_price = counter * this.goods_info.price
      console.log(this.total_price)
      this.goods_info.good_num = counter
    },
    minusP: function(counter){
      this.total_price = counter * this.goods_info.price
      console.log(counter)
    }
  },
  created(){
    var _this = this
    console.log()
    getGoodsInfo(this.$route.params.id)
      .then(function(rep){
        console.log(rep.data)
        _this.goods_info = rep.data.data
      })
  },
  beforeRouteLeave (to, from, next) {
    if ( to.path === "/inputInfo") {
      store.set("good_list",[{
        "good_id": this.goods_info.id,
        "good_num": this.goods_info.good_num
      }])
      store.set("store_id",this.goods_info.store_id)
      console.log(store.get("good_list"))
    }
    next()
  }
}
</script>

<style lang="less">
@import '../../assets/less/var.less';
.goods-info{
  background: #fff;
  min-height: 100vh;
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
  }
  footer{
    position: fixed;
    bottom:0;
  }
  .item-info{
    margin: 0;
    padding-left: 10px;
    line-height: 20px;
    li:nth-of-type(1){
      font-size: 16px;
    }
    li:nth-of-type(2){
      font-size: 12px;
      color: #666;
    }
    :nth-child(3){
      font-size: 16px;
      color: $c_red;
    }
  }
}
</style>
