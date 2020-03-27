// miniprogram/pages/ceshi/ceshi.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    age: '',
    recordId: '',
    nameResult: '',
    ageResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
        that.test = that.db.collection('titleList')
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  insertData: function(value) {
    var that = this
    console.log(value)
    try {
      //  将年龄转换为整数类型值
      var age = that.data.age
      //  如果输入的年龄不是数字，会显示错误对话框，并退出该函数
      if (isNaN(age)) {
        //  显示错误对话框
        wx.showModal({
          title: '错误',
          content: '请输入正确的年龄',
          showCancel: false
        })
        return
      }
      if (that.data.age != "" && that.data.name!=""){
        //  向test数据集添加记录
        that.test.add({
          // data 字段表示需新增的 JSON 数据
          data: {
            name: that.data.name,
            age: age
          },

          //  数据插入成功，调用该函数
          success: function (res) {
            console.log(res)
            wx.showModal({
              title: '成功',
              content: '成功插入记录',
              showCancel: false
            })
            that.setData({
              name: '',
              age: ''
            })
          }
        })
      }else{
        wx.showModal({
          title: '错误',
          content: '信息填写不完整',
          showCancel: false
        })
      }

    } catch (e) {
      wx.showModal({
        title: '错误',
        content: e.message,
        showCancel: false
      })

    }
  },
  queryData: function() {
    var that = this
    //  根据记录ID搜索数据集  查询所有
    if (that.data.recordId==""){
      wx.showModal({
        title: '错误',
        content: "请输入记录的姓名",
        showCancel: false
      })
    }else{

    this.db.collection('titleList').get({
      //如果查询成功的话
      success(res) {
        //将获得的数据集加入到原来的数据集中
        //调试一下，是否加入
        //这里需要多多注意一下，数据加入后都是在下标1里面的
        res.data.forEach(item => {
          if (item.name == that.data.recordId) {
            that.setData({
              nameResult: item.name,
              ageResult: item.age
            })
          } else {
            wx.showModal({
              title: '错误',
              content: '没有找到记录',
              showCancel: false
            })
          }
        })
      },
    })

    }

    // this.db.collection('titleList').doc(this.data.recordId).get({
    //   // 找到记录集调用
    //   success: function (res) {
    //     //  将查询结果显示在页面上  
    //     that.setData({
    //       nameResult: res.data.name,
    //       ageResult: res.data.age
    //     })

    //   },
    //   //  未查到数据时调用
    //   fail: function (res) {
    //     wx.showModal({
    //       title: '错误',
    //       content: '没有找到记录',
    //       showCancel: false
    //     })
    //   }
    // })

  },
  bindKeyInputName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindKeyInputAge: function(e) {
    this.setData({
      age: e.detail.value
    })
  },
  bindKeyInputId: function(e) {
    this.setData({
      recordId: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})