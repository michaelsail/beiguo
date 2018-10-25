var util = {
  getQueryString: function (url,name) {
    console.log("url = "+url)
    console.log("name = " + name)
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
    var r = url.substr(1).match(reg)
    if (r != null) {
      console.log("r = " + r)
      console.log("r[2] = " + r[2])
      return r[2]
    }
    return null;
  },
  // 显示Toast
  showToast: function(title, options) {
    options = options || {}
    wx.showToast({
      title: title || '',
      icon: options.icon || 'success',
      image: options.image || null,
      mask: options.mask || true,
      duration: options.duration || 2000,
      success: function(res) {
        if (typeof options.success === 'function') {
          options.success()
        }
      },
      fail: function(res) {
        if (typeof options.fail === 'function') {
          options.fail()
        }
      },
      complete: function(res) {
        if (typeof options.complete == 'function') {
          options.complete()
        }
      }
    });
  },
  // 隐藏Toast
  hideToast: function(time) {
    var time = time ? time : 1
    setTimeout(function() {
      wx.hideToast()
    }, time)
  },
  // 显示Modal
  showModal: function(content, options) {
    options = options || {}
    wx.showModal({
      title: options.title || '提示',
      content: content || '',
      showCancel: options.showCancel || false,
      cancelText: options.cancelText || '取消',
      cancelColor: options.cancelColor || '#000000',
      confirmText: options.confirmText || '确定',
      confirmColor: options.confirmColor || '#FFC50D',
      success: function(res) {
        if (res.confirm) {
          if (typeof options.confirm === 'function') {
            options.confirm()
          }
        } else {
          if (typeof options.cancel === 'function') {
            options.cancel()
          }
        }
      },
      fail: function(res) {
        if (typeof options.fail === 'function') {
          options.fail()
        }
      },
      complete: function(res) {
        if (typeof options.complete === 'function') {
          options.complete()
        }
      }
    })
  },
  // 显示Loading
  showLoading: function(title, options) {
    options = options || {}
    wx.showLoading({
      title: title || '加载中',
      mask: options.mask || true,
      success: () => {
        if (typeof options.success === 'function') {
          options.success()
        }
      },
      fail: () => {
        if (typeof options.fail === 'function') {
          options.fail()
        }
      },
      complete: () => {
        if (typeof options.complete === 'function') {
          options.complete()
        }
      }
    })
  },
  // 隐藏Loading
  hideLoading: function() {
    wx.hideLoading()
  },
}

export {
  util
}