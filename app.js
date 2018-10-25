import {baseURL, url} from './utils/config.js'
import {util} from './utils/util.js'
App({
  globalData: {
    userInfo: null,
    userid:'',
    customerid:''
  },
  onLaunch: function (options) {
    this.globalData.userid = JSON.stringify(options.query) == '{}' ? '10005' : decodeURIComponent(options.query.scene)
    let q = decodeURIComponent(options.query.scene)
    if (q){
      console.log("全局onLaunch onload url=" + q)
      console.log("全局onLaunch onload 参数 flag=" + util.getQueryString(q, 'flag'))
    }
  },
  openidlogin(cb){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                  wx.login({
                    success: res => {
                      var code = res.code;
                      this.sendRequest({
                        url: url.login.getopenid,
                        data: { 'code': code, 'id':2 },
                        success: (res) => {
                          if (res.res == 1) {
                            var openid = res.openid;
                            this.login(openid, cb)
                          }
                        }
                      })
                    }
                  })
              }
            }
          })
        }
      }
    })
  },
  login(openid,cb){
    // console.log(this.globalData.userInfo)
    this.sendRequest({
      url: url.login.login,
      data: {
        openid: openid,
        userid: this.globalData.userid,
        nickname: this.globalData.userInfo.nickName||'',
        face: this.globalData.userInfo.avatarUrl
      },
      success: (res) => {
        this.globalData.customerid = res.customerid;
        wx.setStorageSync('customerid', res.customerid)
        cb(this.globalData.userid, res.customerid)
      }
    })
  },
  /**
   * 网络请求
   * 必传: params.url,params.success
   * 选传：customURL、params.method、params.data、params.success
   */
  sendRequest: function(params, customURL) {
    var that = this
      const requestParams = {
          url: '',
          data: {},
          method: 'GET',
          header: {
              'content-type': 'application/json'
          },
          dataType: 'json',
          responseType: 'text',
          success: null,
          fail: null,
          complete: null
      }

      // URL
      if (customURL) {
          requestParams.url = customURL + params.url
      } else {
          requestParams.url = baseURL + params.url
      }
      // data
      requestParams.data = params.data || {};
      requestParams.success = function(res) {
          // if (res.data.login == -1) {
          //     that.goLogin();
          // }
          if (typeof params.success === 'function') {
              params.success(res.data)
          }
      }
      // fail
      requestParams.fail = function(err) {
          util.showToast('出错啦',{
              icon:'none'
          })
          if (typeof params.fail === 'function') {
              params.fail(err)
          }

      }
      // complete
      requestParams.complete = function() {
          // wx.hideLoading()
          if (typeof params.complete === 'function') {
              params.complete()
          }
      }

      // 发送请求
      wx.request(requestParams)
  },
})
