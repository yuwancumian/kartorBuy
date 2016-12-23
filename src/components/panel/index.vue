<template>
  <div class="ot-panel">
    <h3> {{title}}</h3>
    <div class="ot-panel-bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>

<style lang="less">
  @import './panel.less';
</style>
