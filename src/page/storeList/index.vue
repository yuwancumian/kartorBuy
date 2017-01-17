<template>
  <div class="location">
    <div id="allmap"></div>
    <router-link to="/">
      <div class="tips">
        了解驾图购
      </div>
    </router-link>
    <router-link to="orderList"><div class="icon-order"></div></router-link>
    <app-title title="驾图购"> </app-title>
  </div>
</template>

<script>
  import { getShopList, getUserInfo, getCarPosition } from '../../libs/api.js'

  export default {
    data(){
      return {
        shops:[
        ]
      }
    
    },
    created(){
      var _this = this
      getShopList().then(function(rep){
      _this.shops = rep.data.data
      console.log(_this.shops)
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(106.539594,29.579195);
      map.centerAndZoom(point, 13);
      map.disableDoubleClickZoom(true);
      var iconDrink = new BMap.Icon('http://easier.b0.upaiyun.com/icon-drink.png',new BMap.Size(37,71),{//是引用图标的名字以及大小，注意大小要一样
        anchor: new BMap.Size(10, 30)//这句表示图片相对于所加的点的位置
      })
      var iconFood = new BMap.Icon('http://easier.b0.upaiyun.com/icon-food.png', new BMap.Size(48,56),{
        anchor: new BMap.Size(10, 30) 
      })
      var iconSiga = new BMap.Icon('http://easier.b0.upaiyun.com/icon-siga.png', new BMap.Size(35,59),{
        anchor: new BMap.Size(10, 30) 
      })
      var iconShop = new BMap.Icon('http://easier.b0.upaiyun.com/icon-shop.png', new BMap.Size(57,47),{
        anchor: new BMap.Size(10, 30) 
      })
      for( var i = 0; i < _this.shops.length; i ++){
        var icon; 
        if  (_this.shops[i].store_type == 1 ){
          icon = iconDrink;
        } 
        if (_this.shops[i].store_type == 2){
          icon = iconFood;
        }
        if (_this.shops[i].store_type == 4){
          icon = iconSiga
        }
        if (_this.shops[i].store_type == 3){
          icon = iconShop
        }
        var point = new BMap.Point(_this.shops[i].longitude,_this.shops[i].latitude)
        var mark = new BMap.Marker( point, {icon: icon})
        map.addOverlay(mark)
        mark.href = _this.shops[i].store_id 
        mark.addEventListener("click",function(){
          console.log(_this.$router)
          _this.$router.push( { name: 'store', params: { id: this.href } } )
        }, false)  
      }
    })
    getUserInfo().then(function(rep){
      _this.user_id = rep.data.data.user_id
      _this.license_plate = rep.data.data.license_plate
      _this.contact_name = rep.data.data.real_name
      _this.contact_mobile = rep.data.data.contact_mobile
      _this.open_car_id = rep.data.data.open_car_id
      store.set('user_id',_this.user_id)
      store.set('license_plate',_this.license_plate)
      if (_this.contact_name ) {
        store.set('contact_name', _this.contact_name)
      }
      if ( _this.contact_mobile) {
        store.set('contact_mobile', _this.contact_mobile)
      }
    })
    getCarPosition('f157nnn235ff69c4d6f8ed5c475497b472cHHHHH')
      .then(function(rep){
        store.set('car_position',rep.data.data)
        //console.log(store.get('position'))
      })
      .catch(function(error){
        console.log(error)
      })
    },
    mounted(){
      console.log(_this.shops)   
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
    .tips{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
  }
</style>
