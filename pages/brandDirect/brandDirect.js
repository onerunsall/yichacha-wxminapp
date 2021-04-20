// pages/brandDirect/brandDirect.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '销量', '价格'],
    currentTab: 0,
    proHeight: '',
    proHeightOver: '',
    list: [],
    priceIf: 1,
    priceIsPx: 1,
  },
  detail(e) {
    if (app.globalData.loginIs == '0') {
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
        url: '../brandDirectDetail/brandDirectDetail?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      list: [],
    })
    if (e.currentTarget.dataset.idx == 0) {
      this.lastPage(1, 150, '', '')
      this.setData({
        priceIsPx: 1,
        priceIf: 1
      })
    } else if (e.currentTarget.dataset.idx == 1) {
      this.lastPage(1, 150, 'soldCount', 'desc')
      this.setData({
        priceIsPx: 1,
        priceIf: 1
      })
    } else if (e.currentTarget.dataset.idx == 2) {
      console.log(e.currentTarget.dataset.price)
      if (e.currentTarget.dataset.price == 1) {
        this.lastPage(1, 150, 'price', 'asc')
        this.setData({
          priceIsPx: 2,
          priceIf: 2
        })
      } else {
        this.lastPage(1, 150, 'price', 'desc')
        this.setData({
          priceIsPx: 3,
          priceIf: 1
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.statusBarHeight, res.windowHeight, res.navBarHeight, res.screenHeight, res.screenHeight - res.statusBarHeight - 118)
        that.setData({
          proHeight: (res.windowHeight - res.statusBarHeight - 118),
          // proHeightOver: res.screenHeight - res.statusBarHeight
          // proHeight:auto
        })
      },
    })
    that.lastPage(1, 150, '', '')

  },
  lastPage: function(pageNo, pageSize, sorts, orders) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/client/commodityList?pn=' + pageNo + '&ps=' + pageSize + '&token=' + wx.getStorageSync('token') + '&sorts=' + sorts + '&orders=' + orders,
      method: 'post',
      // data: {
      //   zhucerenCoId: that.data.id,
      //   pn: pageNo,
      //   septum: pageSize,
      // },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function(res) {
        if (res.data.code == 0) {
          pageNo++
          for (var i = 0; i < res.data.data.items.length; i++) {
            res.data.data.items[i].percent = parseInt((res.data.data.items[i].soldCount / (res.data.data.items[i].soldCount + res.data.data.items[i].stock)) * 100)
            if (res.data.data.items[i].cover != '' && res.data.data.items[i].cover != null && res.data.data.items[i].cover != 'undefined' && res.data.data.items[i].cover.slice(0, 1) != 'h') {
              console.log(res.data.data.items[i].cover)
              res.data.data.items[i].cover = app.globalData.url + res.data.data.items[i].cover
            } else {
              console.log(res.data.data.items[i].cover)
              res.data.data.items[i].cover = 'https://yichacha.njshangka.com/resource/adsbg.png'
            }

          }
          var list = that.data.list;
          console.log(list)
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
    var that = this
    var pageNo = 1;
    this.lastPage(pageNo, 150, '', '')
    that.setData({
      list: [],
      learnMore: '加载中'
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   var that = this
  //   var pageNo = that.data.pageNo;
  //   that.lastPage(pageNo, 150, '', '')
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '医查查在线',
      desc: '推荐你一款专业的医疗器械和厂商查询工具,各大医院厂商都在用',
      path: 'pages/index/index?shareUserId=' + app.globalData.userId + '&id=' + this.data.id + '&pageId=4', //这里在首页的地址后面添加我们需要传值的标识位pageId以及值123(pageId 这个名字你们可以自己随便乱取 如同一个变量名)
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})