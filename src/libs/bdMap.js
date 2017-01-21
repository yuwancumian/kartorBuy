
const baseUrl = 'http://api.map.baidu.com/geoconv/v1/?'

function transMap (lng, lat ) {
  var ng, at
  $.ajax({
    url: baseUrl + 
    'ak=heM8vbaENjtTNGRMAEBwqzm8x6UCcYnZ' +
    'coords=' + lng + ',' + lat +
    '&from=1&to=5',
    type: 'get',
    dataType: 'jsonp',
    jsonp:"callback",
    jsonpCallback:"success_jsonpCallback",
    success: function (data) {
        console.log(data)
    }
  })    
  return {ng, at }
}

export { transMap }