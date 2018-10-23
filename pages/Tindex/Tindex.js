// pages/Tindex/Tindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    adverCover: '',
    hrefs: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    var domain = 'https://dev.njshangka.com';
    wx.setStorageSync('domain', domain);
    wx.request({
      url: domain + '/yichaxun/u/homeadlist',
      header: {
        'Content-type': 'application/json'
      },
      method: 'post',
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          console.log(res.data.data.items.length)
          var homeAdPic = '';
          for (var i = 0; i < res.data.data.items.length; i++) {
            homeAdPic = res.data.data.items[i].homeAdPic;
            console.log(homeAdPic)
            if (!res.data.data.items[i].homeAdUrl) {
              that.setData({
                hrefs: ''
              })
            } else {
              var _html_ = res.data.data.items[i].homeAdUrl;
              that.setData({
                // hrefs: _html_,
              })
            }
          }

          that.setData({
            adverCover: 'http://passion.njshangka.com/oss/yichaxun/201706010932055979500.jpg',
            // adverCover: homeAdPic,
            hrefs: 'https://passion.njshangka.com/yichaxun/weixin/newsDetails.html'
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