// miniprogram/pages/ItemBank/ItemBank.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    activeIndex:0,
    minIndex:-1

  },
  minClick(e){

    this.setData({
      minIndex: e.target.dataset.index
    })
    
 
    if (this.data.activeIndex<this.data.listData.length){
      this.setData({
        activeIndex: Number(this.data.activeIndex)+1
    })
    }else{
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000
      })
      this.setData({
        activeIndex: this.data.listData.length
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.id)
    wx.setNavigationBarTitle({
      title: data.title
    })
    var that = this
    //  调用login云函数获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        wx.cloud.init({
          env: 'weblibrary'
        })
        that.db = wx.cloud.database()
        that.db.collection('htmlTopic').get({
          success: function (res) {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
           console.log(res)
           that.setData({
             listData:res.data
           })
          }
        })
      },
      fail: err => {
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})