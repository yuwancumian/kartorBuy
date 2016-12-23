<template>
  <ul class="pay-mode">
    <li 
      @click = "$parent.selected = 1"
      :class="{active: $parent.selected == 1}" id="1">
      <span class="icon-wx"></span> <span>微信支付</span> <p></p>
      
    </li>
    <li
      @click = "$parent.selected = 2"
      :class="{active: $parent.selected == 2}" id="2">
      <span class="icon-ali"></span><span>支付宝</span> <p></p>
    </li>
  </ul>
</template>

<script>
  export default {
    created (){
      console.log(this.$parent.selected)
    }
  }
</script>

<style lang="less">

</style>
