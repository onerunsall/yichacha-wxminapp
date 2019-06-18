// pages/detail/detail.js
var app=getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    swiperCurrent: 0,
    imgalist: [
      // 'http://passion.njshangka.com/oss/yichaxun/201705170933064386274.jpg',
      //  'http://passion.njshangka.com/oss/yichaxun/201705170933064386274.jpg',
      //  'http://passion.njshangka.com/oss/yichaxun/201705170933064386274.jpg',
      //  'http://passion.njshangka.com/oss/yichaxun/201705170933064386274.jpg' 
    ],
    detail:[],
    phone:'',
    url:'',
    domain:'',
    token:'',
    showModal:false,
    urlText:'',
  },
  sc(e){
    var that=this
    wx.request({
      url: app.globalData.url + '/yichacha/client/productfavor',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: that.data.token,
        productId:that.data.id
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
        
          that.setData({
            favorIs:1
          })
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })
  },
  ysc(e) {
    var that=this
    wx.request({
      url: app.globalData.url + '/yichacha/client/productunfavor',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: that.data.token,
        productId: that.data.id
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
         
          that.setData({
            favorIs: 0
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
	 * 预览图片
	 */
  phoneNow(e){
  
      wx.makePhoneCall({
        phoneNumber: this.data.detail.coTel,
      })

  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current)
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
      domain: domain,
      id: id
    })
    var token = wx.getStorageSync('token')
    that.setData({
      token: token
    })
    wx.request({
      url: app.globalData.url + '/yichacha/client/productinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        productId : id,
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
          var imgalist =[]
          if (res.data.data.pics){
            imgalist= res.data.data.pics.split(',');
            for (var i = 0; i < imgalist.length; i++) {
              if (imgalist[i].slice(0, 1) != 'h' && imgalist[i].slice(0, 1) != '.') {
                imgalist[i] = app.globalData.url + imgalist[i]
              }
            }
          }else{
            imgalist = imgalist.concat(app.globalData.url +'/yichacha/resource/zanwutupian@2x.png')
          }
          if (res.data.data.addTime != null && res.data.data.addTime != '' && res.data.data.addTime!='undefined'){
            res.data.data.addTime = utils.formatTime(res.data.data.addTime / 1000, 'Y-M-D');
          }
          if (res.data.data.alterTime != null && res.data.data.alterTime != '' && res.data.data.alterTime != 'undefined') {
            res.data.data.alterTime = utils.formatTime(res.data.data.alterTime / 1000, 'Y-M-D');
          }
            that.setData({
              imgalist: imgalist,
              detail:res.data.data,
              favorIs: res.data.data.favorIs
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
        url: app.globalData.url + '/yichaxun/u/userinit',
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
    wx.stopPullDownRefresh()
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