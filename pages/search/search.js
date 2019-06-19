// pages/search/search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchlist: [],
    inputVal: '',
    searchVal: 1,
    lastRowId: '',
    domain: '',
    septum: '',
    inputkeyword: '',
    list: [],
    keyword: '',
    learnMore: '上拉加载更多',
    showDel: 0,
    navbar: ['产品', '厂商'],
    currentTab: 0,
    productIs:0,
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      list: [],
      list1: [],
      productIs: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx==0){
      this.lastPage(this.data.keyword, 1, 15)
    }else{
      this.lastPageCs(this.data.keyword, 1, 15)
    }
  },
  delThis(e) {
    this.setData({
      list: [],
      inputVal: '',
      searchVal: 1,
      showDel: 1
    })
  },
  refuse(e) {
    this.setData({
      list: [],
      inputVal: '',
      searchVal: 1,
    })
    wx.navigateBack({

    })
  },

  inputUserSearch(e) {
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
    if (this.data.currentTab==0){
      this.lastPage(keyword, 1, 15)
    }else{
      this.lastPageCs(keyword, 1, 15)
    }
    
  },
  inputUser: function(e) {
    var keyword = e.detail.value
    this.setData({
      list: [],
      keyword: keyword,
      showDel: 1
      // learnMore: ''
      // inputkeyword: e.detail.value
    })
    if (e.detail.value == '') {
      this.setData({
        searchVal: 1,
        showDel: 0
      })
    }
  },
  searchSpan: function(e) {
    var that = this
    var keyword = e.currentTarget.dataset.kw
    for (var i = 0; i < that.data.searchlist.length;i++){
      if (keyword == that.data.searchlist[i].keyword){
        that.data.searchlist[i].bgColor ='rgb(255, 149, 27);'
        that.data.searchlist[i].color = 'rgb(255, 255, 255);'
      }
    }
    that.setData({
      searchlist: that.data.searchlist,
      showDel:1
    })
    setTimeout(function(){
      for (var i = 0; i < that.data.searchlist.length; i++) {
        if (keyword == that.data.searchlist[i].keyword) {
          that.data.searchlist[i].bgColor = 'rgb(245, 245, 245);'
          that.data.searchlist[i].color = 'rgb(51, 51, 51);'
        }
      }
      that.setData({
        list: [],
        searchVal: 2,
        inputVal: keyword,
        keyword: keyword,
        learnMore: '加载中',
        searchlist: that.data.searchlist
      })
      if (that.data.currentTab==0){
       that.lastPage(e.currentTarget.dataset.kw, 1, 15)
     }else{
        that.lastPageCs(e.currentTarget.dataset.kw, 1, 15)
     }
    },500)
  },
  searchIcon: function(e) {
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
  onLoad: function(options) {
    var that = this
    var domain = wx.getStorageSync('domain')
    wx.request({
      url: app.globalData.url + '/yichacha/client/page/3-0-2',
      header: {
        'Content-type': 'application/json'
      },
      method: 'post',
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {

          for (var i = 0; i < res.data.data.ads.length; i++) {
            res.data.data.ads[i].paixuid = (i + 1)
            res.data.data.ads[i].bgColor ='rgb(245, 245, 245)'
            res.data.data.ads[i].color = 'rgb(51, 51, 51)'
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
  //   value = '环网柜';
  //   var data = JSON.parse(res.Content).rows;

  //   // 将标题已关键字拆开成数组    
  //   for(let i = 0; i<data.length; i++) {
  //   data[i].title = that.hilight_word(value, data[i].title);
  // },

  // 根据搜索字分割字符
  hilight_word: function(key, word) {
    let idx = word.indexOf(key),
      t = [];

    if (idx > -1) {
      if (idx == 0) {
        t = this.hilight_word(key, word.substr(key.length));
        t.unshift({
          key: true,
          str: key
        });
        return t;
      }

      if (idx > 0) {
        t = this.hilight_word(key, word.substr(idx));
        t.unshift({
          key: false,
          str: word.substring(0, idx)
        });
        return t;
      }
    }
    return [{
      key: false,
      str: word
    }];
  },

  lastPage: function(keyword, pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/yichacha/client/products',
      method: 'post',
      data: {
        kw: keyword,
        pn: pageNo,
        ps: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function(res) {
        if (res.data.code == 0) {
          console.log('pageNo=' + pageNo)
          pageNo++
          var pic1, pic2, pic3;
          if (res.data.data.items.length < 15) {
            that.setData({
              learnMore: '没有更多了'
            });
          }
          for (var i = 0; i < res.data.data.items.length; i++) {
            var data = res.data.data.items
            if (res.data.data.items[i].name.indexOf(keyword) > -1) {
              data[i].name = that.hilight_word(keyword, data[i].name);
            }
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
            if (pageNo==2){
              that.setData({
                list: newlist,
                pageNo: pageNo,
                learnMore: '当前无数据'
              });
            }else{
              that.setData({
                list: newlist,
                pageNo: pageNo,
                learnMore: '没有更多了'
              });
            }
            
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
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },

  lastPageCs: function(keyword, pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/yichacha/client/cos',
      method: 'post',
      data: {
        kw: keyword,
        pn: pageNo,
        ps: pageSize
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function(res) {
        if (res.data.code == 0) {
          pageNo++
          if (res.data.data.items.length < 15) {
            that.setData({
              learnMore: '没有更多了'
            });
          }
          for (var i = 0; i < res.data.data.items.length; i++) {
            var data = res.data.data.items
            if (res.data.data.items[i].name.indexOf(keyword) > -1) {
              data[i].name = that.hilight_word(keyword, data[i].name);
            }
          }

          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
          if (res.data.data.items.length == 0) {
            if (pageNo == 2) {
              that.setData({
                list: newlist,
                pageNo: pageNo,
                learnMore: '当前无数据'
              });
            } else {
              that.setData({
                list: newlist,
                pageNo: pageNo,
                learnMore: '没有更多了'
              });
            }
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
    var keyword = that.data.keyword;
    that.setData({
      list: []
    })
    if (that.data.currentTab==0){
      that.lastPage(keyword, pageNo, 15)
    }else{
      that.lastPageCs(keyword, pageNo, 15)
    }  
    
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    var pageNo = that.data.pageNo;
    var keyword = that.data.keyword;
    if (that.data.currentTab == 0) {
      that.lastPage(keyword, pageNo, 15)
    } else {
      that.lastPageCs(keyword, pageNo, 15)
    }  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})