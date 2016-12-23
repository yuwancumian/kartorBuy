<template>
  <div class="ot-field">
    <div class="ot-title">
      {{title}}
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props:['title']
  }
</script>

<style lang="less">
  .ot-field{
    .ot-title{
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      font-size: 14px;
      color: #666;
    }
    input{
      height: 40px;
      width: 100%;
    }
  }
</style>
