<template>
  <div class="counter">
    <a @click.prevent="add" class="icon-add"></a>
    <span class="num" v-bind:class="{show: isShow}">{{counter}}</span>
    <a @click.prevent='minus' class="icon-minus" v-bind:class="{show: isShow}"></a>
    <div class="icon-return" v-if="no_return" >
    </div>
  </div>
</template>

<script>  
  export default {
    data: function() {
      return {
        counter: 0,
        isShow: false
      }
    },
    props:['no_return'],
    methods: {
      add: function(){
        this.counter += 1
        this.$emit('addPrice',this.counter)
        if (this.counter > 0){
          this.isShow = true
        }
      },
      minus: function(){
        if ( this.counter > 0) {
          this.counter -= 1
          this.$emit('minusPrice',this.counter)
        }
        if (this.counter == 0 ) {
          this.isShow = false
        }
      }
    }
  }
</script>

<style lang="less">
  @import './counter.less';
</style>
