// components/index/infotext/infotext.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    infotext: false,
    tipnames:'展开全部名片信息',
    address: "东滨路永新汇2号楼12楼",
    phone: "15013691269"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //打开地图
    business_map() {
      var latitude = 22.52393795;
      var longitude = 113.93809503;
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 28
      })
    },
    //拨打电话
    callPhone() {
      // var phone = this.data.storeDetail.company_phone;
      wx.makePhoneCall({
        phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
      })
    },
    //个人信息展示
    showInfo() {
      this.setData({
        infotext: (!this.data.infotext),
        tipnames: this.data.infotext ? '展开全部名片信息' : '收起一下名片信息'
      })
    }
  }
})
