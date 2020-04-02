// pages/ranking/ranking.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        name: "旺旺",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      },
      {
        name: "旺旺1",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      }, {
        name: "旺旺2",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      }, {
        name: "旺旺3",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      }, {
        name: "旺旺4",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      }, {
        name: "旺旺5",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      }, {
        name: "旺旺6",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      }, {
        name: "旺旺7",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      }, {
        name: "旺旺",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      }, {
        name: "旺旺",
        Fraca: "113",
        classfi: "0",
        url: "http://owemuck.kuai369.com/img/qcsmimg/%5Bqicai%5D1~78.jpg"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //  调用login云函数获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.cloud.init({
          env: 'weblibrary'
        })
        that.db = wx.cloud.database()
        that.test = that.db.collection('ranking')
        // 获取排名
        that.test.get({
          success: function (res) {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
           that.setData({
             list:res.data[0].list
           })
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
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