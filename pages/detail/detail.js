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
    ],
    dataDetail:[],
    phone:'',
    url:'',
    domain:'',
    token:'',
    showModal:false,
    urlText:'',
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
    that.setData({
      domain: domain
    })
    var token = wx.getStorageSync('token')
    that.setData({
      token: token
    })
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
          if (res.data.data.corporation){
            if (res.data.data.corporation.corporationTel){
              that.setData({
                phone: res.data.data.corporation.corporationTel
              })
            }
            if (res.data.data.corporation.corporationSite) {
              that.setData({
                url: res.data.data.corporation.corporationSite
              })
            }
            console.log(that.data.url, that.data.phone)
          }
          var imgalist =''
          if (res.data.data.dataPic){
            imgalist= res.data.data.dataPic.split(',');
          }
            that.setData({
              imgalist: imgalist,
              dataDetail: res.data.data.dataDetail,
            })
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })
  },
  url: function (e) {
    var url = e.currentTarget.dataset.url;
    if (url!=''){
      this.setData({
        urlText: url,
        showModal: true
      })
    }else{
      wx.showModal({
        title: '该厂家官网尚待激活',
        content: '',
      })
    }
   
  },
  phone: function (e) {
    var that=this
    var phone = e.currentTarget.dataset.phone;
    if (phone != '') {
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  }else{
      wx.request({
        url: that.data.domain + '/yichaxun/u/userinit',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: 'post',
        data: {
          token:that.data.token
        },
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            wx.makePhoneCall({
              phoneNumber: res.data.data.serviceTel,
            })
          } else {
            wx.showModal({
              title: res.data.codeMsg 
            })
          }
        }
      })
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

  },
 

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },

  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal: false
    })
  }
})