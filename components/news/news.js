// components/news/news.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataArr: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotonews: function (e) {
      var urllink = e.currentTarget.dataset.urllink;
      wx.navigateTo({
        url: '/pages/news/news?urllink=' + encodeURIComponent(urllink),
      })
    },
  }
})
