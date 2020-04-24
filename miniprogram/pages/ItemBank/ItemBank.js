// miniprogram/pages/ItemBank/ItemBank.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    activeIndex:0,
    minIndex:-1,
    isShow:true,
    isShowBank:true,
    widthLoad:"5%",
    indexQuestion:1,
    answer:[]

  },
  // 点击开始答题
  StartBth(){
    this.setData({
      isShowBank:false
    })
  },
  minClick(e){
    let that=this
    setTimeout(function(){
      that.setData({
        activeIndex: Number(that.data.activeIndex)+1,
        widthLoad:(Number(that.data.activeIndex)+2)*5+'%'
    })
    that.data.answer.push(e.currentTarget.dataset.index)
    if (that.data.activeIndex == that.data.listData.length) {
      wx.navigateTo({
        url: '/pages/answerEnd/answerEnd?listAnwer='+ that.data.answer,
      })
      that.setData({
        activeIndex: that.data.listData.length-1
      })
    }
     }, 500);

 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.id)
    console.log(options)
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
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)
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
// 1.点击选择题库传入当前选择的id跳转至答题页面
// 2.进入答题页面获取到题库id，进行数组乱序然后查找数据库当前id下的库用乱序数组的下标去push
// 3.渲染乱序的题目，记录当前在哪一题，默认为第一题
// 4.点击选择题目判断是否正确并把选择的那一项保存到答题数组中以便于答题页面的统计分数，正确就自动跳转下一题并让记录的当前index值+1，如果index>题目数量则跳到答题结束页面显示分数，答题错误则停留该页面并把正确答案显示出来，手动点击下一题继续答题
// 5.答题结束页面显示答题分数，通过循环题目数组来判断答题数组中哪几项符合正确答案从而得出分数，然后把错误的题目push到错题本保存到数据库，并把该分数push到该套试题下的排名数组中