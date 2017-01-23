<template>
  <div class="list">
    <span class="title">{{title}}</span> :   <div>{{text}}</div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'text']
  }
</script>

<style lang="less">
  .list{
    line-height: 30px;
    .title{
      display: inline-block;
      width: 64px;
    }
  }
</style>
