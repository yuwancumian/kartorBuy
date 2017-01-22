(function(){
function load_script(xyUrl, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = xyUrl;
    //借鉴了jQuery的script跨域方法
    script.onload = script.onreadystatechange = function(){
        if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
            callback && callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( head && script.parentNode ) {
                head.removeChild( script );
            }
        }
    };
    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    head.insertBefore( script, head.firstChild );
}
// 一个文档未列出的接口, 未测试在此接口的情况下做指转换的情况
function translate2(point,type,callback){
    var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
    var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from="+ type + "&to=4&x=" + point.lng + "&y=" + point.lat + "&callback=BMap.Convertor." + callbackName;
    //动态创建script标签
    load_script(xyUrl);
    BMap.Convertor[callbackName] = function(xyResult){
        delete BMap.Convertor[callbackName];    //调用完需要删除改函数
        var point = new BMap.Point(xyResult.x, xyResult.y);
        callback && callback(point);
    }
}
/*
@param: points, Array of point:{lon, lat}
@param: from
    1：GPS设备获取的角度坐标，wgs84坐标; default
    2：GPS获取的米制坐标、sogou地图所用坐标;
    3：google地图、soso地图、aliyun地图、mapabc地图和amap地图所用坐标，国测局坐标;
    4：3中列表地图坐标对应的米制坐标;
    5：百度地图采用的经纬度坐标;
    6：百度地图采用的米制坐标;
    7：mapbar地图坐标;
    8：51地图坐标
@param: to
    5：bd09ll(百度经纬度坐标), default
    6：bd09mc(百度米制经纬度坐标);
@return: status
    1   内部错误
    21  from非法
    22  to非法
    24  coords格式非法
    25  coords个数非法，超过限制
*/
function translate(lon, lat, key, callback) {
    var callbackName = 'cbk_' + Math.round(Math.random() * 10000); //随机函数名
    // if(points.constructor !== Array) points = [points];
    // for(var index in points) {
    //     var point = points[index];
    //     coords += point.lon +',' + point.lat;
    //     if(index < (points.length-1)) coords += ';';
    // }

    var reqUrl = "http://api.map.baidu.com/geoconv/v1/?coords=" + lon + ',' + lat + "&from=1&to=5&ak=" + key + "&callback=BMap.Convertor." + callbackName;
    //动态创建script标签
    load_script(reqUrl);
    BMap.Convertor[callbackName] = function(coordResult){
        delete BMap.Convertor[callbackName]; //调用完需要删除改函数
        if(coordResult.status !== 0) return callback && callback(null, coordResult.status, coordResult.message);
        var ps = [];
        for(var index in coordResult.result) {
            ps.push(new BMap.Point(coordResult.result[index].x, coordResult.result[index].y));
        }
        if(ps.length == 1) ps = ps[0];
        callback && callback(ps);
    }
}

function trans (points, key, callback) {
    var coords = '',
        callbackName = 'cbk_' + Math.round(Math.random() * 10000);
    for( var index = 0; index < points.length; index ++) {
        var point = points[index];
        coords += point.lon +',' + point.lat;
        if(index < (points.length-1)) coords += ';';
    }
    var reqUrl = "http://api.map.baidu.com/geoconv/v1/?coords=" + coords + "&from=1&to=5&ak=" + key + "&callback=BMap.Convertor." + callbackName;
    load_script(reqUrl);
    BMap.Convertor[callbackName] = function(coordResult){
        delete BMap.Convertor[callbackName]; //调用完需要删除改函数
        if(coordResult.status !== 0) return callback && callback(null, coordResult.status, coordResult.message);
        var ps = [];
        for(var index in coordResult.result) {
            ps.push(new BMap.Point(coordResult.result[index].x, coordResult.result[index].y));
        }
        if(ps.length == 1) ps = ps[0];
        callback && callback(ps);
    }
}

window.BMap = window.BMap || {};
BMap.Convertor = {};
BMap.Convertor.translate = translate;
BMap.Convertor.trans = trans;
})();