<template>
  
</template>

<script>
  export default {
    name: 'app-title',
    props: ['title'],
    created (){
      //document.title = this.title
      var reqData = {'title': this.title};
			JSBridge.callAPI('AppAPI.setTitle', reqData, function(json){
					
			});
    }
  }
</script>

<style lang="less">

</style>

