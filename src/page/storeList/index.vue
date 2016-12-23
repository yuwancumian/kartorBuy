<template>
  <div class="location">
    <div id="allmap"></div>
    <router-link to="refund"><div class="icon-order"></div></router-link>
    <app-title title="驾图购"> </app-title>
  </div>
</template>

<script>
  import {getShopList} from '../../libs/api.js'

  export default {
    data(){
      return {
        shops:[
          {'location':[106.544589,29.583938],'type': 'drink'},
          {'location':[106.537187,29.587456],'type': 'food'},
          {'location':[106.540923,29.576274],'type': 'shop'},
          {'location':[106.541183,29.578274],'type': 'siga'}
        ]
      }
    
    },
    created(){
      var that = this
       getShopList()
        .then(function(rep){
          //that.shops = data
          console.log(rep.data.data)
          //console.log(that.shops)
        })
    },
    mounted(){
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(106.539594,29.579195);
      map.centerAndZoom(point, 15);
      map.disableDoubleClickZoom(true);
      var iconDrink = new BMap.Icon('http://easier.b0.upaiyun.com/icon-drink.png',new BMap.Size(37,71),{//是引用图标的名字以及大小，注意大小要一样
  anchor: new BMap.Size(10, 30)//这句表示图片相对于所加的点的位置
});
      var iconFood = new BMap.Icon('http://easier.b0.upaiyun.com/icon-food.png', new BMap.Size(48,56),{
        anchor: new BMap.Size(10, 30) 
      })
      var iconSiga = new BMap.Icon('http://easier.b0.upaiyun.com/icon-siga.png', new BMap.Size(35,59),{
        anchor: new BMap.Size(10, 30) 
      })
      var iconShop = new BMap.Icon('http://easier.b0.upaiyun.com/icon-shop.png', new BMap.Size(57,47),{
  anchor: new BMap.Size(10, 30) 
})
      for( var i = 0; i < this.shops.length; i ++){
        var icon; 
        if  (this.shops[i].type === 'drink' ){
          icon = iconDrink;
        } 
        if (this.shops[i].type === 'food'){
          icon = iconFood;
        }
        if (this.shops[i].type === 'siga'){
          icon = iconSiga
        }
        if (this.shops[i].type === 'shop'){
          icon = iconShop
        }
        var point = new BMap.Point(this.shops[i].location[0],this.shops[i].location[1])
        var mark = new BMap.Marker( point, {icon: icon});
        map.addOverlay(mark);
      }
    }
  }
</script>

<style lang="less">
  #allmap{
    width: 100vw;
    height: 100vh;
  }
  .location{
    .icon-order{
      position: absolute;
      bottom: 2rem;
      right: 2em;
    }
  }
</style>
