// pages/feedback/feedback.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
length:0,
    content:''
  },
textareaInput(e){
  this.setData({
    length:e.detail.value.length,
    content: e.detail.value
  })
},
makesure(e){
  var that=this
  wx.request({
    url: app.globalData.url + '/client/feedbackadd',
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: 'post',
    data: {
      token: wx.getStorageSync('token'),
      content: that.data.content
    },
    success: function (res) {
      wx.hideToast()
      if (res.data.code == 0) {
          wx.showToast({
            title: '反馈成功',
          }) 
          setTimeout(function(){
            wx.navigateBack({
              
            })
          },500)
      } else {
        wx.showModal({
          title: res.data.codeMsg
        })
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    return {
      title: '医查查在线',
      desc: '推荐你一款专业的医疗器械和厂商查询工具,各大医院厂商都在用',
      path: 'pages/index/index?shareUserId=' + app.globalData.userId
    }
  }
})