// pages/brandDirectDetail/brandDirectDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes:'',
    imgalist: [
      // 'https://yichacha.njshangka.com/resource/BJ-shouye@2x.png',
      // 'https://yichacha.njshangka.com/resource/BJ-shouye@2x.png',
      // 'https://yichacha.njshangka.com/resource/BJ-shouye@2x.png',
      // 'https://yichacha.njshangka.com/oss/20190730090535867356587.jpg'
    ],
    imgalistIf:1,
    swiperCurrent: 0,
    values:1,
    nameNumber:'',
    telNumber:'',
    valuesXg:0,
    maxlength:100,
    commodityId:'',
    pop:'',
    commodityOrderId:'',
    phone:'',
    disPlayIcon:'none',
  },
  closeIs(e){
    this.setData({
      pop: '',
    })
  },
  delOver(e){
      this.setData({
        phone: '',
        disPlayIcon: 'none',
      })
  },
  lookDetail(e) {
    wx.navigateTo({
      url: '../supplyOrder/supplyOrder'
    })
  },
  backIndex(e){
    wx.navigateBack({
      url:'../brandDirect/brandDirect'
    })
  },
  supplySure(e){
    var remark='';
    let that=this
    if (that.data.nameNumber == '' || that.data.nameNumber == null || that.data.nameNumber == undefined) {
      wx.showToast({
        title: '姓名不能为空',
      })
    } else if (that.data.telNumber == '' || that.data.telNumber == null || that.data.telNumber == undefined) {
      wx.showToast({
        title: '号码不能为空',
      })
    }else{
      wx.request({
        url: app.globalData.url + '/client/commodityOrder?commodityId=' + that.data.commodityId + '&token=' + wx.getStorageSync('token') + '&count=' + that.data.values + '&ordererTel=' + that.data.telNumber + '&ordererName=' + that.data.nameNumber + '&remark=' + remark,
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: function (res) {
          if (res.data.code == 0) {
            that.setData({
              commodityOrderId: res.data.data.commodityOrderId,
              pop: 2
            })
          } else if (res.data.code == 20 || res.data.code == 26) {
            wx.hideToast()
            wx.navigateTo({
              url: '../login/login',
            })
          } else {
            wx.showToast({
              title: res.data.codeMsg,
            })
          }
        }
      })
    }
   
  },
  nameNumber(e){
    var nameNumber = e.detail.value
    this.setData({
      nameNumber: nameNumber
    })
  },
  telNumber(e) {
    var telNumber = e.detail.value
    if (telNumber != '' && telNumber != null && telNumber !=undefined){
      this.setData({
        disPlayIcon: 'inline-block',
      })
    }else{
      this.setData({
        disPlayIcon: 'none',
      })
    }
    this.setData({
      telNumber: telNumber
    })
  },
  numberIn(e){
    var values=e.detail.value
    if (this.data.valuesXg == 0) {
      var maxlength = 100000
      this.setData({
        maxlength: maxlength,
        values: values
      })
    } else {
      var maxlength = this.data.valuesXg.length
      if (values >= this.data.valuesXg) {
        values = this.data.valuesXg
        this.setData({
          maxlength: maxlength,
          values: values
        })
      }
      else if (values < 0 || values == 1) {
        this.setData({
          maxlength: maxlength,
          values: 1
        })
      } else {
        this.setData({
          maxlength: maxlength,
          values: ''
        })
      }
    }   
  },
  addNum(e){
    var values = this.data.values
    values++
    if (this.data.valuesXg==0){
      var maxlength=100000
    }else{
      var maxlength = this.data.valuesXg.length
      if (values >= this.data.valuesXg) {
        values = this.data.valuesXg
      }
    }
    this.setData({
      values: values,
      maxlength: maxlength
    })
  },
  delNum(e) {
    var values = this.data.values
    values--
    if (values <=1) {
      values = 1
    }
    this.setData({
      values: values
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  supplyNow(e){
    let that=this
    that.setData({
      pop:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    var commodityId = options.id
    // console.log(app.globalData.phone)
    that.setData({
      id: options.id,
      commodityId: commodityId,
      phone:app.globalData.phone,
      telNumber: app.globalData.phone,
    })
    if (app.globalData.phone == '' || app.globalData.phone == null || app.globalData.phone==undefined){
      that.setData({
        disPlayIcon:'none'
      })
    }else{
      that.setData({
        disPlayIcon: 'inline-block'
      })
    }
    wx.request({
      url: app.globalData.url + '/client/commodityInfo?commodityId=' + commodityId  + '&token=' + wx.getStorageSync('token') ,
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function (res) {
        if (res.data.code == 0) {
         
          if (res.data.data.cover != '' && res.data.data.cover != null && res.data.data.cover != undefined &&res.data.data.cover.slice(0, 1) != 'h') {
            res.data.data.cover = app.globalData.url + res.data.data.cover
          }
          res.data.data.percent = parseInt((res.data.data.soldCount / (res.data.data.soldCount + res.data.data.stock))*100)
          var imgalist = [], imgalistIf=''
          var introPics = res.data.data.introPics
          if (introPics == '' || introPics == null || introPics==undefined){
            imgalist = []
            imgalistIf=2
          }else{
            imgalist = introPics.split(',')
            imgalistIf = 1
          }
          for (var i = 0; i < imgalist.length;i++){
            if (imgalist[i].slice(0, 1) != 'h' && imgalist[i].slice(0, 1) != '.') {
              imgalist[i] = app.globalData.url + imgalist[i]
            }
          }
          var contentBtId = ''
          if (res.data.data.contentBtId == '' || res.data.data.contentBtId == null || res.data.data.contentBtId == undefined) {
            contentBtId = ''
          } else {
            wx.request({
              url: app.globalData.url + '/bigtxt/' + res.data.data.contentBtId + '/' + res.data.data.contentBtId,
              method: 'post',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              success: function (res) {
                var article = res.data
                WxParse.wxParse('article', 'html', article, that, 5);
              }
            })
          }

          that.setData({
            detail: res.data.data,
            imgalist: imgalist,
            imgalistIf: imgalistIf
          })
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
      path: 'pages/index/index?shareUserId=' + app.globalData.userId + '&id=' + this.data.id + '&pageId=3', //这里在首页的地址后面添加我们需要传值的标识位pageId以及值123(pageId 这个名字你们可以自己随便乱取 如同一个变量名)
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})