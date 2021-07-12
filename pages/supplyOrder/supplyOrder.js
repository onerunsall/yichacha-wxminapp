// pages/supplyOrder/supplyOrder.js
var app=getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },
  lastPage: function (pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/client/myCommodityOrderList?pn=' + pageNo + '&ps=' + pageSize + '&token=' + wx.getStorageSync('token') ,
      // + '&sorts=' + sorts + '&orders=' + orders,
      method: 'post',
      // data: {
      //   zhucerenCoId: that.data.id,
      //   pn: pageNo,
      //   septum: pageSize,
      // },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        if (res.data.code == 0) {
          pageNo++
          for (var i = 0; i < res.data.data.items.length; i++) {
            res.data.data.items[i].addTime = utils.formatTime(res.data.data.items[i].addTime / 1000, 'Y-M-D  h:m');
          }
          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
          if (res.data.data.items.length < pageSize) {
            if (pageNo == 2 && res.data.data.items.length == 0) {
              that.setData({
                list: newlist,
                pageNo: pageNo,
                learnMore: '当前没有数据'
              });
              
            } else {
              if (res.data.data.sum.totalItemCount == 0) {
                that.setData({
                  list: newlist,
                  pageNo: pageNo,
                  learnMore: '当前没有数据'
                });
                
              } else {
                that.setData({
                  list: newlist,
                  pageNo: pageNo,
                  learnMore: '没有更多了'
                });
               
              }
            }
          } else {
            that.setData({
              list: newlist,
              pageNo: pageNo,
              learnMore: '上拉加载更多'
            });

            var list = that.data.list
            that.setData({
              list: list,
              pageNo: pageNo
            })
            console.log(that.data.list)
          }
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    that.lastPage(1, 15)
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
    var that = this
    var pageNo = 1;
    that.lastPage(pageNo, 15)
    that.setData({
      list: [],
      learnMore: '加载中'
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
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