import axios from 'axios'

const defaults = {
  baseURL: 'http://172.20.12.138:8085/client/'
}

Object.assign(axios.defaults, defaults)

//3.商店列表
export const getShopList = () => {
  return axios.get('/store/list')
}

//4.商店详情
export const getStoreInfo = (id) => {
  return axios.get(`/store/info?store_id=${id}`)
}

//5.店铺公告，折扣信息
export const getStoreNotice = (id) => {
  return axios.get(`/store/notice?store_id=${id}`)
}

//6.进入店铺，商品列表
export const getGoodsList = (id) => {
  return axios.get(`/goods/list?store_id=${id}`)
}
//7.商品详情
export const getGoodsInfo = (id) => {
  return axios.get(`/goods/info?goods_id=${id}`)
}

//8.提交订单
export const submitOrder = (data) => {
  return axios.post('/order/submit',data)
}

//9.订单列表
export const getOrderList = (data) => {
  return axios.post('/order/list', data)
}

//10.订单状态
export const getOrderStatus = (id) => {
  return axios.get(`/order/status?order_id=${id}`)
}

//11.订单详情
export const getOrderDetail = (id) => {
  return axios.get(`/order/detail?order_id=${id}`)
}

//12.取消订单
export const submitOrderCancel = (data) => {
  return axios.post('/order/cancel',data)
}

//13.确认收货
export const submitOrderConfirm = (data) => {
  return axios.post('/order/receipt',data).then(function(data){
    return data
  })
}

//14.退款申请
export const refundApply = (data) => {
  return axios.post('/refund/apply',data)
}

//15.评价商品
export const submitStoreGrade = () => {
  return axios.get('/store/grade')
}

//16.点踩、点赞
export const submitGoodsLike = () => {
  return axios.post('/goods/like')
}

