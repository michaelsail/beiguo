import { url} from '../../utils/config.js'
import { util} from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 组件的初始数据
   */
  data: {
    catelist:[],
    selectedIndex:0,
    recommendData: [], // 推荐数据
    userid:'',
  },
  onLoad(options) {
    var userid = decodeURIComponent(options.scene);
    this.setData({
      userid:userid
    })
    this.getProductCate(userid)
    this.getRecommendData(userid, 0)
  },
  // 选中的TAB发生变化
  handleSelected: function (event) {
    // 提交'updateData'事件
    let selectedIndex = parseInt(event.currentTarget.dataset.selectedIndex);
    this.setData({
      selectedIndex: selectedIndex
    }, () => {
      this.getRecommendData(this.data.userid,selectedIndex)
    });

  },
  /**
   * 分类
   */
  getProductCate(userid) {
    var that = this;
    return new Promise((resolve, reject) => {
      app.sendRequest({
        url: url.product.productcatelist,
        data: {userid: userid},
        success: (res) => {
          if (res.res == 1) {
            var elecatelist = res.elements;
            this.setData({
              catelist: res.elements
            })
            resolve()

          } else {
            reject()
          }
        }
      })
    })
  },
  /**
   * 列表
   */
  getRecommendData (userid,cateid) {
    var that = this;
    return new Promise((resolve, reject) => {
      app.sendRequest({
        url: url.product.productlist,
        data: {
          userid: userid,
          cateid: cateid
        },
        success: (res) => {
          if (res.res == 1) {
            this.setData({
              recommendData: res.elements
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