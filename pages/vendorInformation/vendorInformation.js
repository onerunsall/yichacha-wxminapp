// pages/vendorInformation/vendorInformation.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    list:[],
    learnMore: '上拉加载更多'
  },
tel(e){
  wx.makePhoneCall({
    phoneNumber: this.data.detail.tel,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var  id=options.id
      var that=this
      that.setData({
        id: id
      })
    wx.request({
      url: app.globalData.url + '/yichacha/client/coinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        coId: id,
        // token: token
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          if (res.data.data.cover == '' || res.data.data.cover == null || res.data.data.cover==undefined){
            res.data.data.cover = app.globalData.url +'/yichacha/resource/3DBJ@2x.png'
          }else if (res.data.data.cover.slice(0,1)!='h'){
            res.data.data.cover = app.globalData.url + res.data.data.cover
          }
          that.setData({
            detail:res.data.data
            
          })
        }else{
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })

    that.lastPage(1,15)
  },
  TDLook(e){
wx.navigateTo({
  url: '../webview/webview?href='+this.data.detail.lobby3D,
})
  },

  lastPage: function (pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/yichacha/client/products',
      method: 'post',
      data: {
        coId: that.data.id,
        pn: pageNo,
        septum: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {


        if (res.data.code == 0) {
          pageNo++
          var list = that.data.list;
          console.log(list)
          var newlist = list.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list: newlist,
              pageNo: pageNo,
              learnMore: '没有更多了'
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              list: newlist,
              pageNo: pageNo
            });
            // for (var i = 0; i < res.data.data.items.length; i++) {
            //   that.setData({
            //     lastRowId: res.data.data.items[i].dataId,
            //     septum: res.data.data.items[i].dataOnHomeSort,
            //   })
            // }
            var pic1, pic2, pic3;
            for (var i = 0; i < that.data.list.length; i++) {
              if (that.data.list[i].pics) {
                var pics = that.data.list[i].pics.split(',')
                if (pics.length == 1) {
                  pic1 = app.globalData.url + pics;
                  pic2 = '';
                  pic3 = '';
                } else if (pics.length == 2) {
                  pic1 = app.globalData.url + pics[0];
                  pic2 = app.globalData.url + pics[1];
                  pic3 = '';
                } else {
                  pic1 = app.globalData.url + pics[0];
                  pic2 = app.globalData.url + pics[1];
                  pic3 = app.globalData.url + pics[2];
                }
              } else {
                pic1 = app.globalData.url + '/yichacha/resource/Group_12.png';
                pic2 = '';
                pic3 = '';
              }
              that.data.list[i].pic1 = pic1
              that.data.list[i].pic2 = pic2
              that.data.list[i].pic3 = pic3
            }

            var list = that.data.list
            that.setData({
              list: list,
              pageNo: pageNo
            })

            console.log(that.data.list)
          }
        }


        else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
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
    var that = this
    var pageNo = 1;
    that.lastPage(pageNo, 15)
    that.setData({
      learnMore: '上拉加载更多'
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

  }
})