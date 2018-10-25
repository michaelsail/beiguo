// pages/home/home.js
import { url } from '../../utils/config.js'
import { util } from '../../utils/util.js'
const app = getApp()

Page({
  /**
   * 组件的初始数据
   */
  data: {
    userid:'',
    phone:'',
    address:'',
    bannerData:[],//banner
    informationlist:[],//news
  },
  onLoad(options) {
    var userid = decodeURIComponent(options.scene);
    this.setData({
      userid: userid
    })
    this.getWebsite(userid)
  },
  //官网数据
  getWebsite (userid) {
    return new Promise((resolve, reject) => {
      app.sendRequest({
        url: url.home.website,
        data:{
          userid: userid
        },
        success: (res) => {
          if (res.res == 1) {
            this.setData({
              phone: res.tel,
              address:res.address,
              bannerData: res.imglist,
              informationlist: res.informationlist,
            })
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  },
  //拨打电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
    })
  },
  //打开地图
  business_map() {
    var latitude = 22.52393795;
    var longitude = 113.93809503;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28
    })
  }
})
