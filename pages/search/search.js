// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchlist:[],
    inputVal:'',
    searchVal:1,
    lastRowId: '',
    domain: '',
    septum: '',
    inputkeyword:'',
    list:[],
    keyword:'',
  },
  inputUser:function(e){
    var keyword = e.detail.value
    this.setData({
      keyword: keyword
      // inputkeyword: e.detail.value
    })
    if (e.detail.value!=''){
      this.setData({
        searchVal: 2
      })
    }else{
      this.setData({
        searchVal: 1
      })
    }
    this.setData({
      list: []
    })
    this.lastPage(keyword, '', '')
  },
  searchSpan:function(e){
    var that = this
    var keyword = e.currentTarget.dataset.text
    
    that.setData({
      inputVal: keyword,
      keyword: keyword,
      list: [],
      searchVal: 2
    })
    that.lastPage(keyword,'','')
   
  },
  searchIcon:function(e){
    var that = this
    var keyword = that.data.keyword;
   
    that.setData({
      keyword: keyword,
      list: [],
      searchVal: 2
    })
  
    that.lastPage(keyword, '', '')
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var domain = wx.getStorageSync('domain')
    wx.request({
      url: domain + '/yichaxun/u/hotkeylist',
      header: {
        'Content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          that.setData({
            domain: domain,
            searchlist: res.data.data.items,
          })
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })
  },
  lastPage: function (keyword,lastRowId, septum) {
    var that = this;
    wx.request({
      url: that.data.domain + '/yichaxun/data/list',
      method: 'post',
      data: {
        keyword: keyword,
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
                septum: res.data.data.items[i].dataAddTime,
              })
            }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var lastRowId = that.data.lastRowId;
    var septum = that.data.septum;
    var keyword = that.data.keyword;
    that.lastPage(keyword,lastRowId, septum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})