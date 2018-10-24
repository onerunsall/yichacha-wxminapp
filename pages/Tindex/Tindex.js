// pages/Tindex/Tindex.js
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
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    var domain = 'https://dev.njshangka.com';
    wx.setStorageSync('domain', domain);
    that.setData({
      domain: domain
    })
      


    wx.request({
      url: domain + '/yichaxun/u/ua/loginindev',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        userPhone: 15077822798
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
    wx.request({
      url: domain + '/yichaxun/u/homeadlist',
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
            // hrefs: 'https://passion.njshangka.com/yichaxun/weixin/newsDetails.html'
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
      url: that.data.domain+'/yichaxun/data/list',
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
                  pic1 = dataPic;
                  pic2 = '';
                  pic3 = '';
                } else if (dataPic.length == 2) {
                  pic1 = dataPic[0];
                  pic2 = dataPic[1];
                  pic3 = '';
                } else {
                  pic1 = dataPic[0];
                  pic2 = dataPic[1];
                  pic3 = dataPic[2];
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

  }
})