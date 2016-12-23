<template>
  <div class="set-star">
    <a class="icon-star"
      v-for = "n in 5"
      v-updateStyle
      >
    </a>
    <a class="icon-star active" v-show="false" >
    </a>
  </div>
</template>

<script>
  export default {
    directives: {
      updateStyle (el){
        //var that = this
        el.onclick = function(e){
          var star = document.querySelectorAll('.icon-star')
          var idx = [].indexOf.call(star, e.currentTarget)
          for (var i=0; i< 5; i++){
            if (i<= idx) {
              star[i].classList.add('active') 
            } else {
              star[i].classList.remove('active') 
            }
          } 
        }
      }
    }
  }
</script>

<style lang="less">
  .icon-star{
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }
</style>
