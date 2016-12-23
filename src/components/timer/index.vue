<template>
  <div class="tips">
    支付剩余时间 {{child_time | toMinite}} 
  </div>
</template>

<script>
  export default {
    props: ['left_time'],
    data(){
      return {
        child_time: this.left_time 
      }
    },
    filters: {
      toMinite (value){
        return  Math.round(value/60) + ' 分 '+ value%60 + ' 秒'
      }
    },
    mounted: function(){
      var _this = this;
      var x = setInterval(function(){
        if (_this.child_time > 0){
          _this.child_time--
        } else {
          clearInterval(x)
        }
      },1000)
    }
  }
</script>

<style lang="less">
  
</style>
