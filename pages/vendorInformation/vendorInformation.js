// pages/vendorInformation/vendorInformation.js
var app = getApp()
var pinyin = require('../../utils/pinyin.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
    list: [],
    learnMore: '上拉加载更多',
    makephone: 0,
    id: '',
    gsName:'',
    pinyinText:'',
    height1:'',
    height1s: '',
    zhucerenCoTels:'',
  },
  shareholders(e){
    wx.navigateTo({
      url: '../shareholders/shareholders',
    })
  },
  administrative(e){
    wx.navigateTo({
      url: '../administrative/administrative',
    })
  },
  bidding(e) {
    wx.navigateTo({
      url: '../bidding/bidding',
    })
  },
  site(e){
    var self = this;
    var site = e.currentTarget.dataset.site
    wx.setClipboardData({
      data: site,
      success: function (res) {
        wx.hideToast()
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '链接复制成功，请从浏览器打开链接',
          success: function (res) {
          }
        })
      }
    })
  },
  hrefUrl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  makePhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
  phoneClose(e) {
    this.setData({
      makephone: 0
    })
  },
  tel(e) {
    console.log(this.data.zhucerenCoTel)
    this.setData({
      makephone: 1
    })
  },
  look1(e){
    this.setData({
      height1:2,
      height1s:'',
    })
  },
  look1a(e) {
    this.setData({
      height1: 1,
      height1s:'changuoDis',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    var that = this
    that.setData({
      id: id
    }) 
    wx.request({
      url: app.globalData.url + '/client/coinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        coId: id,
        // token: token
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          var gsName = res.data.data.name;
          var covers = '';
          if (res.data.data.cover == '' || res.data.data.cover == null || res.data.data.cover == undefined) {
            res.data.data.cover = app.globalData.url + '/resource/3DBJ@2x.png'
          } else if (res.data.data.cover.slice(0, 1) != 'h') {
            res.data.data.cover = app.globalData.url + res.data.data.cover 
          }

          var zhucerenCoTel = [], zhucerenCoTels='';
          if (res.data.data.tel == '' || res.data.data.tel == null || res.data.data.tel == undefined) {
            zhucerenCoTel = []
            
          } else {
            zhucerenCoTel = res.data.data.tel.split(',')
            console.log(zhucerenCoTel, zhucerenCoTel.length, zhucerenCoTel[0])
            for (var i = 0; i < zhucerenCoTel.length; i++) {
              zhucerenCoTel[i] = zhucerenCoTel[i]
            }
            zhucerenCoTels = zhucerenCoTel[0]
          }
          if (res.data.data.logo == '' || res.data.data.logo == null || res.data.data.logo==undefined){
            var char = gsName.slice(0, 1);
            char = char && char.trim();
            that.setData({
              pinyinText: pinyin[char].join(', ').slice(0, 1).toUpperCase()
            });
          }else{
            that.setData({
              pinyinText: ''
            });
            if (res.data.data.logo.slice(0,1)!='h'){
              covers = app.globalData.url + res.data.data.logo
            }else{
              covers = res.data.data.logo
            }
            
          }
          var tags=''
          if (res.data.data.tags == '' || res.data.data.tags == null || res.data.data.tags ==undefined){
            tags ==''
          }else{
            tags = res.data.data.tags.split(',')
          }
          if (res.data.data.intro != '' && res.data.data.intro != null && res.data.data.intro!=undefined&&res.data.data.intro.length>57){
            console.log(res.data.data.intro.length)
            that.setData({
              height1s: 'changuoDis',
              height1:1
            })
          }else{
            that.setData({
              height1s: '',
              height1: ''
            })
          }
          that.setData({
            gsName: gsName,
            covers: covers,
            detail: res.data.data,
            zhucerenCoTel: zhucerenCoTel,
            tags: tags,
            zhucerenCoTels: zhucerenCoTels,
          })
          console.log(that.data.zhucerenCoTels)
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })

    that.lastPage(1, 15, options.id)
  },
  TDLook(e) {
    console.log(encodeURI(this.data.detail.lobby3D))
    wx.navigateTo({
      url: '../webview/webview?href=' + encodeURIComponent(this.data.detail.lobby3D),
    })
  },

  lastPage: function(pageNo, pageSize, id) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/client/guochanyiliaoqixies?pn=' + pageNo + '&ps=' + pageSize + '&zhucerenCoId=' + id,
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function(res) {


        if (res.data.code == 0) {
          pageNo++
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

            var pic1, pic2, pic3;
            for (var i = 0; i < that.data.list.length; i++) {
              if (that.data.list[i].pics) {
                var pics = that.data.list[i].pics.split(',')
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
                pic1 = app.globalData.url + '/resource/Group_12.png';
                pic2 = '';
                pic3 = '';
              }
              that.data.list[i].pic1 = pic1
              that.data.list[i].pic2 = pic2
              that.data.list[i].pic3 = pic3
            }

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
    if (app.globalData.loginIs == 0) {
      wx.showToast({
        title: '请登录查看',
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 500)
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
    var that = this
    var pageNo = 1;
    that.setData({
      list: [],
      learnMore: '加载中'
    })
    that.lastPage(pageNo, 15, that.data.id)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    var pageNo = that.data.pageNo;
    that.lastPage(pageNo, 15, that.data.id)
  },

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
      path: 'pages/index/index?shareUserId=' + app.globalData.userId + '&id=' + this.data.id + '&pageId=2', //这里在首页的地址后面添加我们需要传值的标识位pageId以及值123(pageId 这个名字你们可以自己随便乱取 如同一个变量名)
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})