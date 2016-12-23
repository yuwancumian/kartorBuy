<template>
  <div class="ot-step" v-bind:class="{'no-desc': !isDesc}">
    <slot><div class="ot-step-dot"></div></slot>
    <div class="ot-step-main">
      <div class="title">{{title}}
        <span>{{label}}</span>
      </div>
      <p v-if="isDesc">{{desc}}</p>
    </div>
    <div class="ot-step-tail"></div>
  </div>
</template>

<script>
  import OtCell from '../cell'
  export default {
    components:{
      OtCell
    },
    props: ['title', 'label', 'desc'],
    data (){
      return {
        isDesc: true
      }
    },
    created (){
      if (this.desc) {
        this.isDesc = true
      } else {
        this.isDesc = false
      }
    }
  }
</script>

<style lang="less">
  @import './step.less';
</style>
