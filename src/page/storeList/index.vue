<template>
  <div class="location">
    <app-title title="驾图购"> </app-title>
    <div id="allmap"></div>
    <router-link to="/">
      <div class="tips">
        了解驾图购
      </div>
    </router-link>
    <router-link to="orderList"><div class="icon-order"></div></router-link>
    
  </div>
</template>

<script>
  import { getShopList, getCarPosition, getUserInfo, getOrderNotend } from '../../libs/api.js'
  import _ from 'lodash'


  export default {
    data(){
      return {
        shops:[
        ],
        moved: true,
        user_id: 0,
        license_plate: '',
        contact_name: '',
        contact_mobile: 0,
        open_car_id: 0
      }

    },  
    created(){
      var _this = this
      const bdkey = 'heM8vbaENjtTNGRMAEBwqzm8x6UCcYnZ'

      getShopList()
        .then(function(rep){
          _this.shops = rep.data.data


          var new_shops = []
          for( var i=0 ; i< _this.shops.length; i ++) {
            new_shops.push({})
            new_shops[i]['lat']= _.pick( _this.shops[i],"longitude","latitude" )['latitude']
            new_shops[i]['lon']= _.pick( _this.shops[i],"longitude","latitude" )['longitude']
          }
          console.log(new_shops)
          
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(106.507152,29.617994);
          map.centerAndZoom(point, 16);
          map.disableDoubleClickZoom(true);
          var iconDrink = new BMap.Icon(require('../../assets/images/icon-drink.png'),new BMap.Size(28,54),{//是引用图标的名字以及大小，注意大小要一样
            anchor: new BMap.Size(10, 30)//这句表示图片相对于所加的点的位置
          })
          var iconFood = new BMap.Icon(require('../../assets/images/icon-food.png'), new BMap.Size(28,33),{
            anchor: new BMap.Size(10, 30)
          })
          var iconSiga = new BMap.Icon(require('../../assets/images/icon-siga.png'), new BMap.Size(28,47),{
            anchor: new BMap.Size(10, 30)
          })
          var iconShop = new BMap.Icon(require('../../assets/images/icon-shop.png'), new BMap.Size(45,37),{
            anchor: new BMap.Size(10, 30)
          })
          BMap.Convertor.trans(new_shops, bdkey, function (points, status, message) {
            if(status) return console.log(message || "转换坐标出错:"+status, true);
            console.log(points)
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
            // var point = new BMap.Point(_this.shops[i].longitude,_this.shops[i].latitude)
            var point = new BMap.Point(points[i]['lng'],points[i]['lat'])
            var mark = new BMap.Marker( point, {icon: icon})
            map.addOverlay(mark)
            mark.href = _this.shops[i].store_id
            mark.addEventListener("click",function(){
              console.log(_this.$router)
              _this.$router.push( { name: 'store', params: { id: this.href } } )
            }, false)
          }
          })
          
        })
      getUserInfo().then(function(rep){
        _this.user_id = rep.data.data.user_id
        _this.license_plate = rep.data.data.license_plate
        _this.contact_name = rep.data.data.real_name
        _this.contact_mobile = rep.data.data.contact_mobile
        _this.open_car_id = rep.data.data.open_car_id
        debugger
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
        if ( _this.open_car_id) {
          store.set('open_car_id', _this.open_car_id)
        }
        getCarPosition(_this.open_car_id)
        .then(function(rep){
          store.set('car_position',rep.data.data)
          //console.log(store.get('position'))
        })
        .catch(function(error){
          console.log(error)
        })
      })
      getOrderNotend(store.get('user_id')).then(function(rep){
        if (rep.data.data.length > 0 && _this.moved) {
          _this.$router.push({ 
             path: 'confirm', 
             query: { 
               order_id: rep.data.data[0]['order_id'], 
               store_id: rep.data.data[0]['store_id']
              //  time: new Date().getTime 
              }
            })
         }
      })
      
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        if(from.path === '/confirm') {

          vm.moved = false
          var reqData = {};
          JSBridge.callAPI('AppAPI.close', reqData, function(json){
            
          })
        } 
      })
      // 
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
