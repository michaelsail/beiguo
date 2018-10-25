//index.js
//获取应用实例
import { url } from '../../utils/config.js'
import { util } from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userid: '',
    customerid:'',
    infotext: false,
    tipnames: '展开全部名片信息',
    name:'',
    post:'',
    mobile:'',
    email:'',
    address:'',
    logo:'',
    company:'',
    weixin:'',
    introduce: '',//个人介绍
    browselist: [],//浏览记录
    praisecount: '',//点赞数量
    browselistcount:'',//浏览人数
  },
  onShow:function(options){
    console.log('44444444444')
    
    console.log('555555555')
    this.getCardInfo()
  },
  onLoad: function (options) {
    console.log(getCurrentPages())
    this.setData({
      userid: options.scene || '10005'
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        userid:app.globalData.userid,
        customerid:app.globalData.customerid
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    app.openidlogin(this.getCardInfo);
  },
  saoma:function(){
    wx.scanCode({
      success:(res)=>{
        console.log(res);
      }
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    },()=>{
      app.openidlogin(this.getCardInfo);
    })

  },
  getCardInfo(userid, customerid) {
    var customerid1 = wx.getStorageSync('customerid')
    console.log('aaaaaaaaaaaaaa')
    app.sendRequest({
      url: url.index.getCardInfo,
      data: {
        userid: userid,
        customerid: customerid
      },
      success: (res) => {
        if (res.res == 1) {
          this.setData({
            name: res.name,
            post: res.post,
            mobile: res.mobile,
            email: res.email,
            address: res.address,
            logo: res.logo,
            company: res.company,
            weixin: res.weixin,
            introduce: res.introduce,//个人介绍
            browselist: res.browselist,//浏览记录
            praisecount: res.praisecount,//点赞数量
            browselistcount: res.browselistcount,//浏览人数
          })
        } else {
        }
      }
    })
  },
  copyName(e) {
    var self = this;
    var copynames = e.currentTarget.dataset.copyname;
    var datas = '';
    var toastitle = '';
    if(copynames == 'weixin'){
      datas = this.data.weixin
      toastitle = '微信'
    }else if(copynames == 'email'){
      datas = this.data.email
      toastitle = '邮箱'
    }else if(copynames == 'company'){
      datas = this.data.company
      toastitle = '公司名称'
    } else if (copynames == 'address') {
      datas = this.data.address
      toastitle = '公司地址'
    }
    wx.setClipboardData({
      data: datas,
      success: function (res) {
        wx.showToast({
          title: toastitle+'复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    });
  },
  addPhone() {
    wx.addPhoneContact({
      firstName: this.data.name,   //名字
      mobilePhoneNumber: this.data.mobile,    //手机号
      success: function () {
        console.log('添加成功')
      }
    })
  },
  //拨打电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile //仅为示例，并非真实的电话号码
    })
  },
  //个人信息展示
  showInfo() {
    this.setData({
      infotext: (!this.data.infotext),
      tipnames: this.data.infotext ? '展开全部名片信息' : '收起一下名片信息'
    })
  },
  //点赞
  praise() {
      app.sendRequest({
        url: url.index.getPraise,
        data: {
          toid: this.data.userid,
          type:1,
          customerid: wx.getStorageSync('customerid')
        },
        success: (res) => {
          if (res.res == 1) {
            this.setData({
              praisecount: parseInt(praisecount)+1
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
})