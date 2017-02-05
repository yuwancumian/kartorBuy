<template>
    <div class="test">
        <h1>test</h1>
        <div>{{duration}}</div>
        <div id="map" style="display:none"></div>
    </div>
</template>

<script>
    import { getBmapD, getCurrentPosition} from '../../libs/bMap.js'
    export default {
        data() {
            return {
                end:{
                    lng: "106.6034144340958",
                    lat: "29.59974267485077" 
                },
                duration: ''
            }   
        },
        created() {
            var _this = this
            getCurrentPosition().then(function(rep){
                // console.log(rep)
            })
            getBmapD(_this.end).then(function(rep){
                console.log(rep)
                _this.duration = rep.duration
            }).catch(function (error) {
                console.error(error); 
            })
            var x = setInterval(function(){
                getBmapD(_this.end).then(function(rep){
                    console.log(rep)
                    _this.duration = rep.duration
                }).catch(function (error) {
                    console.error(error); 
                })
            },6000)
            
        }
    }
</script>