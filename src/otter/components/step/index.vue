<template>
  <div class="ot-step" v-bind:class="{'no-desc': status != 1 && status != 4 && status !=5}">
    <slot>
      <div class="ot-step-smile" v-if="status == 6 || status == 12"></div>
      <div class="ot-step-dot" v-else></div>
    </slot>
    <div class="ot-step-main">
      <div class="title">{{ status | statusToText }}
        <span>{{label}}</span>
      </div>
      <p v-if="status == 1">请耐心等待商家确定</p>
      <p v-if="status == 4">请尽快到达指定取货点</p>
      <p v-if="status == 5">请尽快到达指定取货点</p>
      <p v-if="status == 9"> 商家有24小时处理您的退款申请，商家逾期不处理，默认视为同意退款</p>
      <p v-if="status == 7 && pay">预计1个工作日内将钱款退回到银行账户。如有疑问，请致电驾图购客服 4008054288</p>
      <p v-if="status == 10">退款已退到您的支付账户，等待到账。如有疑问，请致电驾图购客服 4008054288</p>
    </div>
    <div class="ot-step-tail"></div>
  </div>
</template>

<script>
  import OtCell from '../cell'
  export default {
    components:{
      OtCell
    },
    props: ['title', 'label', 'desc', 'status', 'pay'],
    data (){
      return {
        isDesc: true
      }
    },
    created (){
      if (this.desc) {
        this.isDesc = true
      } else {
        this.isDesc = false
      }
    },
    filters: {
      statusToText (value) {
        switch (value) {
          case 1:
            return '订单已提交'
          case 2:
            return '支付成功'
          case 3:
            return '商家已接单'
          case 4:
            return '商家已备货'
          case 5:
            return '商家已到达取货点'
          case 6:
            return '完成'
          case 7:
            return '已取消'
          case 8:
            return '申请退款'
          case 9: 
            return '退款中'
          case 10:
            return '同意退款'
          case 11:
            return '拒绝退款'
          case 12:
            return '退款成功'
        }
      }

    }
  }
</script>

<style lang="less">
  @import './step.less';
</style>
