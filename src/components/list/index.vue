<template>
  <div class="list">
    <span>{{title}}：</span>   {{text}}
  </div>
</template>

<script>
  export default {
    props: ['title', 'text']
  }
</script>

<style lang="less">
  .list{
    line-height: 32px;
    span{
      display: inline-block;
      width: 70px;
      text-align: right;
    }
  }
</style>
