<template>
  <div class="row">
    <div class="col-5">
      <router-link :to="{path: '/goods/'+ product.goods_id}">
        <img class="item-pic" :src="product.picture | getIndex" alt="">
      </router-link>
    </div>
    <div class="col-11">
      <router-link :to="{path: '/goods/'+ product.goods_id}">
      <ul class="item-info">
        <li>
            {{product.name}}
        </li>
        <li>销量 {{product.quantity||0}}
           <span v-if="product.like_count!=0&&(product.like_count+product.dislike_count)>0"> 好评度 {{Math.floor(product.like_count/(product.like_count+product.dislike_count)*100)}}%</span>
           <span v-if="product.like_count==0&&(product.like_count+product.dislike_count)>0"> 好评度0%</span>
        </li>
        <li>¥ {{product.price}}</li>
      </ul>
      </router-link>
    </div>
    <div class="col-8" v-if="is_onsale==1">
    <counter v-on:addPrice="addItemPrice" v-on:minusPrice="minusItemPrice"></counter>
    </div>
    <div class="col-8" v-else>
      <span class="icon-add-gray"></span>
    </div>
    <div class="icon-return" v-if="product.is_refundable == 2">
    </div>
  </div>
</template>

<script>
  import Counter from '../../components/counter'
  export default {
    props: ['product', 'index', 'is_onsale'],
    components: {
      Counter
    },
    data() {
      return {
        itemPrice: 0,
        goods_num: 0,
        goods_list: []
      }
    },
    methods:{
      addItemPrice(counter){
        var _this = this
        this.itemPrice = (counter * this.product.price).toFixed(2)
        this.$emit('addPrice',this.product.price)

        // 缓存购物车信息,存入父组件goods_list
        this.goods_num += 1
        if (this.goods_num === 1 ) {
          this.$parent.goods_list.push({
            goods_id: this.product.goods_id,
            goods_num: this.goods_num
          })
          console.log('数组长度:' +this.$parent.goods_list.length)
        }
        if (this.goods_num > 1) {
          function modifyThisItem (el){
            if ( el.goods_id === _this.product.goods_id) {
              el.goods_num = _this.goods_num
            }
          }
          this.$parent.goods_list.forEach(modifyThisItem)
        }
        console.log(this.$parent.goods_list)
      },
      minusItemPrice(counter){
        var _this = this
        this.itemPrice = (counter * this.product.price).toFixed(2)
        this.$emit('minusPrice',this.product.price)

        //缓存购物车，存入父组件goods_list
        this.goods_num -= 1
        if ( this.goods_num === 0 ) {
          function removeThisItem (el,index) {
            if ( el.goods_id === _this.product.goods_id) {
              _this.$parent.goods_list.splice(index,1)
            }
          }
          this.$parent.goods_list.forEach(removeThisItem)
        } else {
          function selectThisItem (el){
            if ( el.goods_id === _this.product.goods_id) {
              el.goods_num = _this.goods_num
            }
          }
          this.$parent.goods_list.forEach(selectThisItem)
        }
        console.log('数组长度:' +this.$parent.goods_list.length)
        console.log(this.$parent.goods_list)
      }
    },
    filters: {
      getIndex(value){
        if(value) {
          return value.split(',')[0]
        } else {
          return ''
        }
      }
    }
  }
</script>

<style lang="less">

</style>
