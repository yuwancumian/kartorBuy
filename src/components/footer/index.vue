<template>
  <footer>
    <div>待支付 <span> ¥ {{total_price | tofix}}</span></div>
    <router-link :to="url">{{title}}</router-link>
  </footer>
</template>

<script>
  export default {
    props:['title','total_price', 'url']
  }
</script>

<style lang="less">
  @import './footer.less';
</style>
