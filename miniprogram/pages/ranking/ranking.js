// pages/ranking/ranking.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrlList: [],
    modalName:false,
    password:'',
    loadModal:true,
    passwordNow:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  showModal(){
    this.setData({
      modalName:true
    })
  },
  bindKeyInput(e){
    this.setData({
      passwordNow:e.detail.value
    })
    console.log(e.detail.value)
  },
  hideModal(){
    if(this.data.passwordNow=='131400'){
      this.upload()
      this.setData({
        modalName:false,
        passwordNow:""
      })
    }else{
      wx.showToast({
        title: '你不是我的主人哦，无权操作',
        'icon': 'none',
        duration: 3000
      })
      this.setData({
        modalName:false,
        passwordNow:""
      })
    }
  },
  hideModalChal(){
    this.setData({
      modalName:false
    })
  },
  // 预览图片
  previewImage(e){
    let arryList=[]
    this.data.imgUrlList.forEach(item=>{
      arryList.push(item.bigImg)
    })
    wx.previewImage({
      current:e.target.dataset.data, // 当前显示图片的http链接
      urls:arryList // 需要预览的图片http链接列表
    })
    console.log(this.data.imgUrlList)
  },
  onLoad: function (options) {
    console.log(this.data.modalName)
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
        that.test = that.db.collection('daily')
        that.test.get({
          success: function (res) {
            that.setData({
              imgUrlList:  res.data,
              loadModal:false
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
  upload() {
    let that=this
    // 选择图片
    wx.chooseImage({
      count: 1, //图片数量
      sizeType: ['compressed'], //压缩图
      sourceType: ['album', 'camera'], //拍照  or  相册
      success: (res) => {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0] //324324.png
        // 上传图片
        const cloudPath = 'daily' + Date.now() + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({ //上传图片到云存储
          cloudPath, //云存储路径
          filePath, //本地图片路径
          success: res => {
            let fileID = res.fileID;
            //将成功上传的图片存入artcles数据库中
            const db = wx.cloud.database();
            db.collection("daily").add({
              data: {
                bigImg: fileID
              },
              success: function () {
                //添加成功后更新imgurls，即能够在页面中显示新添加的图片
                var zhou_time = that.data.imgUrlList;
                zhou_time.push(fileID)
                that.setData({
                      imgUrlList: zhou_time
                    })
                wx.showToast({
                  title: '图片上传成功',
                  'icon': 'none',
                  duration: 3000
                })
              },
              fail: function () {
                wx.showToast({
                  title: '图片存储失败',
                  'icon': 'none',
                  duration: 3000
                })
              }
            });
          },
          fail: e => {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  deleteImage: function (e) {
    var that = this;
    var images = that.data.imgUrlList;
    var index = e.currentTarget.dataset.data;//获取当前长按图片下标
    wx.showModal({
     title: '提示',
     content: '主人忍心删除这么可爱的猫咪吗？',
     success: function (res) {
       if (res.confirm) {
       images.splice(images.indexOf(index),1)
       const db = wx.cloud.database();
       db.collection('daily').doc(index._id).remove({
        success: function (res) {
          wx.showToast({
            title: '图片删除成功',
            'icon': 'none',
            duration: 3000
          })
        },
        fail:err=>{
          console.log(err)
        }
      })
      } else if (res.cancel) {
        console.log('点击取消了');
        return false;    
       }
      that.setData({
        imgUrlList:images
      });
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