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
  import { getShopList, getCarPosition, getUserInfo, getOrderNotend } from '../../libs/api.js'

  export default {
    data(){
      return {
        shops:[
        ],
        user_id: 0,
        license_plate: '',
        contact_name: '',
        contact_mobile: 0,
        open_car_id: 0
      }

    },
    created(){
      var _this = this

      getShopList()
        .then(function(rep){
          _this.shops = rep.data.data
          console.log(_this.shops)
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(106.539594,29.579195);
          map.centerAndZoom(point, 12);
          map.disableDoubleClickZoom(true);
          var iconDrink = new BMap.Icon('http://easier.b0.upaiyun.com/icon-drink1.png',new BMap.Size(28,54),{//是引用图标的名字以及大小，注意大小要一样
            anchor: new BMap.Size(10, 30)//这句表示图片相对于所加的点的位置
          })
          var iconFood = new BMap.Icon('http://easier.b0.upaiyun.com/icon-food1.png', new BMap.Size(28,33),{
            anchor: new BMap.Size(10, 30)
          })
          var iconSiga = new BMap.Icon('http://easier.b0.upaiyun.com/icon-siga1.png', new BMap.Size(28,47),{
            anchor: new BMap.Size(10, 30)
          })
          var iconShop = new BMap.Icon('http://easier.b0.upaiyun.com/icon-shop1.png', new BMap.Size(50,41),{
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
        // _this.user_id = 42
        _this.license_plate = rep.data.data.license_plate
        _this.contact_name = rep.data.data.real_name
        _this.contact_mobile = rep.data.data.contact_mobile
        _this.open_car_id = rep.data.data.open_car_id

        store.set('user_id',_this.user_id)
        if ( _this.license_plate ) {
          store.set('license_plate',_this.license_plate)
        }
        if (_this.contact_name ) {
          store.set('contact_name', _this.contact_name)
        }
        if ( _this.contact_mobile) {
          store.set('contact_mobile', _this.contact_mobile)
        }
      })
      getOrderNotend(store.get('user_id')).then(function(rep){
         if (rep.data.data.length > 0) {
           _this.$router.push({ path: 'confirm', query: { order_id: rep.data.data[0]['order_id'] }})
         }
      })
      getCarPosition(_this.open_car_id)
        .then(function(rep){
          store.set('car_position',rep.data.data)
          //console.log(store.get('position'))
        })
        .catch(function(error){
          console.log(error)
        })
    },
    mounted(){
      var _this = this
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
