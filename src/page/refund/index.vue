<template>
  <div class="refund">
    <cell title="订单金额" label="¥ 22.30"> </cell>
    <field title="退款金额" >
      <input type="text" class="field-input" placeholder="请输入退款原因" v-model="refund_money"/>
    </field>
    <div class="ot-field">
      <div class="ot-title">
        退款原因
      </div>
      <div>
         <select class="reason" name="" v-model="refund_reason">
            <option value="1">请选择原因</option>
            <option value="2">质量问题</option>
            <option value="3">送货速度慢</option>
            <option value="4">商品破损/变形</option>
            <option value="5">其他</option>
          </select>
      </div>
    </div>
    <field title="退款说明">
      <input type="text" class="field-input" placeholder="请输入退款说明" v-model="refund_note"/>
    </field>
    <div class="ot-field">
      <div class="ot-title">
        上传凭证 
      </div>
      <div class="upload-cert">
        <img 
          src="../../assets/images/icon-upload.png" 
          alt="" id="add-image"
          @click = "getPic" >
      </div>
    </div>
    <div class="ps">
        退款申请提交之后，商家有24小时处理您的退款申请，商家逾期不处理，默认视为同意退款
    </div>
    <div class="submit-btn" @click="handleSubmit">
      <p>提交申请</p>
    </div>
    <app-title title="申请退款"> </app-title>
  </div>
</template>

<script>
  import Field from '../../components/field'
  import Cell from '../../otter/components/cell'
  import { MessageBox, Checklist } from 'mint-ui'
  import { refundApply } from '../../libs/api.js'
  //import axios from 'axios'
  export default {
    data (){
      return {
        refund_money: 0,
        refund_reason: 1,
        refund_note: '',
        picture: []
      }
    },
    components: {
      Field, Checklist, Cell
    },
    methods: {
      getPic(){
        var _this = this
        if (!('JSBridge' in window)) {
          return 
        }
        var reqData = {
          sideLimit: 1280,
          sizeLimit: 102400
        }
        JSBridge.callAPI('AppAPI.captureAndUpload', reqData, function (resData) {
          resData = resData.data;
          if (!resData) {
            return;
          }
          if (resData.result == '1') {//成功
            //resData.data.url为返回的资源服务器的地址
            _this.picture.push(resData.data.url)
            $('<img src='+ resData.data.url +'>').insertBefore($('#add-image'))
            if ($('.upload-cert img').length > 3){
              $('#add-image').css('display','none')
            }
          } else if (resData.result != '3') {
            pop.options.text = '上传失败，请重试';
            pop.init();
          }
        })
      },
      handleSubmit(){
        var _this = this
        var subData = {
          user_id: parseInt(localStorage.getItem('user_id')),
          order_id: this.$route.query.order_id,
          store_id: this.$route.query.store_id,
          cause: this.refund_reason,
          descibe: this.refund_note,
          refund_money: this.refund_money,
          pic: this.picture.join(',')
        }
        refundApply(subData).then(function(rep){
          MessageBox({
            title: '提示',
            message: '您的退款申请已经提交成功，请耐心等待商家处理 <br> <div style="font-size: 14px;line-height: 20px"> 如有疑问，请致电驾图购客服 4008054288 </div>',
            confirmButtonText: '返回订单中心'
          })
          _this.$router.push({
            path: '/orderList', 
            query: { 
              order_id: _this.$route.query.order_id,
              store_id: _this.$route.query.store_id
            }
          })
        })
        
        
      }      
    }
  }
</script>

<style lang="less">
  @import './refund.less';
</style>
