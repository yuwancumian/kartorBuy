<template>
  <ul class="ot-navbar">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    props: {value: {}},
    created(){
      console.log(this.value)
    }
  }
</script>

<style lang="less">
  .ot-navbar{
    background: #fff;
    height: 40px;
    border-bottom: 1px solid #E5E5E5;
    margin: 0;
    li{
      width: 50%;
      float: left;
      &:first-child{
        position: relative;
        :after{
          content: '';
          top: 6px;
          right: 0;
          width: 2px;
          height: 26px;
          position: absolute;
          border-left: 1px solid #E5E5E5;
        }
      }
    }
    a{
      display: block;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 60%;
      margin: auto;
      color: #333;
      text-decoration: none;
	-webkit-tap-highlight-color: transparent;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
    }
    .active a{
      border-bottom: 1px solid #ffae00;
      color: #ffae00;
    }
  }
</style>
