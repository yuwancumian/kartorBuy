<template>
  <div class="shop" :class="{closed: is_onsale==2}">
    <div class="shop-header">
      <div class="container">
        <div class="row title">
          <div class="col-4">
            <img :src="store_icon" alt="">
          </div>
          <div class="col-12">
            {{store_name}}
            <br>
            <span class="onsale">
              {{onsale_start}}  -  {{onsale_end}}
            </span>
          </div>
        </div>
        
        
        <div class="discount" @click="openModal">
          <span class="icon-discount" ></span>
          全场 {{discount*10}} 折
        </div>
      </div>
    </div>
    <div class="shop-list">
      <item 
        v-for="(product, index) in products"
        v-bind:product = "product"
        v-bind:index = "index"
        :is_onsale = "is_onsale"
        @addPrice = "addTotalPrice"
        @minusPrice = "minusTotalPrice"
      >
      </item>
    </div>
    <app-footer 
      title="去结算" 
      :total_price="total_price"
      :url="url" v-if="is_onsale<2">
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
  </div>
</template>

<script>
  import AppFooter from '../../components/footer'
  import Item from './item.vue'
  import Modal from '../../components/modal'
  import Star from './star.vue'
  import { MessageBox, Indicator } from 'mint-ui'
  import { getStoreInfo, getGoodsList, getStoreNotice, submitOrder } from '../../libs/api.js'
  export default {
    data () {
      return {
        store_name: '7-11便利店',
        store_icon: '',
        total_price: 0,
        discount: 0.95,
        onsale_start: "8:00",
        onsale_end: "19:30",
        is_onsale: 1,
        avg_rating: 3,
        products:[
          {
            product_title: '香菇粉丝素菜包',
            product_price: '12.20',
            percent: '90%',
            sale: 32
          },
          {
            product_title: '王老吉wanglaoji',
            product_price: '21.10',
            percent: '22%',
            sale: 12
          }
        ],
        modal_display: false,
        goods_list:[]
      }
    },
    components: {
      Item,
      AppFooter,
      Modal,
      Star,
      MessageBox
    },
    methods:{
      addTotalPrice(itemPrice){
        this.total_price += parseFloat(itemPrice)
        console.log((this.total_price).toFixed(2))
      },
      minusTotalPrice(itemPrice){
        this.total_price -= parseFloat(itemPrice)
        console.log((this.total_price).toFixed(2))
      },
      openModal(){
        this.modal_display = true
        console.log(111)
      }
      
    },
    computed: {
      url () {
        if ( store.get('contact_name') && store.get('contact_mobile') ) {
          return '/pay'
        } else {
          return '/inputInfo'
        }
      }
    },
    created(){
      var _this = this
      var id = _this.$route.params.id
      this.goods_list = []
      getStoreInfo(id).then(function(rep){
        _this.store_name = rep.data.data.store_name
        _this.store_icon = rep.data.data.store_icon
        _this.onsale_start = rep.data.data.onsale_start
        _this.onsale_end = rep.data.data.onsale_end
        _this.avg_rating = rep.data.data.avg_rating
        _this.is_onsale = rep.data.data.is_onsale
      })
      getStoreNotice(id).then(function(rep){
        _this.discount = rep.data.data.discount
        console.log(rep.data.data.discount)
      })
      getGoodsList(id).then(function(rep){
        console.log(rep.data.data)
        _this.products = rep.data.data        
      })
      console.log(_this.is_onsale)
    },
    beforeRouteLeave ( to, from, next ) {
      if ( to.path === "/inputInfo" ) {
        store.set("goods_list", this.goods_list)
        store.set("store_id", this.$route.params.id)
        next()
      } 
      else if ( to.path === "/pay" ) {
        if ( this.goods_list.length == 0 ) {
          MessageBox('提示', '请选择商品')
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
            console.log(rep) 
            Indicator.close()
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
  @import './shop.less';
</style>
