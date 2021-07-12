// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
  },
  changeZh(e) {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  applyCount(e){
    wx.navigateTo({
      url: '../supplyOrder/supplyOrder',
    })
  },
  serviceTel(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.detail.serviceTel,
    })
  },
  feedBack(e){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    let that = this
    that.setData({
      Version: app.globalData.Version
    })
    wx.request({
      url: app.globalData.url + '/client/loginrefresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          app.globalData.msgNotifyIs = res.data.data.msgNotifyIs
          that.setData({
            detail: res.data.data
          })
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })
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
    wx.stopPullDownRefresh()
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
      title: '医查查在线',
      desc: '推荐你一款专业的医疗器械和厂商查询工具,各大医院厂商都在用',
      path: 'pages/index/index?shareUserId=' + app.globalData.userId
    }
  }
})