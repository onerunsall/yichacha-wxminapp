// pages/Tindex/Tindex.js
var app = getApp()
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
    learnMore: '加载中',
    newMsgCount: 0,
    className: '',
    ads: 2,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showIf:false,
    end:0,
  },
  popWindow(e){
    this.setData({
      showIf:false
    })
  },
  forSale(e) {
   
      wx.navigateTo({
        url: '../brandDirect/brandDirect',
      })
    
  },
  nook: function(e) {
    this.setData({
      showModal: false
    })
  },
  onPageScroll: function (e) {
    let that = this;
    if (e.scrollTop < 40) {
      that.setData({
        isScroll: false,
        className: ''
      })
    } else {
      that.setData({
        isScroll: true,
        className: 'active'
      })
    }
  },
  
  loginRefresh() {
    var that = this
    wx.request({
      url: app.globalData.url + '/client/loginrefresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: app.globalData.token
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          app.globalData.userId = res.data.data.userId || ''
          app.globalData.phone = res.data.data.phone
          if (res.data.data.identity == '' || res.data.data.identity == null || res.data.data.identity == undefined) {
            wx.showToast({
              title: '请绑定身份',
            })
            setTimeout(function() {
              wx.navigateTo({
                url: '../selectRole/selectRole',
              })
            }, 1000)
          }
          app.globalData.msgNotifyIs = res.data.data.msgNotifyIs
          that.setData({
            newMsgCount: res.data.data.newMsgCount,

          })
        } else if (res.data.code == 20 || res.data.code == 26) {
          // wx.showToast({
          //   title: res.data.codeMsg
          // })
        } else {
          wx.showToast({
            title: res.data.codeMsg
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    
    var that = this;
    var shareUserId = options.shareUserId
    app.globalData.shareUserId = shareUserId || ''
   
    var domain = 'https://yichacha.njshangka.com';
    wx.setStorageSync('domain', domain);
    // 查看是否授权

    // wx.getSetting({
    //   success: function (res) {   
    //     console.log(1111,res.authSetting['scope.userInfo'])
    //     if (res.authSetting['scope.userInfo']) {
    //       that.setData({
    //         showIf: false
    //       })
    //     }else{
    //       that.setData({
    //         showIf: true
    //       })
    //     }
    //   }
    // })

    that.setData({
      domain: domain,
    })
    wx.request({
      url: app.globalData.url + '/publicinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        code: app.globalData.code,
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            coCount: res.data.data.coCount,
            productCount: res.data.data.productCount
          })
        } else if (res.data.code == 25) {

        } else {
          wx.showToast({
            title: res.data.codeMsg
          })
        }
      }
    })

    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
          app.globalData.code = res.code

          wx.request({
            url: app.globalData.url + '/client/wxminapplogin',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: 'get',
            data: {
              code: app.globalData.code,
              registerFromShareUserId: app.globalData.shareUserId,
            },
            success: function(res) {
              wx.hideToast()
              that.setData({
                end:1
              })
              if (res.data.code == 0) {
                app.globalData.loginIs = 1
                wx.setStorageSync('token', res.data.data.token)
                app.globalData.token = res.data.data.token
                that.loginRefresh()
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
                wx.showToast({
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
    that.lastPage(1, 15)


    // 分享需要
    if (options.pageId == 1) {
      //这个pageId的值存在则证明首页的开启来源于用户点击来首页,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../detail/detail?id=' + options.id,
      })
    } else if (options.pageId == 2) {
      wx.navigateTo({
        url: '../vendorInformation/vendorInformation?id=' + options.id,
      })
    } else if (options.pageId == 3) {
      wx.navigateTo({
        url: '../brandDirectDetail/brandDirectDetail?id=' + options.id,
      })
    }else if(options.pageId == 4){
      wx.navigateTo({
        url: '../brandDirect/brandDirect?id=' + options.id,
      })
    }

  },
  lastPage: function(pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/client/guochanyiliaoqixies?pn=' + pageNo + '&ps=' + pageSize +
        '&homeShow=' + 1 + '&orders=asc&sorts=homeOrderNo',
      method: 'post',
      async: true,
      // data: {
      //   // dataOnHome: 1,
      //   pn: pageNo,
      //   ps: pageSize,
      //   sorts:'homeOrderNo',
      //   homeShow:1,
      //   orders:'asc',
      //   // kw:''
      // },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function(res) {
        if (res.data.code == 0) {
          pageNo++
          var pic1, pic2, pic3;
          for (var i = 0; i < res.data.data.items.length; i++) {
            res.data.data.items[i].num = (i + 1)
            if (res.data.data.items[i].pics != '' && res.data.data.items[i].pics != null && res.data.data.items[i].pics != undefined) {
              var pics = res.data.data.items[i].pics.split(',')
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
            res.data.data.items[i].pic1 = pic1
            res.data.data.items[i].pic2 = pic2
            res.data.data.items[i].pic3 = pic3
          }
          var list = that.data.list;
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


  news: function(e) {


    if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined || wx.getStorageSync('token') == null) {
      wx.showToast({
        title: '请登录',
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1000)
    } else {

      wx.navigateTo({
        url: '../news/news'
      })
    }
    // if (app.globalData.loginIs == 0) {
    //   wx.showToast({
    //     title: '请登录',
    //   })
    //   setTimeout(function () {
    //     wx.navigateTo({
    //       url: '../login/login',
    //     })
    //   }, 1000)
    // } else {

    //   wx.navigateTo({
    //     url: '../news/news'
    //   })
    // }
  },
  mine: function(e) {
    if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined || wx.getStorageSync('token') == null) {
      wx.showToast({
        title: '请登录',
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1000)
    } else {

      wx.navigateTo({
        url: '../mine/mine'
      })
    }

    // if (app.globalData.loginIs == 0) {
    //   wx.showToast({
    //     title: '请登录',
    //   })
    //   setTimeout(function () {
    //     wx.navigateTo({
    //       url: '../login/login',
    //     })
    //   }, 1000)
    // } else {

    //   wx.navigateTo({
    //     url: '../mine/mine'
    //   })
    // }
  },
  searchIs: function(e) {
    // if (app.globalData.loginIs == 0) {
    //   wx.showToast({
    //     title: '请登录',
    //   })
    //   setTimeout(function () {
    //     wx.navigateTo({
    //       url: '../login/login',
    //     })
    //   }, 1000)
    // } else {

    //   wx.navigateTo({
    //     url: '../search/search'
    //   })
    // }
    wx.navigateTo({
      url: '../search/search'
    })
  },
  jumpDetail: function(e) {
    if(this.data.end=='1'){
      // if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined || wx.getStorageSync('token') == null) {
      //   wx.showToast({
      //     title: '请登录',
      //   })
      //   setTimeout(function () {
      //     wx.navigateTo({
      //       url: '../login/login',
      //     })
      //   }, 1000)
      // } else {
      //   var url = e.currentTarget.dataset.url
      //   wx.navigateTo({
      //     url: url
      //   })
      // }


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
        var url = e.currentTarget.dataset.url
        wx.navigateTo({
          url: url
        })
      }
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
    // that.loginRefresh()
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
    that.lastPage(pageNo, 15)
    wx.request({
      url: app.globalData.url + '/client/loginrefresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          app.globalData.msgNotifyIs = res.data.data.msgNotifyIs
          app.globalData.userId = res.data.data.userId || ''
          that.setData({
            newMsgCount: res.data.data.newMsgCount
          })
        } else if (res.data.code == 20 || res.data.code == 26) {
          // wx.showToast({
          //   title: res.data.codeMsg
          // })
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
    var that = this
    var pageNo = that.data.pageNo;
    that.lastPage(pageNo, 15)
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
  },



})