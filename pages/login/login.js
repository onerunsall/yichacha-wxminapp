// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: 1,
    read: 1,
    tel: '',
    smsvcode: '',
    times: '获取验证码',
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // getPhoneNumber(e) {
  //   console.log(e.detail)
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.iv)
  //   console.log(e.detail.encryptedData)
  // },
  yes(e) {
    this.setData({
      read: 1
    })
  },
  no(e) {
    this.setData({
      read: 0
    })
  },

  loginBtn(e) {
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
          app.globalData.code = res.code

          if (that.data.tel == '' || that.data.smsvcode == '') {
            wx.showToast({
              title: '请填写完整信息',
            })
          } else if (that.data.read != 1) {
            wx.showToast({
              title: '请勾选服务条款',
            })
          } else {
            wx.request({
              url: app.globalData.url + '/client/wxminapplogin',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              method: 'post',
              data: {
                code: app.globalData.code,
                phone: that.data.tel,
                smsvcode: that.data.smsvcode,
                registerFromShareUserId: app.globalData.shareUserId,
              },
              success: function(res) {
                wx.hideToast()
                if (res.data.code == 0) {
                  app.globalData.loginIs = 1
                  var token = res.data.data.token
                  wx.setStorageSync('token', res.data.data.token)
                  wx.removeStorageSync('isBind')


                  wx.request({
                    url: app.globalData.url + '/client/loginrefresh',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    method: 'post',
                    data: {
                      token: token
                    },
                    success: function(res) {
                      wx.hideToast()
                      if (res.data.code == 0) {
                        if (res.data.data.identity == '' || res.data.data.identity == null || res.data.data.identity == undefined) {
                          wx.showToast({
                            title: '请绑定身份',
                          })
                          setTimeout(function() {
                            wx.navigateTo({
                              url: '../selectRole/selectRole',
                            })
                          }, 1000)
                        } else {
                          wx.navigateBack({

                          })
                        }

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
                  wx.setStorageSync('isBind', 1)
                  wx.showToast({
                    title: '请登录',
                  })
                  setTimeout(function() {
                    wx.navigateTo({
                      url: '../login/login',
                    })
                  }, 1000)
                } else {
                  wx.showToast({
                    title: res.data.codeMsg,
                    icon: 'none',
                  })
                }
              }
            })
          }

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // // 查看是否授权
    // wx.getSetting({
    //   success: function(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function(res) {
    //           console.log(res.userInfo)
    //           //用户已经授权过
    //         }
    //       })
    //     }
    //   }
    // })

    wx.removeStorageSync('isBind')
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          this.setData({
            code: res.code
          })
        }
      }
    })
  },
  phone(e) {

    this.setData({
      tel: e.detail.value
    })
  },
  smsvcode(e) {
    this.setData({
      smsvcode: e.detail.value
    })
  },
  smsvcodeGet(e) {
    var that = this
    var time = 60
    if (that.data.tel == '' || that.data.tel.length < 11) {
      wx.showToast({
        title: '请填写正确手机号',
      })
    } else if (that.data.times != '获取验证码') {
      return
    } else {
      wx.request({
        url: app.globalData.url + '/sendsmsvcode',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: 'post',
        data: {
          phone: that.data.tel,
          // smsvcode: that.data.smsvcode
        },
        success: function(res) {
          wx.hideToast()
          // if (res.data.code == 0) {
          var timer = setInterval(function() {
            time--;
            that.setData({
              times: time + ' s'
            })
            // me.html(time + ' s');
            if (time == 0) {
              console.log(time)
              clearInterval(timer);
              // me.html('获取验证码');
              that.setData({
                times: '获取验证码'
              })
            }
          }, 1000);

          // } else {
          //   wx.showToast({
          //     title: res.data.codeMsg
          //   })
          // }
        }
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
    //如果 isBack 为 true，就返回上一页
    if (that.data.isBack) {
      wx.navigateBack()
    }
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