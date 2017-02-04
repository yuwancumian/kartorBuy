
function getDistance(start, end, cb){
  var map = new BMap.Map("allmap");
  var p1 = new BMap.Point(start[lng],start[lat])
  var p2 = new BMap.Point(end[lng], end[lat])
  var duration, distance
  var searchComplete = function (results){
    if (driving.getStatus() != BMAP_STATUS_SUCCESS){
        return ;
    }
    var plan = results.getPlan(0);
    duration = plan.getDuration(true)                 //获取时间
    distance =  plan.getDistance(true)           //获取距离
  }
  var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map},
    onSearchComplete: searchComplete,
    onPolylinesSet: function(){        
        setTimeout(function(){alert(output)},"1000");
    }
  });
  driving.search(p1, p2); 
  cb && cb(duration, distance)
}


export { getDistance }