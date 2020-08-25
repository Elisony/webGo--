// pages/home/home.js
const app = getApp()
const dataList = require("../../dataList")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    TabCur: 0,
    scrollLeft: 0,
    nameList: [],
    Imgboole: true,
    ImgIndex: -1,
    innerAudioContext: null,
    loadModal:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      swiperList: dataList.dataList,
      nameList: dataList.dataList[0].list.slice(0, 10),
      loadModal:false
    })
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
      },
      fail: err => {
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
    let innerAudioContext = wx.createInnerAudioContext();
    that.setData({
      innerAudioContext: innerAudioContext
    });
    innerAudioContext.onPlay(() => {
      // 录音播放中时
      console.log("录音播放中时")
    });
    innerAudioContext.onStop(() => {
      // 录音播放停止时
      console.log("录音播放停止时")
      this.setData({
        Imgboole: true,
        ImgIndex: -1
      })
    });
    innerAudioContext.onEnded(() => {
      // 录音播放结束时
      this.setData({
        Imgboole: true,
        ImgIndex: -1
      })
      console.log("录音播放结束时")

    })
  },
  onUnload: function () {
    this.data.innerAudioContext.stop();
  },
  tabSelect(e) {
    this.setData({
      Imgboole: true,
      ImgIndex: -1
    })
    this.data.innerAudioContext.stop();
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      nameList: dataList.dataList[e.currentTarget.dataset.id].list.slice(0, 10)
    })

  },
  playTap(e) {

    if (e.currentTarget.dataset.boole && e.currentTarget.dataset.id != this.data.ImgIndex) {
      this.setData({
        Imgboole: true,
        ImgIndex: e.currentTarget.dataset.id
      })
      this.data.innerAudioContext.src = this.data.nameList[e.currentTarget.dataset.id].meow_url;
      this.data.innerAudioContext.play();
    } else if (!e.currentTarget.dataset.boole || e.currentTarget.dataset.boole && [e.currentTarget.dataset.id == this.data.ImgIndex][0]) {
      this.setData({
        Imgboole: true,
        ImgIndex: -1
      })
      this.data.innerAudioContext.stop();
    }
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

    console.log(this.data.swiperList)
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