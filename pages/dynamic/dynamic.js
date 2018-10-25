// pages/home/home.js
import { url } from '../../utils/config.js'
import { util } from '../../utils/util.js'
const app = getApp()

Page({
  /**
   * 组件的初始数据
   */
  data: {
    userid: '',
    dynamiclist:[],
    releaseFocus: false,
    reason_input:'',
    dynamicid:'',
  },
  onLoad(options) {
    var userid = decodeURIComponent(options.scene);
    this.setData({
      userid: userid
    })
    this.getDynamic(userid)
  },
  bindReply: function (e) {
    var a = this.data.dynamiclist
    a.forEach((item, i) => {
        item.prasiebtn = false;
    })
    this.setData({
      dynamiclist: a,
      releaseFocus: true
    })
  },
  gotonews(e){
    var urllink = e.currentTarget.dataset.urllink;
    wx.navigateTo({
      url: '/pages/news/news?urllink=' + encodeURIComponent(urllink),
    })
  },
  //官网数据
  getDynamic(userid) {
    return new Promise((resolve, reject) => {
      app.sendRequest({
        url: url.dynamic.getdynamiclist,
        data: {
          userid: userid
        },
        success: (res) => {
          if (res.res == 1) {
            res.elements.forEach((item,i)=>{
              item.prasiebtn = false;
            })
            this.setData({
              dynamiclist: res.elements
            })
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  },
  prasiethis(e){//点赞
    var index = e.currentTarget.dataset.prasieindex;
    app.sendRequest({
      url: url.index.getPraise,
      data: {
        customerid:wx.getStorageSync('customerid'),
        type:2,
        toid: index
      },
      success: (res) => {
        if (res.res == 1) {
          this.setData({
            dynamiclist: res.elements
          })
          this.getDynamic(this.data.userid)
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
        var a = this.data.dynamiclist
        a.forEach((item, i) => {
          item.prasiebtn = false;
        })
        this.setData({
          dynamiclist: a
        })
      }
    })
  },
  bindinput: function (e) {
    this.setData({
      reason_input: e.detail.value
    });
  },
  sendcomment(e){//评论
    var index = e.currentTarget.dataset.prasieindex;
    app.sendRequest({
      url: url.dynamic.getcomment,
      data: {
        customerid: wx.getStorageSync('customerid'),
        dynamicid: this.data.dynamicid,
        contents: this.data.reason_input
      },
      success: (res) => {
        if (res.res == 1) {
          this.getDynamic(this.data.userid)
          this.setData({
            releaseFocus: false,
            reason_input:''
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  prasiebtnShow(e){
    var index = e.currentTarget.dataset.prasieindex;
    var prasieid = e.currentTarget.dataset.prasieid;
    var a = this.data.dynamiclist
    a.forEach((item, i) => {
      if(i == index){
        item.prasiebtn = true;
      }else{
        item.prasiebtn = false;
      }
    })
    this.setData({
      dynamicid: prasieid,
      dynamiclist :a
    })
    var up = "dynamiclist[" + index + "].prasiebtn";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
    this.setData({
      [up]: true
    })
  }
})
