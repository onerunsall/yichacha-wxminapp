// pages/search/search.js
var app=getApp()
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
    learnMore: '上拉加载更多'
  },
  refuse(e){
    this.setData({
      list: [],
      inputVal:'',
      searchVal:1,
    })
    wx.navigateBack({
      
    })
  },

  inputUserSearch(e){
    var keyword = e.detail.value
    if (e.detail.value != '') {
      this.setData({
        searchVal: 2
      })
    } else {
      this.setData({
        searchVal: 1
      })
    }
    this.setData({
      list: [],
      keyword: keyword,
      learnMore: '加载中'
      // inputkeyword: e.detail.value
    })
    this.lastPage(keyword, 1, 15)
  },
  inputUser:function(e){
    var keyword = e.detail.value
    this.setData({
      list: [],
      keyword: keyword,
      // learnMore: ''
      // inputkeyword: e.detail.value
    })
    if (e.detail.value==''){
      this.setData({
        searchVal: 1
      })
    }
  },
  searchSpan:function(e){
    var that = this
    var keyword = e.currentTarget.dataset.kw
    console.log(keyword)
    that.setData({
      list: [],
      searchVal: 2,
      inputVal: keyword,
      keyword: keyword,
      learnMore: '加载中'
    })
    console.log(that.data.searchVal+'=====')
    that.lastPage(e.currentTarget.dataset.kw,1,15)  
    console.log(that.data.list+"========")
  },
  searchIcon:function(e){
    var that = this
    var keyword = that.data.keyword;
   
    that.setData({
      keyword: keyword,
      list: [],
      searchVal: 2
    })
  
    that.lastPage(keyword, 1, 15)
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var domain = wx.getStorageSync('domain')
    wx.request({
      url: app.globalData.url + '/yichacha/client/page/3-0-2',
      header: {
        'Content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
         
          for (var i = 0; i < res.data.data.ads.length; i++) {
            res.data.data.ads[i].paixuid = (i + 1)
          }

          that.setData({
            domain: domain,
            searchlist: res.data.data.ads,
          })
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })
  },
  lastPage: function (keyword,pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url  + '/yichacha/client/products',
      method: 'post',
      data: {
        kw: keyword,
        pn: pageNo,
        ps: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        if (res.data.code == 0) {
          console.log('pageNo=' + pageNo)
          pageNo++
          var pic1, pic2, pic3;
          if (res.data.data.items.length<15){
            that.setData({
              learnMore: '没有更多了'
            });
          }
          for (var i = 0; i < res.data.data.items.length; i++) {
            if (res.data.data.items[i].coName.indexOf(keyword) > -1) {
              // searched.push(hilight_word(inputs, current_word))
            }

            // if (res.data.data.items[i].coName.split(keyword)){
            //   res.data.data.items[i].coName = res.data.data.items[i].coName.split(keyword)[0] + '<b>' + keyword + '</b>' + res.data.data.items[i].coName.split(keyword)[1]
            // }
            console.log(res.data.data.items[i].coName.indexOf(keyword), res.data.data.items[i].name.indexOf(keyword))
            if (res.data.data.items[i].name.split(keyword)) {
              res.data.data.items[i].name = res.data.data.items[i].name.split(keyword)[0] + '<b>' + keyword + '</b>' + res.data.data.items[i].name.split(keyword)[1]
            }
            if (res.data.data.items[i].pics != '' && res.data.data.items[i].pics != null && res.data.data.items[i].pics!=undefined) {
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
            } else {
              pic1 = app.globalData.url + '/yichacha/resource/Group_12.png';
              pic2 = '';
              pic3 = '';
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
            
           

            var list = that.data.list
            that.setData({
              list: list,
              pageNo: pageNo
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
    var keyword = that.data.keyword;
    that.lastPage(keyword, pageNo, 15)
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
    var keyword = that.data.keyword;
    that.lastPage(keyword, pageNo, 15)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})