// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgalist: ['http://passion.njshangka.com/oss/yichaxun/201705170933064386274.jpg',
       'http://passion.njshangka.com/oss/yichaxun/201705170933064386274.jpg',
       'http://passion.njshangka.com/oss/yichaxun/201705170933064386274.jpg',
       'http://passion.njshangka.com/oss/yichaxun/201705170933064386274.jpg' 
    ]
  },
	/** 
	 * 预览图片
	 */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  }  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that=this;
    var domain = wx.getStorageSync('domain')
    var token = wx.getStorageSync('token')
    wx.request({
      url: domain + '/yichaxun/data/detail',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        dataId : id,
        token:token
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var homeAdPic = '';
          for (var i = 0; i < res.data.data.items.length; i++) {
            homeAdPic = res.data.data.items[i].homeAdPic;
            var str = homeAdPic;
            var sear = new RegExp('com');
            if (sear.test(str)) {

            } else {
              homeAdPic = domain + homeAdPic;
            }
            if (!res.data.data.items[i].homeAdUrl) {
              that.setData({
                hrefs: ''
              })
            } else {
              var _html_ = res.data.data.items[i].homeAdUrl;
              that.setData({
                hrefs: domain + _html_,
              })
            }
          }

          that.setData({
            adverCover: homeAdPic,
            // hrefs: 'https://passion.njshangka.com/yichaxun/weixin/newsDetails.html'
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