<template>
  <div class="shop" :class="{closed: is_onsale==2}">
    <div class="shop-header">
      <div class="container">
        <div class="row title">
          <div class="col-4">
            <img :src="store_icon" alt="">
          </div>
          <div class="col-12">
            <!-- -->
            <div class="store-name">{{store_name}} </div>
            <span class="onsale" v-if="is_onsale == 1">
              {{onsale_start}}  至  {{onsale_end}}
            </span>
            <span class="onsale" v-else>
              歇业中
            </span>
          </div>
        </div>
        
        
        <div class="discount" @click="openModal" v-if="discount!=''&&discount!=1">
          <span class="icon-discount" ></span>
          全场 {{discount*10}} 折
        </div>
      </div>
    </div>
    <div class="content">
    <div class="swipe" v-if="products.length > 0 && slide.length> 0 ">
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
      <div class="road">
        <span v-if="is_two_sides==1"> 支持对面道路取货</span>
        <span v-else> 不支持对面道路取货</span>
      </div>
    </div>
    <div class="shop-list" 
      v-if="products.length > 0"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="false"
      infinite-scroll-distance="10">
        <item 
          v-for="(product, index) in products"
          v-bind:product = "product"
          v-bind:index = "index"
          :is_onsale = "is_onsale"
          @addPrice = "addTotalPrice"
          @minusPrice = "minusTotalPrice">
        </item>
        <!-- <p v-show="loading" class="page-infinite-loading"> -->
        <!--   <mt-spinner type="fading-circle"></mt-spinner> -->
        <!--   <br> -->
        <!--   加载中... -->
        <!-- </p> --> 
      
    </div>
    <div class="no-goods" v-else>
        <img src="../../assets/images/icon-empty.png" alt="">
        <br>
        <br>
        亲，商家暂无商品出售!
    </div>
    </div>
    <app-footer 
      title="去结算" 
      :total_price="total_price"
      :url="url" 
      v-if="is_onsale<2"
      :class="{active: is_active}"
      >
    </app-footer>
    <div class="submit-btn" v-else>
      商家休息中，暂不接单
    </div>
    <modal v-if="modal_display"> 
      <div class="rate-grade">
        <h3>{{store_name}}</h3>
        <div class="set-star">
          <Star v-for="n in 5" 
            class="icon-star" 
            :class="{active: n <= avg_rating}">
          </Star>
        </div>
      </div>
      <div class="discount-info">
        <h4>优惠信息</h4>
        <ul>
          <li>
            <span class="icon-discount"></span>
            全场 {{discount*10}} 折
          </li>
          <!-- <li> -->
          <!--   <span class="icon-full"></span> -->
          <!--   满10送养乐多（小）一瓶 -->
          <!-- </li> -->
        </ul>
      </div>
    </modal>
    <app-title title="驾图购"> </app-title>
  </div>
</template>

<script>
  import AppFooter from '../../components/footer'
  import Item from './item.vue'
  import Modal from '../../components/modal'
  import Star from './star.vue'
  import { MessageBox, Indicator, InfiniteScroll, Spinner, Swipe, SwipeItem } from 'mint-ui'
  import { getStoreInfo, getGoodsList, getStoreNotice, submitOrder } from '../../libs/api.js'
  export default {
    data () {
      return {
        store_name: '',
        store_icon: '',
        total_price: 0,
        discount: '',
        onsale_start: "8:00",
        onsale_end: "19:30",
        is_onsale: 1,
        avg_rating: 0,
        loading: false,
        page: 1,
        slide: [],
        is_active: false,
        is_two_sides: 0,
        products:[
          {
            thumbnail: '',
            product_title: '香菇粉丝素菜包',
            product_price: '12.20',
            percent: '90%',
            sale: 32
          }
        ],
        modal_display: false,
        goods_list:[],
        order_id: '',
        url: ''
      }
    },
    components: {
      Item,
      AppFooter,
      Modal,
      Star,
      MessageBox,
      InfiniteScroll
    },
    methods:{
      addTotalPrice(itemPrice){
        this.total_price += (parseFloat(itemPrice))*this.discount
        if (this.total_price > 0) {
          this.is_active = true
        }
        console.log((this.total_price).toFixed(2))
      },
      minusTotalPrice(itemPrice){
        this.total_price -= (parseFloat(itemPrice))*this.discount
        if ( this.total_price == 0) {
          this.is_active = false
        }
        console.log((this.total_price).toFixed(2))
      },
      openModal(){
        this.modal_display = true
      },
      loadMore(){
        var _this = this
        Indicator.open()
        _this.loading = true
        var id = _this.$route.params.id
        setTimeout(() => {
          console.log('add more!')
          _this.page += 1
          console.log(_this.page)
          getGoodsList(id,_this.page).then(function(rep){
            var newList = rep.data.data    
            _this.products.push(...newList)  
            if ( newList.length < 15 ) {
              _this.loading = true
              return false 
            }      
          })
          this.loading = false
          Indicator.close()
        },1600);
      }
      
    },


    created(){
      const _this = this
      const id = _this.$route.params.id
      const page = _this.page

      Indicator.open()
      this.goods_list = []
      if ( store.get('contact_name') && store.get('contact_mobile') ) {
           _this.url = '/pay'
      } else {
        _this.url = '/inputInfo'
      }
      getStoreInfo(id).then(function(rep){
        _this.store_name = rep.data.data.store_name
        _this.store_icon = rep.data.data.store_icon
        _this.onsale_start = rep.data.data.onsale_start
        _this.onsale_end = rep.data.data.onsale_end
        _this.avg_rating = rep.data.data.avg_rating
        _this.is_onsale = rep.data.data.is_onsale
        _this.is_two_sides = rep.data.data.is_two_sides
        _this.slide = rep.data.data.picture.split(',').reverse()
        store.set('is_onsale', _this.is_onsale)
        console.log('created' +_this.store_name)
      })
      getStoreNotice(id).then(function(rep){
        if (rep.data.data.discount) {
          _this.discount = rep.data.data.discount
          store.set('discount', _this.discount)
        } else {
          _this.discount = 1
          store.set('discount', _this.discount)
        }
      })
      getGoodsList(id,page).then(function(rep){
        Indicator.close()
        _this.products = rep.data.data        
      })
    
      // $(window).on('scroll', function(){
      //   var y_scroll_pos = window.pageYOffset;
      //   var scroll_pos_test = 100;
      //   var header_height = $('.shop-header').height()
      //   console.log(header_height)
      //   if(y_scroll_pos > scroll_pos_test) {
      //       //do stuff
      //     $('.swipe').addClass('folding')
      //     $('.road').addClass('folding')
      //   }
      //   if(y_scroll_pos < 10) {
      //     $('.swipe').removeClass('folding')
      //     $('.road').removeClass('folding')
      //   }
      // })
    },
    mounted (){
      setTimeout( function () {
          var shop_header = document.querySelector('.shop-header')
          var content = document.querySelector('.content') 
          var header_height = shop_header.offsetHeight
          shop_header.style.position = 'fixed'
          content.style.marginTop = header_height + 'px'
      },200)
    },

    beforeRouteLeave ( to, from, next ) {
      var _this = this
      // if ( to.path === "/inputInfo" ) {
      //   if (this.goods_list.length == 0 ) {
      //     MessageBox('提示', '请添加商品')
      //   } else {
      //     store.set("goods_list", this.goods_list)
      //     store.set("store_id", this.$route.params.id)
      //     next()
      //   }
      // } 
      // else if ( to.path === "/pay" ) {
      if ( to.path === "/pay" || to.path === '/inputInfo' ) {
        if ( this.goods_list.length == 0 ) {
          MessageBox('提示', '请添加商品')
        } else {
          var reqData = {
            user_id: store.get("user_id"),
            store_id: this.$route.params.id,
            license_plate: store.get('license_plate'),
            contact_name: store.get("contact_name"),
            contact_mobile: store.get("contact_mobile"),
            goods_list: this.goods_list
          }

          console.log(this.goods_list)
          Indicator.open()
          submitOrder(reqData).then(function(rep){
            Indicator.close()
            if (rep.data.code == 2) {
              MessageBox({
                title: '提示',
                message: rep.data.message
              })
              return
            } else if (rep.data.code == 3) {
               MessageBox({
                title: '提示',
                message: '抱歉，商品已下架'
              })
              return
            } else if (rep.data.code == 4) {
               MessageBox({
                title: '提示',
                message: '抱歉，商店已歇业'
              })
              return
            } else if (rep.data.code == 5) {
               MessageBox({
                title: '提示',
                message: '抱歉，商店未营业'
              })
              return
            } else if (rep.data.code == 6) {
               MessageBox({
                title: '提示',
                message: '抱歉，您有未结束订单'
              })
              return
            } else {
             
              // _this.$router.push('/pay')
              _this.order_id =rep.data.data.order_id
              store.set('order_id', _this.order_id)
              }
              next()              
            })
            .catch(function(err){
              Indicator.close()
              console.log(err) 
            }
          )
        }
      } else {
        next()
      }

    }
  }
</script>

<style lang="less">
  @import './shop.less';
</style>
