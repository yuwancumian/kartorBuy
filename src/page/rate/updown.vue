<template>
  <div class="like">
    <a class="icon-like" href="javascript: void(0)" @click="toggleUp" :class="{active: up}"></a>
    <a class="icon-dislike" href="javascript: void(0)" @click="toggleDown" :class="{active: down}"></a>  
  </div>
</template>

<script>
  export default {
    data (){
      return {
        up: false,
        down: false
      }
    },
    methods:{
      toggleUp(){
        if (this.down == false){
          this.up = !this.up 
        }
      },
      toggleDown(){
        if (this.up == false){
          this.down = !this.down
        }
      }
    }
    
  }
</script>

<style lang="less">

</style>
