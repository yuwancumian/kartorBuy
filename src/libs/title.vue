<template>
  
</template>

<script>
  export default {
    name: 'app-title',
    props: ['title'],
    created (){
      //document.title = this.title
      if (!('JSBridge' in window)) {
        return;
      }
      var reqData = {'title': this.title};
			JSBridge.callAPI('AppAPI.setTitle', reqData, function(json){
					
			})
      
    }
  }
</script>

<style lang="less">

</style>

