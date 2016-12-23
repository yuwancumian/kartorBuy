<template>
  <div class="row">
    <div class="col-4">
      <img class="item-pic" :src="product.picture" alt="">
    </div>
    <div class="col-12">
      <ul class="item-info">
        <li>
          <router-link :to="{path: '/goods/'+ product.goods_id}">
            {{product.name}}
          </router-link>
        </li>
        <li>月销量 {{product.quantity}} 
            好评度 {{product.u_like*100}}%</li>
        <li>{{product.price}}</li>
      </ul>
    </div>
    <div class="col-8">
    <counter v-on:addPrice="addItemPrice" v-on:minusPrice="minusItemPrice"></counter>
    </div>
    
  </div>
</template>

<script>
  import Counter from '../../components/counter'
  export default {
    props: ['product', 'index'],
    components: {
      Counter
    },
    data() {
      return {
        itemPrice: 0,
        good_num: 0,
        good_list: []
      }
    },
    methods:{
      addItemPrice(counter){
        var _this = this
        this.itemPrice = (counter * this.product.price).toFixed(2)
        this.$emit('addPrice',this.product.price)
        
        // 缓存购物车信息,存入父组件good_list
        this.good_num += 1
        if (this.good_num === 1 ) {
          this.$parent.good_list.push({
            good_id: this.product.goods_id,
            good_num: this.good_num
          })
          console.log('数组长度:' +this.$parent.good_list.length)
        } 
        if (this.good_num > 1) {
          function modifyThisItem (el){
            if ( el.good_id === _this.product.goods_id) {
              el.good_num = _this.good_num
            }
          }
          this.$parent.good_list.forEach(modifyThisItem)
        }
        console.log(this.$parent.good_list)
      },
      minusItemPrice(counter){
        var _this = this
        this.itemPrice = (counter * this.product.price).toFixed(2)
        this.$emit('minusPrice',this.product.price)

        //缓存购物车，存入父组件good_list
        this.good_num -= 1
        if ( this.good_num === 0 ) {
          function removeThisItem (el,index) {
            if ( el.good_id === _this.product.goods_id) {
              _this.$parent.good_list.splice(index,1) 
            }
          } 
          this.$parent.good_list.forEach(removeThisItem)
        } else {
          function selectThisItem (el){
            if ( el.good_id === _this.product.goods_id) {
              el.good_num = _this.good_num
            }
          }
          this.$parent.good_list.forEach(selectThisItem)
        }
        console.log('数组长度:' +this.$parent.good_list.length)
        console.log(this.$parent.good_list)
      }
    },
    updated(){
    }
  }
</script>

<style lang="less">

</style>
