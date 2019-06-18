// pages/Tindex/Tindex.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    adverCover: '',
    hrefs: '',
    lastRowId: '',
    domain: '',
    septum: '',
    type: 1,
    showModal: false,
    userInfo: {},
    code: '',
    learnMore: '上拉加载更多',
    newMsgCount:0
  },
  nook: function(e) {
    this.setData({
      showModal: false
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    var domain = 'https://www.njshangka.com';
    wx.setStorageSync('domain', domain);
    // wx.removeStorageSync('token')
    that.setData({
      domain: domain
    })
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
          app.globalData.code = res.code

          wx.request({
            url: app.globalData.url + '/yichacha/client/wxminapplogin',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: 'post',
            data: {
              code: app.globalData.code,
            },
            success: function (res) {
              wx.hideToast()
              if (res.data.code == 0) {
                app.globalData.loginIs = 1
                wx.setStorageSync('token', res.data.data.token)
                wx.request({
                  url: app.globalData.url + '/yichacha/client/loginrefresh',
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
                      if (res.data.data.identity == '' || res.data.data.identity == null || res.data.data.identity ==undefined){
                        wx.showToast({
                          title: '请绑定身份',
                        })
                        setTimeout(function(){
                              wx.navigateTo({
                                url: '../selectRole/selectRole',
                              })
                        },1000)
                      }
                      app.globalData.msgNotifyIs = res.data.data.msgNotifyIs
                      that.setData({
                        newMsgCount: res.data.data.newMsgCount
                      })
                    } else if (res.data.code == 20 || res.data.code == 26) {
                      wx.showToast({
                        title: res.data.codeMsg
                      })
                    } else {
                      wx.showToast({
                        title: res.data.codeMsg
                      })
                    }
                  }
                })
              } else if (res.data.code == 25) {
                // wx.setStorageSync('isBind', 1)
                // wx.showToast({
                //   title: '请登录',
                // })
                // setTimeout(function () {
                //   wx.navigateTo({
                //     url: '../login/login',
                //   })
                // }, 1000)
              } else {
                wx.showModal({
                  title: res.data.codeMsg
                })
              }
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  
    // if (wx.getStorageSync('isBind') == 1) {
    //   wx.showToast({
    //     title: '请登录',
    //   })
    //   setTimeout(function() {
    //     wx.navigateTo({
    //       url: '../login/login',
    //     })
    //   }, 1000)
    // }
   
    that.lastPage(1, 200)
  },
  lastPage: function(pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/yichacha/client/page/3-0-1',
      method: 'post',
      async:true,
      data: {
        // dataOnHome: 1,
        pn: pageNo,
        ps: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function(res) {
        if (res.data.code == 0) {
          pageNo++
          var pic1, pic2, pic3;
          for (var i = 0; i < res.data.data.ads.length; i++) {
            if (res.data.data.ads[i].product.pics != '' && res.data.data.ads[i].product.pics != null && res.data.data.ads[i].product.pics != undefined) {
              var pics = res.data.data.ads[i].product.pics.split(',')
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
            }
            res.data.data.ads[i].pic1 = pic1
            res.data.data.ads[i].pic2 = pic2
            res.data.data.ads[i].pic3 = pic3
          }
          var list = that.data.list;
          var newlist = list.concat(res.data.data.ads)
          if (res.data.data.ads.length == 0) {
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


  news: function (e) {
    if (app.globalData.loginIs == 0) {
      wx.showToast({
        title: '请登录',
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1000)
    } else {

      wx.navigateTo({
        url: '../news/news'
      })
    }
  },
  mine: function (e) {
    if (app.globalData.loginIs == 0) {
      wx.showToast({
        title: '请登录',
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1000)
    } else {

      wx.navigateTo({
        url: '../mine/mine'
      })
    }
  },
  searchIs: function (e) {
    if (app.globalData.loginIs == 0) {
      wx.showToast({
        title: '请登录',
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1000)
    } else {
      
      wx.navigateTo({
        url: '../search/search'
      })
    }

  },
  jumpDetail: function(e) {
    if (app.globalData.loginIs == 0) {
      wx.showToast({
        title: '请登录',
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1000)
    } else {
        var url = e.currentTarget.dataset.url
        wx.navigateTo({
          url: url
        })
      }
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
    var that = this

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
    var that = this
    var pageNo = 1;
    that.setData({
      list: [],
      learnMore: '上拉加载更多'
    })
    that.lastPage(pageNo, 200)
    wx.request({
      url: app.globalData.url + '/yichacha/client/loginrefresh',
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
            newMsgCount: res.data.data.newMsgCount
          })
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.showToast({
            title: res.data.codeMsg
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg
          })
        }
      }
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // var that = this
    // var pageNo = that.data.pageNo;
    // that.lastPage(pageNo, 15)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})