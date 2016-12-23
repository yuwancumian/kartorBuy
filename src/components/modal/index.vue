<template>
  <div class="modal" >
    <slot></slot>
    <div class="icon-close" @click="closeModal">
    </div> 
  </div>
</template>

<script>
  export default {
    methods: {
      closeModal(){
        this.$parent.modal_display = false
      }
    }
  }
</script>

<style lang="less">
  .modal{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: black;
  }
</style>
