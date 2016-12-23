<template>
<div class="ot-cell">
  <div class="container">
    <div class="ot-cell-hd">
    
    </div>
    <div class="ot-cell-bd">
      {{title}}
    </div>
    <div class="ot-cell-ft" :class="{'with-arrow': isLink}" v-if="label">
      {{label}} 
    </div>
</div>
</template>

<script>
  export default {
    props: {
      title: {
        type: [String, Number],
        required: true
      },
      label: {
        type: [String, Number]
      },
      isLink: {
        type: Boolean
      }
    }
  }
</script>

<style lang="less">
  @import './cell.less';
</style>
