<template>
  <div class="like">
    <a class="icon-like tap-link" href="javascript: void(0)" @click="toggleUp" :class="{active: up}"></a>
    <a class="icon-dislike tap-link" href="javascript: void(0)" @click="toggleDown" :class="{active: down}"></a>  
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
          this.$emit('handleUp')
        }
        
      },
      toggleDown(){
        if (this.up == false){
          this.down = !this.down
          this.$emit('handleDown')
        }
      }
    }
    
  }
</script>

<style lang="less">

</style>
