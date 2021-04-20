// pages/detail/detail.js
var app = getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    makephone: 0,
    swiperCurrent: 0,
    imgalist: [
      // 'http://yichacha.njshangka.com/oss/201705170933064386274.jpg',
      //  'http://yichacha.njshangka.com/oss/201705170933064386274.jpg',
      //  'http://yichacha.njshangka.com/oss/201705170933064386274.jpg',
      //  'http://yichacha.njshangka.com/oss/201705170933064386274.jpg'
    ],
    detail: [],
    phone: '',
    url: '',
    domain: '',
    token: '',
    showModal: false,
    urlText: '',
    dlzcDIs: 'none',
    height1:'changuoDis',
    height2:'changuoDis',
    height3: 'changuoDis',
    height4: 'changuoDis',
    height5: 'changuoDis',
    height6: 'changuoDis',
    height7: 'changuoDis',
    height8: 'changuoDis',
    height9: 'changuoDis',
    height10: 'changuoDis',
    height11: 'changuoDis',
    height12: 'changuoDis',
    showIf:true
  },
  look1(e){
    var detail = this.data.detail
    detail.height1=2
    this.setData({
      detail: detail,
      height1: '',
    })
  },
  look1a(e) {
    var detail = this.data.detail
    detail.height1 = 1
    this.setData({
      detail: detail,
      height1: 'changuoDis',
    })
  },
  look2(e) {
    var detail = this.data.detail
    detail.height2 = 2
    this.setData({
      detail: detail,
      height2: ''
    })
  },
  look2a(e) {
    var detail = this.data.detail
    detail.height2 = 1
    this.setData({
      detail: detail,
      height2: 'changuoDis'
    })
  },
  look3(e) {
    var detail = this.data.detail
    detail.height3 = 2
    this.setData({
      detail: detail,
      height3: ''
    })
  },
  look3a(e) {
    var detail = this.data.detail
    detail.height3 = 1
    this.setData({
      detail: detail,
      height3: 'changuoDis'
    })
  },
  look4(e) {
    var detail = this.data.detail
    detail.height4 = 2
    this.setData({
      detail: detail,
      height4: ''
    })
  },
  look4a(e) {
    var detail = this.data.detail
    detail.height4 = 1
    this.setData({
      detail: detail,
      height4: 'changuoDis'
    })
  },
  look5(e) {
    var detail = this.data.detail
    detail.height5 = 2
    this.setData({
      detail: detail,
      height5: ''
    })
  },
  look5a(e) {
    var detail = this.data.detail
    detail.height5 = 1
    this.setData({
      detail: detail,
      height5: 'changuoDis'
    })
  },
  look6(e) {
    var detail = this.data.detail
    detail.height6 = 2
    this.setData({
      detail: detail,
      height6: ''
    })
  },
  look6a(e) {
    var detail = this.data.detail
    detail.height6 = 1
    this.setData({
      detail: detail,
      height6: 'changuoDis'
    })
  },
  look7(e) {
    var detail = this.data.detail
    detail.height7 = 2
    this.setData({
      detail: detail,
      height7: ''
    })
  },
  look7a(e) {
    var detail = this.data.detail
    detail.height7 = 1
    this.setData({
      detail: detail,
      height7: 'changuoDis'
    })
  },
  look8(e) {
    var detail = this.data.detail
    detail.height8 = 2
    this.setData({
      detail: detail,
      height8: ''
    })
  },
  look8a(e) {
    var detail = this.data.detail
    detail.height8 = 1
    this.setData({
      detail: detail,
      height8: 'changuoDis'
    })
  },
  look9(e) {
    var detail = this.data.detail
    detail.height9 = 2
    this.setData({
      detail: detail,
      height9: ''
    })
  },
  look9a(e) {
    var detail = this.data.detail
    detail.height9 = 1
    this.setData({
      detail: detail,
      height9: 'changuoDis'
    })
  },
  look10(e) {
    var detail = this.data.detail
    detail.height10 = 2
    this.setData({
      detail: detail,
      height10: ''
    })
  },
  look10a(e) {
    var detail = this.data.detail
    detail.height10 = 1
    this.setData({
      detail: detail,
      height10: 'changuoDis'
    })
  },
  look11(e) {
    var detail = this.data.detail
    detail.height11 = 2
    this.setData({
      detail: detail,
      height11: ''
    })
  },
  look11a(e) {
    var detail = this.data.detail
    detail.height11 = 1
    this.setData({
      detail: detail,
      height11: 'changuoDis'
    })
  },
  look12(e) {
    var detail = this.data.detail
    detail.height12 = 2
    this.setData({
      detail: detail,
      height12: ''
    })
  },
  look12a(e) {
    var detail = this.data.detail
    detail.height12 = 1
    this.setData({
      detail: detail,
      height12: 'changuoDis'
    })
  },



  zdl(e) {
    this.setData({
      dlzcDIs: 'block'
    })
  },
  closeP(e) {
    this.setData({
      dlzcDIs: 'none'
    })
  },
  sc(e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/client/productfavor',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: that.data.token,
        productId: that.data.id
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {

          that.setData({
            favorIs: 1
          })
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })
  },
  ysc(e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/client/productunfavor',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        token: that.data.token,
        productId: that.data.id
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {

          that.setData({
            favorIs: 0
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
   * 预览图片
   */
  makePhone(e) {
    wx.makePhoneCall({
      // phoneNumber: this.data.detail.zhucerenCoTel,
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
  phoneClose(e) {
    this.setData({
      makephone: 0,
      makephones: 0,
    })
  },
  phoneNow(e) {
    console.log(this.data.zhucerenCoTel)
    this.setData({
      makephone: 1
    })
  },
  phoneNows(e) {
    console.log(this.data.zhucerenCoTel)
    this.setData({
      makephones: 1
    })
  },
  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  previewImage: function(e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    var that = this;
    var domain = wx.getStorageSync('domain')
    that.setData({
      domain: domain,
      id: id
    })
    var token = wx.getStorageSync('token')
    that.setData({
      token: token
    })
    wx.request({
      url: app.globalData.url + '/client/guochanyiliaoqixieinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        guochanyiliaoqixieId: id,
        token: token
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {
          if (res.data.data.corporation) {
            if (res.data.data.corporation.corporationTel) {
              that.setData({
                phone: res.data.data.corporation.corporationTel
              })
            }
            if (res.data.data.corporation.corporationSite) {
              that.setData({
                url: res.data.data.corporation.corporationSite
              })
            }
          }
          var imgalist = []
          if (res.data.data.pics) {
            imgalist = res.data.data.pics.split(',');
            for (var i = 0; i < imgalist.length; i++) {
              if (imgalist[i].slice(0, 1) != 'h' && imgalist[i].slice(0, 1) != '.') {
                imgalist[i] = app.globalData.url + imgalist[i]
              }
            }
            that.setData({
              imgalistIf: 1
            })
          } else {
            that.setData({
              imgalistIf: 0
            })
            imgalist = imgalist.concat(app.globalData.url + '/resource/zanwutupian@2x.png')
          }
          if (res.data.data.addTime != null && res.data.data.addTime != '' && res.data.data.addTime != 'undefined') {
            res.data.data.addTime = utils.formatTime(res.data.data.addTime / 1000, 'Y-M-D');
          }
          if (res.data.data.alterTime != null && res.data.data.alterTime != '' && res.data.data.alterTime != 'undefined') {
            res.data.data.alterTime = utils.formatTime(res.data.data.alterTime / 1000, 'Y-M-D');
          }
          var zhucerenCoTel = [], dailirenCoTel=[];
          if (res.data.data.zhucerenCoTel == '' || res.data.data.zhucerenCoTel == null || res.data.data.zhucerenCoTel == undefined) {
            zhucerenCoTel = []
          } else {
            zhucerenCoTel = res.data.data.zhucerenCoTel.split(',')
            for (var i = 0; i < zhucerenCoTel.length; i++) {
              zhucerenCoTel[i] = zhucerenCoTel[i]
            }
          }
          if (res.data.data.dailirenCoTel == '' || res.data.data.dailirenCoTel == null || res.data.data.dailirenCoTel == undefined) {
            dailirenCoTel = []
          } else {
            dailirenCoTel = res.data.data.dailirenCoTel.split(',')
            for (var i = 0; i < dailirenCoTel.length; i++) {
              dailirenCoTel[i] = dailirenCoTel[i]
            }
          }
          if (res.data.data.shiyongfanwei != '' && res.data.data.shiyongfanwei != null && res.data.data.shiyongfanwei!=undefined&&res.data.data.shiyongfanwei.length>42){
              res.data.data.height1=1
          }else{
            res.data.data.height1 = 0
          }
          if (res.data.data.xinghaoguige != '' && res.data.data.xinghaoguige != null && res.data.data.xinghaoguige != undefined &&res.data.data.xinghaoguige.length > 50) {
            res.data.data.height2 = 1
          } else {
            res.data.data.height2 = 0
          }
          if (res.data.data.jiegoujizucheng != '' && res.data.data.jiegoujizucheng != null && res.data.data.jiegoujizucheng != undefined &&res.data.data.jiegoujizucheng.length > 50) {
            res.data.data.height3 = 1
          } else {
            res.data.data.height3 = 0
          }
          if (res.data.data.zhuyaozuchengchengfen != '' && res.data.data.zhuyaozuchengchengfen != null && res.data.data.zhuyaozuchengchengfen != undefined &&res.data.data.zhuyaozuchengchengfen.length > 50) {
            res.data.data.height4 = 1
          } else {
            res.data.data.height4 = 0
          }
          if (res.data.data.yuqiyongtu != '' && res.data.data.yuqiyongtu != null && res.data.data.yuqiyongtu != undefined &&res.data.data.yuqiyongtu.length > 50) {
            res.data.data.height5 = 1
          } else {
            res.data.data.height5 = 0
          }
          if (res.data.data.chanpinchucuntiaojianjiyouxiaoqi != '' && res.data.data.chanpinchucuntiaojianjiyouxiaoqi != null && res.data.data.chanpinchucuntiaojianjiyouxiaoqi != undefined &&res.data.data.chanpinchucuntiaojianjiyouxiaoqi.length > 50) {
            res.data.data.height6 = 1
          } else {
            res.data.data.height6 = 0
          }
          if (res.data.data.chanpinbiaozhun != '' && res.data.data.chanpinbiaozhun != null && res.data.data.chanpinbiaozhun != undefined &&res.data.data.chanpinbiaozhun.length > 50) {
            res.data.data.height7 = 1
          } else {
            res.data.data.height7 = 0
          }
          if (res.data.data.shengchandizhi != '' && res.data.data.shengchandizhi != null && res.data.data.shengchandizhi != undefined &&res.data.data.shengchandizhi.length > 50) {
            res.data.data.height8 = 1
          } else {
            res.data.data.height8 = 0
          }
          if (res.data.data.shenpibumen != '' && res.data.data.shenpibumen != null && res.data.data.shenpibumen != undefined &&res.data.data.shenpibumen.length > 50) {
            res.data.data.height9 = 1
          } else {
            res.data.data.height9 = 0
          }
          if (res.data.data.biangengqingkuang != '' && res.data.data.biangengqingkuang != null && res.data.data.biangengqingkuang != undefined &&res.data.data.biangengqingkuang.length > 50) {
            res.data.data.height10 = 1
          } else {
            res.data.data.height10 = 0
          }
          if (res.data.data.beizhu != '' && res.data.data.beizhu != null && res.data.data.beizhu != undefined &&res.data.data.beizhu.length > 50) {
            res.data.data.height11 = 1
          } else {
            res.data.data.height11 = 0
          }
          if (res.data.data.qitaneirong != '' && res.data.data.qitaneirong != null && res.data.data.qitaneirong != undefined &&res.data.data.qitaneirong.length > 50) {
            res.data.data.height12 = 1
          } else {
            res.data.data.height12 = 0
          }
          
          that.setData({
            imgalist: imgalist,
            detail: res.data.data,
            favorIs: res.data.data.favorIs,
            zhucerenCoTel: zhucerenCoTel,
            dailirenCoTel: dailirenCoTel,
            showIf:false
          })
        } else {
          wx.showModal({
            title: res.data.codeMsg
          })
        }
      }
    })

    // var query = wx.createSelectorQuery()
    // query.select(".height1").boundingClientRect(data => {        //获取屏幕宽度
    //   wx.getSystemInfo({
    //     success: res => {            //console.log(res)
    //       //获取文字高度rpx
    //       let height = data.height * 750 / res.screenWidth            //文字高度
    //       console.log(height)
    //     },
    //   })
    // }).exec();  
  },
  url: function(e) {
    var url = e.currentTarget.dataset.url;
    if (url != '') {
      this.setData({
        urlText: url,
        showModal: true
      })
    } else {
      wx.showModal({
        title: '该厂家官网尚待激活',
        content: '',
      })
    }

  },
  phone: function(e) {
    var that = this
    var phone = e.currentTarget.dataset.phone;
    if (phone != '') {
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    } else {
      wx.request({
        url: app.globalData.url + '/u/userinit',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: 'post',
        data: {
          token: that.data.token
        },
        success: function(res) {
          wx.hideToast()
          if (res.data.code == 0) {
            wx.makePhoneCall({
              phoneNumber: res.data.data.serviceTel,
            })
          } else {
            wx.showModal({
              title: res.data.codeMsg
            })
          }
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
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '医查查在线',
      desc: '推荐你一款专业的医疗器械和厂商查询工具,各大医院厂商都在用',
      path: 'pages/index/index?shareUserId=' + app.globalData.userId + '&id=' + this.data.id + '&pageId=1', //这里在首页的地址后面添加我们需要传值的标识位pageId以及值123(pageId 这个名字你们可以自己随便乱取 如同一个变量名)
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }

    // return {
    //   title: '医查查在线',
    //   desc: '推荐你一款专业的医疗器械和厂商查询工具,各大医院厂商都在用',
    //   path: 'pages/detail/detail?shareUserId=' + app.globalData.userId+'&id='+this.data.id
    // }
  },


  // 禁止屏幕滚动
  preventTouchMove: function() {},

  // 弹出层里面的弹窗
  ok: function() {
    this.setData({
      showModal: false
    })
  }
})