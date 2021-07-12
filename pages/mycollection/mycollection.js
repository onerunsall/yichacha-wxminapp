// pages/mycollection/mycollection.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    learnMore: '',
    list:[],
    show: 1
  },
  jumpDetail(e){
    
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  removeSc(e){
   
    var id = e.currentTarget.dataset.id
    var that = this
    wx.request({
      url: app.globalData.url + '/client/favordel',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: wx.getStorageSync('token'),
        favorId: id
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          wx.showToast({
            title: '删除收藏',
          })
          var list=that.data.list
          console.log(list)
          for (var i = 0;i<that.data.list.length;i++){
            if (that.data.list[i].favorId == id){
              // somearray.removeByValue()
              // that.data.list[i]=''
              // delete list[i]
              list.splice(i, 1); 
            }
          }
          if (that.data.list.length==0){
            that.setData({
              show:0,
              learnMore:[]
            })
          }
          that.setData({
            list: list
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this
      that.lastPage(1,16)
  },
  lastPage: function (pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/client/favors',
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

          if (res.data.data.items.length < pageSize) {
            if (pageNo == 2 && res.data.data.items.length == 0) {
              that.setData({
                learnMore: '当前没有数据',
              });
            } else {
              that.setData({
                learnMore: '没有更多了',
              });
            }
          } else {
            that.setData({
              learnMore: '上拉加载更多',
            });
          }
          pageNo++
          if (pageNo == 2 && res.data.data.items.length==0) {
            that.setData({
              show: 0
            })
          }
          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
      
          for (var i = 0; i < res.data.data.items.length; i++) {
            if (res.data.data.items[i].product.cover) {
              res.data.data.items[i].product.cover = app.globalData.url + res.data.data.items[i].product.cover;

            } else {
              res.data.data.items[i].product.cover = app.globalData.url + '/resource/Group_12.png';

            }
           
          if (res.data.data.items.length == 0) {
            
            that.setData({
              list: newlist,
              pageNo: pageNo,
            });
            wx.showToast({
              title: '数据已全部加载',
              // icon: 'loading',
              // duration: 1500
            })
          } else {
            that.setData({
              list: newlist,
              pageNo: pageNo,
            });
            
            }

            var list = that.data.list
            that.setData({
              list: list,
              pageNo: pageNo
            })
          }
        }else if (res.data.code == 20 || res.data.code == 26) {
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
    that.lastPage(pageNo, 16)
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
    that.lastPage(pageNo, 16)
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