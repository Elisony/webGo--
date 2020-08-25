// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
    ImageShow: false,
    arrow: false,
    guanyuShow: false,
    scale: 1,
    windowHeight: 500,
    url:"",
    userName:"",
    isShow:true,
    info:{},
    dayTime:"",
    houre:"",
    moush:""
  },
  // 打开微信支付
  showQrcode() {
    // this.setData({
    //   ImageShow: true
    // })
    wx.previewImage({
      current:'https://appletsimg.oss-cn-beijing.aliyuncs.com/zhifu.png', // 当前显示图片的http链接
      urls:['https://appletsimg.oss-cn-beijing.aliyuncs.com/zhifu.png'] // 需要预览的图片http链接列表
    })
 
  },
  // 打开意见反馈
  arrowShow() {
    this.setData({
      arrow: true
    })
  },
  // 关于我们
  guanyuClick() {
    this.setData({
      guanyuShow: true
    })
  },
  hideModal(){
    this.setData({
      arrow:false,
      guanyuShow:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var timestamp = Date.parse(new Date())/1000;//当前时间
    var oldTime = 1597320046000/1000;
    this.waitTime = timestamp - oldTime;
    var theTime = parseInt(this.waitTime);// 需要转换的时间秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    var theTime3 = 0;// 天
    if(theTime > 60) {
    theTime1 = parseInt(theTime/60);
    theTime = parseInt(theTime%60);
    if(theTime1 > 60) {
    theTime2 = parseInt(theTime1/60);
    theTime1 = parseInt(theTime1%60);
    if(theTime2 > 24){
    //大于24小时
    theTime3 = parseInt(theTime2/24);
    theTime2 = parseInt(theTime2%24);
    }
    }
    }
    this.setData({
      dayTime:theTime3,
      houre:theTime2,
      moush:theTime1
    })
  },
  // 复制GitHub
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '复制成功',
          duration: 1000,
        })
      }
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
    this.setData({
      ImageShow: false,
      arrow: false,
      guanyuShow: false
    })
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
    return {
      title: '我是七月，你喜欢我吗？',
      path: '/pages/login/login',
      imageUrl: '../../images/tabar/index4.png' //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
})