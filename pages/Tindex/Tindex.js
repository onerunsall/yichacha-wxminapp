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
    lastRowId:'',
    domain:'',
    septum:'',
    type:1,
    showModal: false,
    userInfo: {},
    code:'',
  },
  nook: function (e) {
      this.setData({
        showModal:false
      })
  },
  getUserInfo: function (e) {
    console.log(e)
    var that=this
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      showModal: false
    })

    wx.request({
      url: that.data.domain + '/u/ycc/ua/wxminapplogin',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        code: that.data.code,
        nickname: that.data.userInfo.nickName,
        avatarUrl: that.data.userInfo.avatarUrl,
        gender: that.data.userInfo.gender,
        country: that.data.userInfo.country,
        province: that.data.userInfo.province,
        city: that.data.userInfo.city,
        language: that.data.userInfo.language,
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.setStorageSync('token', res.data.data.token)
        } else {
          wx.showModal({
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
    var domain = 'https://yichacha.njshangka.com';
    wx.setStorageSync('domain', domain);
    that.setData({
      domain: domain
    })

    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
          //发起网络请求
          console.log((res.code));
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            showModal: true
          })
        }
      }
    })



    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          // wx.relaunch({
          //   url: '../Tindex/Tindex',
          // })
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.request({
            url: that.data.domain + '/u/ycc/ua/wxminapplogin',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: 'post',
            data: {
              code: that.data.code,
              nickname: that.data.userInfo.nickName,
              avatarUrl: that.data.userInfo.avatarUrl,
              gender: that.data.userInfo.gender,
              country: that.data.userInfo.country,
              province: that.data.userInfo.province,
              city: that.data.userInfo.city,
              language: that.data.userInfo.language,
            },
            success: function (res) {
              wx.hideToast()
              if (res.data.code == 0) {
                wx.setStorageSync('token', res.data.data.token)
              } else {
                wx.showModal({
                  title: res.data.codeMsg
                })
              }
            }
          })
        }
      })
    }

  




    
    wx.request({
      url: domain + '/u/homeadlist',
      header: {
        'Content-type': 'application/json'
      },
      method: 'post',
      success: function(res) {
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
                hrefs: domain +  _html_,
              })
            }
          }

          that.setData({
            adverCover: homeAdPic,
            // hrefs: 'https://yichacha.njshangka.com/weixin/newsDetails.html'
          })
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })


    that.lastPage('','')
  },
  lastPage: function (lastRowId, septum) {
    var that = this;


    wx.request({
      url: that.data.domain+'/data/list',
      method: 'post',
      data: {
        dataOnHome:1,
        lastRowId: lastRowId,
        septum: septum
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {


        if (res.data.code == 0) {

          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            that.setData({
              list: newlist,
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              list: newlist,
            });
            for (var i = 0; i < res.data.data.items.length; i++) {
              that.setData({
                lastRowId: res.data.data.items[i].dataId,
                septum: res.data.data.items[i].dataOnHomeSort,
              })
            }   
            var pic1, pic2, pic3;
              for (var i = 0; i < that.data.list.length; i++) { 
              if (that.data.list[i].dataPic) {
                var dataPic = that.data.list[i].dataPic.split(',')
                if (dataPic.length == 1) {
                  pic1 = 'http://yichacha.njshangka.com'+dataPic;
                  pic2 = '';
                  pic3 = '';
                } else if (dataPic.length == 2) {
                  pic1 = 'http://yichacha.njshangka.com' +dataPic[0];
                  pic2 = 'http://yichacha.njshangka.com' +dataPic[1];
                  pic3 = '';
                } else {
                  pic1 = 'http://yichacha.njshangka.com' +dataPic[0];
                  pic2 = 'http://yichacha.njshangka.com' +dataPic[1];
                  pic3 = 'http://yichacha.njshangka.com' +dataPic[2];
                }
              }
                that.data.list[i].pic1 = pic1
                that.data.list[i].pic2 = pic2
                that.data.list[i].pic3 = pic3
            }
          
              var list = that.data.list
            that.setData({
              list: list
            })
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

  jumpurl:function(e){
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../linkhref/linkhref?url='+url
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
  onReachBottom: function () {
    var that = this
    var lastRowId = that.data.lastRowId;
    var septum = that.data.septum;
    that.lastPage(lastRowId, septum)
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