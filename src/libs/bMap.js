var duration, distance
import { getCarPosition }  from './api.js'

// function getCurrentPosition () {
//   var map = new BMap.Map("map")
//   var geolocation = new BMap.Geolocation()
//   return new Promise(function( resolve, reject) {
//     geolocation.getCurrentPosition(function (rep) {
//       if(this.getStatus() == BMAP_STATUS_SUCCESS){
//         resolve(rep.point)
//       }
//       else {
//         reject('failed'+this.getStatus());
//       }     
//     })
//   })
// }



function getBmapD (start,end) {
  return new Promise(function (resolve, reject) {

    var map = new BMap.Map("map")
    //var start = rep
    // var p1 = new BMap.Point(start.lng,start.lat)
    var p1 = new BMap.Point(start.lng,start.lat)
    var p2 = new BMap.Point(end.lng,end.lat)

    var searchComplete = function (results){
      if (driving.getStatus() != BMAP_STATUS_SUCCESS){
          return ;
      }
      var plan = results.getPlan(0);
      resolve({
        duration: plan.getDuration(true), //获取时间
        distance: plan.getDistance(true) //获取距离
      })                 
      
    }
    var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map},
      onSearchComplete: searchComplete
      // onPolylinesSet: function(){        
      //     setTimeout(function(){
      //     },"1000")
      // }
    });
    driving.search(p1, p2)

  })
}




export { getBmapD }