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
  import { completeUserInfo, submitOrderRemark } from '../../libs/api.js'
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
        if ( store.get('contact_name') === 'null' || store.get('contact_name') === 'undefined') {
          this.contact_name = '请输入您的称呼'
        }
        if ( store.get('contact_mobile') === 'null' || store.get('contact_mobile') === 'undefined') {
          this.contact_mobile = '请输入您的手机号'
        }
        this.contact_name = store.get('contact_name')
        this.contact_mobile = store.get('contact_mobile')
      }
    },
    methods: {
      handleClick () {
        var _this = this
        if ( _this.contact_name!==''&& _this.contact_mobile!==""){
          if ( !(/^1[34578]\d{9}$/.test(_this.contact_mobile)) ) {
            MessageBox('提示', '请输入正确的手机号')
            return
          }
          store.set('contact_name',_this.contact_name)
          store.set('contact_mobile',_this.contact_mobile)
          var reqData = {
            user_id: store.get("user_id"),
            // store_id: store.get("store_id"),
            // license_plate: store.get('license_plate'),
            contact_name: _this.contact_name,
            contact_mobile: _this.contact_mobile,
            // goods_list: store.get("goods_list")
          }
          Indicator.open()
          completeUserInfo(reqData).then(function(rep){
            Indicator.close()
            if (rep.data.code == 1 ) {
              MessageBox({
                title: '提示',
                message: '提交失败'
              })
              return
           
            } else {
             
              const remark_data = {
                order_id: store.get('order_id'),
                user_id: store.get('user_id'),
                contact_name: _this.contact_name,
                contact_mobile: _this.contact_mobile,
                remark: _this.order_remark
              }
              submitOrderRemark(remark_data).then(function(rep){
                if(rep.data.code == 0){
                  _this.$router.push({ path:'pay', query: {order_id: store.get('order_id')}})
                }
              }) 
            }
          })
          .catch(function(err){
            Indicator.close()
            console.log(err) 
          })
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
