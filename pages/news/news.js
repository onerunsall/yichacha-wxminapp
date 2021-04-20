// pages/news/news.js
var app=getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:0,
    showIs:true,
    skinSwitch:true,
    list:[],
  },
  jump(e){
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.url,
    })
    wx.request({
      url: app.globalData.url + '/client/msginfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: wx.getStorageSync('token'),
        msgId: e.currentTarget.dataset.msgid
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {

        } else {
          // wx.showToast({
          //   title: res.data.codeMsg
          // })
        }
      }
    })
  },
  visitorPhone(e){
    
    wx.request({
      url: app.globalData.url + '/client/msginfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: wx.getStorageSync('token'),
        msgId: e.currentTarget.dataset.msgid
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
         
        } else {
          // wx.showToast({
          //   title: res.data.codeMsg
          // })
        }
      }
    })
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  
  },
 lastPage: function (pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/client/msgs',
      method: 'post',
      data: {
        token: wx.getStorageSync('token'),
        pn: pageNo,
        ps: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        if (res.data.code == 0) {
          pageNo++
          if (pageNo == 2 && res.data.data.items.length == 0) {
            that.setData({
              show: 0,
              newItem:0,
            })
          }else{
            that.setData({
              show: 0,
              newItem: 1,
            })
          }
          for(var i=0;i<res.data.data.items.length;i++){
            res.data.data.items[i].addTime = utils.formatTime(res.data.data.items[i].addTime / 1000, 'Y-M-D  h:m');
            res.data.data.items[i].visitorPhoneIs = res.data.data.items[i].visitorPhone.slice(0, 3) + '****' + res.data.data.items[i].visitorPhone.slice(7,11)
          }
          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
          that.setData({
            list: newlist
          })
          if (res.data.data.items.length < pageSize) {
            that.setData({
              learnMore: '没有更多了'
            });
          }
          console.log(that.data.show)
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },

  switchChange: function (e) {
    let that=this
    
    if (e.detail.value==true){
      wx.request({
        url: app.globalData.url + '/client/openmsgnotify',
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
            app.globalData.msgNotifyIs = 1
            that.setData({
              showIs: e.detail.value
            })
          } else {
            wx.showModal({
              title: res.data.codeMsg
            })
          }
        }
      })
    }else{
      wx.request({
        url: app.globalData.url + '/client/closemsgnotify',
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
            app.globalData.msgNotifyIs = 0
            that.setData({
              showIs: e.detail.value
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var msgNotifyIs= app.globalData.msgNotifyIs
    if (msgNotifyIs == 1) {
      that.setData({
        skinSwitch: true,
        showIs: true,
      })
    } else {
      that.setData({
        skinSwitch: false,
        showIs: false,
      })
    }
    that.lastPage(1,15)
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
    let that=this
    that.setData({
      list: [],
    })
    that.lastPage(1, 15)
  
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.setData({
      learnMore: '加载中'
    });
    var pageNo = that.data.pageNo;
    that.lastPage(pageNo, 15)
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