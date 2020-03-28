// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  BthClick() {
    wx.navigateTo({
      url: '/pages/ceshi/ceshi',
    })
  },
  getInfo() {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        var userInfo = res.userInfo
        //  向test数据集添加记录
        that.test.add({
          // data 字段表示需新增的 JSON 数据
          data: {
            userInfo: userInfo,
            iv: res.iv
            // nickName: userInfo.nickName,
            // avatarUrl: userInfo.avatarUrl,
            // gender: userInfo.gender, //性别 0：未知、1：男、2：女
            // province: userInfo.province,
            // city: userInfo.city,
            // country: userInfo.country,
          },
          //  数据插入成功，调用该函数
          success: function (res) {
            wx.switchTab({
              url: '/pages/answer/answer',
            })
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      
      }
    })

    // 查询
    // this.db.collection('userInfo').get({
    //   //如果查询成功的话
    //   success(res) {
    //     console.log(res)
        //将获得的数据集加入到原来的数据集中
        //调试一下，是否加入
        //这里需要多多注意一下，数据加入后都是在下标1里面的
        // res.data.forEach(item => {
        //   if (item.iv == that.data.recordId) {
        //     that.setData({
        //       nameResult: item.name,
        //       ageResult: item.age
        //     })
        //   } else {
        //     wx.showModal({
        //       title: '错误',
        //       content: '没有找到记录',
        //       showCancel: false
        //     })
        //   }
        // })
    //   },
    // })
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
        that.test = that.db.collection('userInfo')
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
    // 
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              that.getInfo()
              
            }
          })
        }else{
          
            console.log('没有授权')
          
        }
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