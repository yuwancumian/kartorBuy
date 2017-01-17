import axios from 'axios'

const defaults = {
  baseURL: 'http://172.20.12.138:8085/client/'
}

Object.assign(axios.defaults, defaults)

//获取用户信息
export const getUserInfo = () => {
  return axios.post('./user/info')
}

//商店列表
export const getShopList = () => {
  return axios.get('/store/list')
}

//商店详情
export const getStoreInfo = (id) => {
  return axios.get(`/store/info?store_id=${id}`)
}

//店铺公告，折扣信息
export const getStoreNotice = (id) => {
  return axios.get(`/store/notice?store_id=${id}`)
}

//进入店铺，商品列表
export const getGoodsList = (id,page) => {
  return axios.get('/goods/list?store_id='+id+'&page=' + page + '&size=6')
}
//商品详情
export const getGoodsInfo = (id) => {
  return axios.get(`/goods/info?goods_id=${id}`)
}

//提交订单
export const submitOrder = (data) => {
  return axios.post('/order/submit',data)
}

//订单列表
export const getOrderList = (id, page) => {
  return axios.get('/order/list?&status=0&user_id=' + id + '&page=' + page + '&size=6' )
}

//订单状态
export const getOrderStatus = (id) => {
  return axios.get(`/order/status?order_id=${id}`)
}

//订单详情
export const getOrderDetail = (id) => {
  return axios.get(`/order/detail?order_id=${id}`)
}

//取消订单
export const submitOrderCancel = (data) => {
  return axios.post('/order/cancel',data)
}

//确认收货
export const submitOrderConfirm = (data) => {
  return axios.post('/order/receipt',data)
}

//退款申请
export const refundApply = (data) => {
  return axios.post('/refund/apply', data)
}

//评价商品
export const submitStoreGrade = (data) => {
  return axios.post('/store/grade', data )
}

//点赞
export const submitGoodsLike = ( data ) => {
  return axios.post('/goods/like', data)
}

// 点踩
export const submitGoodsUnlike = ( data ) => {
  return axios.post('/goods/unlike', data)
}
// 支付
export const submitPay = (data) => {
  return axios.post('/pay', data)
}
// 备注
export const submitOrderRemark = (data) => {
  return axios.post('/order/remark', data)
}

//个人信息补全
export const completeUserInfo = (data) => {
  return axios.post('/user/complete', data)
}

//行车位置
export const getCarPosition = (car_id) => {
  return axios.get('/car/position', {
    params: {
      open_car_id: car_id
    }
  }) 
}
