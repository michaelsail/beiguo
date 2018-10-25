import { url } from '../../utils/config.js'
import { util } from '../../utils/util.js'
const app = getApp()
Page({


  /**
   * 组件的初始数据
   */
  data: {
    currentprice:'',
    id:'',
    name:'',
    originalprice:'',
    imglist:[],
    imgdetaillist:[],
    userid:'',
  },
  onLoad(options) {
    var userid = decodeURIComponent(options.scene);
    this.setData({
      userid: userid
    })
    var goods_id = decodeURIComponent(options.goods_id);
    this.getproductdetails(goods_id)
  },
  //商品详情
  getproductdetails(goods_id) {
    return new Promise((resolve, reject) => {
      app.sendRequest({
        url: url.product.productdetail,
        data: {id: goods_id},
        success: (res) => {
          if (res.res == 1) {
            this.setData({
              currentprice: res.currentprice,
              originalprice: res.originalprice,
              id: res.id,
              name: res.name,
              imglist: res.imglist,
              imgdetaillist:res.imgdetaillist,
            })
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  },
})
