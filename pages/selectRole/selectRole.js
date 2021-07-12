// pages/selectRole/selectRole.js
var  app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg1:'url(https://yichacha.njshangka.com/resource/1@2x.png)',
    bg2:'url(https://yichacha.njshangka.com/resource/2@2x.png)',
    bg3: 'url(https://yichacha.njshangka.com/resource/3@2x.png)',
    bg4: 'url(https://yichacha.njshangka.com/resource/4@2x.png)',
    cols1: 'rgb(115,87,76)',
    cols2: 'rgb(115,87,76)',
    cols3: 'rgb(115,87,76)',
    cols4: 'rgb(115,87,76)',
    role:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  choose1(e){
    this.setData({
      bg1:  'rgb(2,175,101)',
      bg2: 'url(https://yichacha.njshangka.com/resource/2@2x.png)',
      bg3: 'url(https://yichacha.njshangka.com/resource/3@2x.png)',
      bg4: 'url(https://yichacha.njshangka.com/resource/4@2x.png)',
      cols1: 'rgb(255,255,255)',
      cols2: 'rgb(115,87,76)',
      cols3: 'rgb(115,87,76)',
      cols4: 'rgb(115,87,76)',
      role:1
    })
  },
  choose2(e) {
    this.setData({
      bg1: 'url(https://yichacha.njshangka.com/resource/1@2x.png)',
      bg2: 'rgb(2,175,101)',
      bg3: 'url(https://yichacha.njshangka.com/resource/3@2x.png)',
      bg4: 'url(https://yichacha.njshangka.com/resource/4@2x.png)',
      cols1: 'rgb(115,87,76)',
      cols2: 'rgb(255,255,255)',
      cols3: 'rgb(115,87,76)',
      cols4: 'rgb(115,87,76)',
      role: 2
    })
  },
  choose3(e) {
    this.setData({
      bg1: 'url(https://yichacha.njshangka.com/resource/1@2x.png)',
      bg2: 'url(https://yichacha.njshangka.com/resource/2@2x.png)',
      bg3: 'rgb(2,175,101)',
      bg4: 'url(https://yichacha.njshangka.com/resource/4@2x.png)',
      cols1: 'rgb(115,87,76)',
      cols2: 'rgb(115,87,76)',
      cols3: 'rgb(255,255,255)',
      cols4: 'rgb(115,87,76)',
      role: 3
    })
  },
  choose4(e) {
    this.setData({
      bg1: 'url(https://yichacha.njshangka.com/resource/1@2x.png)',
      bg2: 'url(https://yichacha.njshangka.com/resource/2@2x.png)',
      bg3: 'url(https://yichacha.njshangka.com/resource/3@2x.png)',
      bg4: 'rgb(2,175,101)',
      cols1: 'rgb(115,87,76)',
      cols2: 'rgb(115,87,76)',
      cols3: 'rgb(115,87,76)',
      cols4: 'rgb(255,255,255)',
      role: 4
    })
  },
  joinIn(e){
    console.log(getCurrentPages().length)
    let that=this
    wx.request({
      url: app.globalData.url + '/client/setidentity',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        identity: that.data.role,
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
         
          wx.showToast({
            title: '身份绑定成功',
          })
          setTimeout(function(){
            // wx.navigateBack({
            //   delta: 2
            // })
            if (getCurrentPages().length > 2) {
              //获取页面栈
              let pages = getCurrentPages()
              //给上一个页面设置状态
              let curPage = pages[pages.length - 2];
              let data = curPage.data;
              curPage.setData({ 'isBack': true });
              wx.navigateBack({
                
              })
            }
          },500)
        } else {
          wx.showToast({
            title: res.data.codeMsg
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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