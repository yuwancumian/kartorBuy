<template>
  <div class="inputInfo">
    <div class="ot-panel">
      <mt-field label="称 呼" placeholder="请输入您的称呼" v-model="contact_name"></mt-field>
      <mt-field label="手机号" placeholder="可及时联系到您的手机号" type="tel" v-model="contact_mobile"></mt-field>
      
    </div>
    <div class="container">
      <a class="btn btn-primary" @click="handleClick" >
        下一步
      </a>
    </div>
    
  </div>
</template>

<script>
  import { MessageBox, Field, Indicator } from 'mint-ui'
  import { submitOrder } from '../../libs/api.js'
  //import axios from 'axios'
  export default {
    components:{
      Field
    },
    data(){
      return {
        contact_name: '',
        contact_mobile: '',
        order_id: ''
      }
    },
    created (){
      if ( store.get('contact_name') && store.get('contact_mobile') ){
        this.contact_name = store.get('contact_name')
        this.contact_mobile = store.get('contact_mobile')
      }
    },
    methods: {
      handleClick () {
        var _this = this
        if (this.contact_name!==''&&this.contact_mobile!==""){
          store.set('contact_name',_this.contact_name)
          store.set('contact_mobile',_this.contact_mobile)
          var reqData = {
            user_id: store.get("user_id"),
            store_id: store.get("store_id"),
            license_plate: store.get('license_plate'),
            contact_name: _this.contact_name,
            contact_mobile: _this.contact_mobile,
            goods_list: store.get("goods_list")
          }
          Indicator.open()
          submitOrder(reqData).then(function(rep){
            Indicator.close()
            _this.$router.push('/pay')
            _this.order_id =rep.data.data.order_id
            store.set('order_id', _this.order_id)
            })
            .catch(function(err){
              Indicator.close()
              console.log(err) 
            }
          )
        } else {
          if ( _this.contact_name ==='') {
            MessageBox('提示', '请输入您的称呼')
          } else {
            MessageBox('提示', '请输入您的手机号')
          }
        }
      }
    }  
  }
</script>

<style lang="less">
  .btn-primary{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 42px;
    line-height: 42px;
    background: #ffae00;
    margin-top: 22px;
    border-radius: 8px;
    color: #fff;
  }
</style>
