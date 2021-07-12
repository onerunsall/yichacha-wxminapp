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
    list1: [],
    list3:[],
    keyword: '',
    learnMore: '上拉加载更多',
    showDel: 0,
    navbar: ['全部', '产品', '厂商'],
    currentTab: 0,
    productIs: 0,
    marginTop: 30,
    qx:1,
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      productIs: e.currentTarget.dataset.idx,
      qx:1,
    })
    console.log(e.currentTarget.dataset.idx)
    if (e.currentTarget.dataset.idx == 0) {
      console.log(this.data.keyword)
      if (this.data.list3 == '' || this.data.list3 == null || this.data.list3 == undefined){
        if (this.data.keyword == '' || this.data.keyword == null || this.data.keyword==undefined){

        }else{
          this.lastPageAll(this.data.keyword, 1, 15)
        }        
      }     
    } else if (e.currentTarget.dataset.idx == 1) {
      console.log(2)
      if (this.data.list == '' || this.data.list == null || this.data.list == undefined) {
        if (this.data.keyword == '' || this.data.keyword == null || this.data.keyword == undefined) {} else {
          this.lastPage(this.data.keyword, 1, 15)
        }
      } else {
        this.setData({
          learnMore: '没有更多了'
        })
      }
    } else {
      console.log(3)
      if (this.data.list1 == '' || this.data.list1 == null || this.data.list1 == undefined) {
        if (this.data.keyword == '' || this.data.keyword == null || this.data.keyword == undefined) {} else {
          this.lastPageCs(this.data.keyword, 1, 15)
        }
      }else{
        this.setData({
          learnMore:'没有更多了'
        })
      }
    }
  },
  delThis(e) {
    this.setData({
      list: [],
      list1: [],
      inputVal: '',
      searchVal: 1,
      showDel: 0,
    })
  },
  refuse(e) {
    // this.setData({
    //   list: [],
    //   inputVal: '',
    //   searchVal: 1,
    // })
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
      qx: 1,
      list: [],
      list1: [],
      list3: [],
      keyword: keyword,
      learnMore: '加载中',
      marginTop: '30'
      // inputkeyword: e.detail.value
    })
    if (this.data.currentTab == 1) {
      if (keyword == '' || keyword == null || keyword == undefined) {} else {
        this.lastPage(keyword, 1, 15)
      }

    } else if (this.data.currentTab == 2){
      if (keyword == '' || keyword == null || keyword == undefined) {} else {
        this.lastPageCs(keyword, 1, 15)
      }
    }else{
      if (keyword == '' || keyword == null || keyword == undefined) { } else {
        this.lastPageAll(keyword, 1, 15)
      }
    }

  },
  inputUser: function(e) {
    var keyword = e.detail.value
    this.setData({
      // list: [],
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
    for (var i = 0; i < that.data.searchlist.length; i++) {
      if (keyword == that.data.searchlist[i].word) {
        that.data.searchlist[i].bgColor = 'rgb(255, 149, 27);'
        that.data.searchlist[i].color = 'rgb(255, 255, 255);'
      }
    }
    that.setData({
      searchlist: that.data.searchlist,
      showDel: 1,
      currentTab: 0,
      productIs: 0,
    })

    setTimeout(function() {
      for (var i = 0; i < that.data.searchlist.length; i++) {
        if (keyword == that.data.searchlist[i].word) {
          that.data.searchlist[i].bgColor = 'rgb(245, 245, 245);'
          that.data.searchlist[i].color = 'rgb(51, 51, 51);'
        }
      }
      that.setData({
        list: [],
        list1: [],
        list3: [],
        searchVal: 2,
        inputVal: keyword,
        keyword: keyword,
        learnMore: '加载中',
        marginTop: 30,
        searchlist: that.data.searchlist
      })
      if (that.data.currentTab == 0) {
        that.lastPageAll(e.currentTarget.dataset.kw, 1, 15)
      } else if (that.data.currentTab == 1) {
        that.lastPage(e.currentTarget.dataset.kw, 1, 15)
      } else {
        that.lastPageCs(e.currentTarget.dataset.kw, 1, 15)
      }
    }, 100)
  },
  searchIcon: function(e) {
    var that = this
    var keyword = that.data.keyword;
    that.setData({
      keyword: keyword,
      list: [],
      list1: [],
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
      url: app.globalData.url + '/client/searchkeys',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'post',
      data: {
        source: 2
      },
      success: function(res) {
        wx.hideToast()
        if (res.data.code == 0) {

          for (var i = 0; i < res.data.data.items.length; i++) {
            res.data.data.items[i].paixuid = (i + 1)
            res.data.data.items[i].bgColor = 'rgb(245, 245, 245)'
            res.data.data.items[i].color = 'rgb(51, 51, 51)'
          }

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
  hrefUrl(e) {
    let that = this
    // that.setData({
    //   learnMore: '上拉加载更多'
    // });
    var url = e.currentTarget.dataset.url
    if (e.currentTarget.dataset.uis == 1) {
      for (var i = 0; i < that.data.list.length; i++) {
        if (e.currentTarget.dataset.pid == that.data.list[i].guochanyiliaoqixieId){
          console.log(e.currentTarget.dataset.pid)
          that.data.list[i].colorRead = '0.4'
        }
      }
      that.setData({
        list: that.data.list
      })
    } else if (e.currentTarget.dataset.uis == 2){
      for (var i = 0; i < that.data.list1.length; i++) {
        if (e.currentTarget.dataset.pid == that.data.list1[i].coId){
          that.data.list1[i].colorRead = '0.4'
        }
          
      }
      that.setData({
        list1: that.data.list1
      })
    }else{
      for (var i = 0; i < that.data.list3.length; i++) {
        console.log(e.currentTarget.dataset.pid, that.data.list3[i].coId)
        if (e.currentTarget.dataset.pid == that.data.list3[i].coId || e.currentTarget.dataset.pid == that.data.list3[i].guochanyiliaoqixieId) {
          console.log(that.data.list3[i].colorRead)
          that.data.list3[i].colorRead = '0.4'
        }

      }
      that.setData({
        list3: that.data.list3
      })
    }


    if (app.globalData.loginIs == 0) {
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
        url: url
      })
    }
  },
  lastPage: function(keyword, pageNo, pageSize) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/client/guochanyiliaoqixies?kw=' + keyword + '&pn=' + pageNo + '&ps=' + pageSize,
      method: 'post',
      // data: {
      //   kw: keyword,
      //   pn: pageNo,
      //   ps: pageSize
      // },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function(res) {
        if (res.data.code == 0) {
          pageNo++
          var pic1, pic2, pic3;
          if (res.data.data.items.length < 15) {
            if (pageNo == 2 && res.data.data.items.length == 0) {
              that.setData({
                learnMore: '当前没有数据',
                marginTop: 350,
                learnMore1: '当前没有数据',
              });
            } else {
              if (res.data.data.sum.totalItemCount == 0) {
                that.setData({
                  learnMore: '当前没有数据',
                  marginTop: 350,
                  learnMore1: '当前没有数据',
                });
              } else {
                that.setData({
                  learnMore: '没有更多了',
                  marginTop: 30,
                  learnMore1: 2,
                });
              }
            }



            // }
          } else {
            that.setData({
              learnMore: '上拉加载更多',
              marginTop: 30,
              learnMore1: 2,
            });
          }
          for (var i = 0; i < res.data.data.items.length; i++) {
            var data = res.data.data.items
            if (res.data.data.items[i].chanpinmingcheng.indexOf(keyword) > -1) {
              data[i].chanpinmingcheng = that.hilight_word(keyword, data[i].chanpinmingcheng);
              data[i].nameIf = 1
            } else {
              data[i].chanpinmingcheng = data[i].chanpinmingcheng;
              data[i].nameIf = 0
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
              pic1 = app.globalData.url + '/resource/Group_12.png';
              pic2 = '';
              pic3 = '';
            }
            res.data.data.items[i].pic1 = pic1
            res.data.data.items[i].pic2 = pic2
            res.data.data.items[i].pic3 = pic3
          }


          var list = that.data.list;
          var newlist = list.concat(res.data.data.items)
          // if (res.data.data.items.length == 0) {        
          //   // wx.showToast({
          //   //   title: '数据已全部加载',
          //   //   // icon: 'loading',
          //   //   // duration: 1500
          //   // })
          // } else {
          that.setData({
            list: newlist,
            pageNo: pageNo
          });



          var list = that.data.list
          that.setData({
            list: list,
            pageNo: pageNo
          })
          // }
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
      url: app.globalData.url + '/client/cos',
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
            if (pageNo == 2 && res.data.data.items.length == 0) {
              that.setData({
                learnMore: '当前没有数据',
                marginTop: 350,
                learnMore2: '当前没有数据',
              });
            } else {
              if (res.data.data.sum.totalItemCount == 0) {
                that.setData({
                  learnMore: '当前没有数据',
                  marginTop: 350,
                  learnMore2: '当前没有数据',
                });
              } else {
                that.setData({
                  learnMore: '没有更多了',
                  marginTop: 30,
                  learnMore2: 2,
                });
              }

            }
          } else {
            that.setData({
              learnMore: '上拉加载更多',
              marginTop: 30,
              learnMore2: 2,
            });
          }
          for (var i = 0; i < res.data.data.items.length; i++) {
            var data = res.data.data.items

            if (res.data.data.items[i].name.indexOf(keyword) > -1) {
              data[i].name = that.hilight_word(keyword, data[i].name);
              data[i].nameIf = 1
            } else {
              data[i].name = data[i].name;
              data[i].nameIf = 0
            }
          }

          var list1 = that.data.list1;
          var newlist1 = list1.concat(res.data.data.items)
         
          that.setData({
            list1: newlist1,
            pageNo: pageNo
          });



          var list1 = that.data.list1
          that.setData({
            list1: list1,
            pageNo: pageNo
          })
          // }
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },

  lastPageAll: function (keyword, pageNo, pageSize) {
    var totalItemCount=0;
    var pageNosQx=0;

      var that = this;
      if(that.data.qx==1){
        wx.request({
          url: app.globalData.url + '/client/guochanyiliaoqixies?kw=' + keyword + '&pn=' + pageNo + '&ps=' + pageSize,
          method: 'post',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          success: function (res) {
            if (res.data.code == 0) {
              totalItemCount = res.data.data.sum.totalItemCount;
              pageNosQx = Math.ceil(totalItemCount / pageSize)
              pageNo++
              var pic1, pic2, pic3;
              if (res.data.data.items.length < 15) {
                wx.request({
                  url: app.globalData.url + '/client/cos',
                  method: 'post',
                  data: {
                    kw: keyword,
                    pn: 1,
                    ps: pageSize
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  success: function (res) {
                    if (res.data.code == 0) {
                      pageNo=2
                      console.log(pageNo)
                      if (res.data.data.items.length < 15) {
                        if (pageNo == 2 && res.data.data.items.length == 0) {
                          that.setData({
                            learnMore: '当前没有数据',
                            marginTop: 350,
                            learnMore3: '当前没有数据',
                          });
                        } else {
                          if (res.data.data.sum.totalItemCount == 0) {
                            that.setData({
                              learnMore: '当前没有数据',
                              marginTop: 350,
                              learnMore3: '当前没有数据',
                            });
                          } else {
                            that.setData({
                              learnMore: '没有更多了',
                              marginTop: 30,
                              learnMore3: 2,
                            });
                          }

                        }
                      } else {
                        that.setData({
                          learnMore: '上拉加载更多',
                          marginTop: 30,
                          learnMore3: 2,
                        });
                      }
                      for (var i = 0; i < res.data.data.items.length; i++) {
                        var data = res.data.data.items

                        if (res.data.data.items[i].name.indexOf(keyword) > -1) {
                          data[i].name = that.hilight_word(keyword, data[i].name);
                          data[i].nameIf = 1
                        } else {
                          data[i].name = data[i].name;
                          data[i].nameIf = 0
                        }
                      }
                      var list3 = that.data.list3;
                      var newlist = list3.concat(res.data.data.items)
                      that.setData({
                        list3: newlist,
                        pageNo: pageNo
                      });
                      var list3 = that.data.list3
                      
                      that.setData({
                        list3: list3,
                        pageNo: pageNo
                      })
                      console.log(that.data.list3)
                      return
                    } else if (res.data.code == 20 || res.data.code == 26) {
                      wx.hideToast()
                      wx.navigateTo({
                        url: '../login/login',
                      })
                    }
                  }
                })
                if (pageNo == 2 && res.data.data.items.length == 0) {
                  console.log(that.data.list3)
                  that.setData({
                    learnMore: '当前没有数据',
                    marginTop: 350,
                    learnMore3: '当前没有数据',
                    qx:2,
                  });
                } else {
                  if (res.data.data.sum.totalItemCount == 0) {
                    that.setData({
                      learnMore: '当前没有数据',
                      marginTop: 350,
                      learnMore3: '当前没有数据',
                      qx: 2,
                    });
                  } else {
                    that.setData({
                      learnMore: '没有更多了',
                      marginTop: 30,
                      learnMore3: 2,
                      qx: 2,
                    });
                  }
                }
              } else {
                that.setData({
                  learnMore: '上拉加载更多',
                  marginTop: 30,
                  learnMore3: 2,
                });
              }
              for (var i = 0; i < res.data.data.items.length; i++) {
                var data = res.data.data.items
                if (res.data.data.items[i].chanpinmingcheng.indexOf(keyword) > -1) {
                  data[i].chanpinmingcheng = that.hilight_word(keyword, data[i].chanpinmingcheng);
                  data[i].nameIf = 1
                } else {
                  data[i].chanpinmingcheng = data[i].chanpinmingcheng;
                  data[i].nameIf = 0
                } 
              }
              var list3 = that.data.list3;
              var newlist = list3.concat(res.data.data.items)
              that.setData({
                list3: newlist,
                pageNo: pageNo
              });
              var list3 = that.data.list3
              that.setData({
                list3: list3,
                pageNo: pageNo
              })
            } else if (res.data.code == 20 || res.data.code == 26) {
              wx.hideToast()
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        })
      }else{
        wx.request({
          url: app.globalData.url + '/client/cos',
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
              pageNo++
              console.log(pageNo)
              if (res.data.data.items.length < 15) {
                if (pageNo == 2 && res.data.data.items.length == 0) {
                  that.setData({
                    learnMore: '当前没有数据',
                    marginTop: 350,
                    learnMore3: '当前没有数据',
                  });
                } else {
                  if (res.data.data.sum.totalItemCount == 0) {
                    that.setData({
                      learnMore: '当前没有数据',
                      marginTop: 350,
                      learnMore3: '当前没有数据',
                    });
                  } else {
                    that.setData({
                      learnMore: '没有更多了',
                      marginTop: 30,
                      learnMore3: 2,
                    });
                  }

                }
              } else {
                that.setData({
                  learnMore: '上拉加载更多',
                  marginTop: 30,
                  learnMore3: 2,
                });
              }
              for (var i = 0; i < res.data.data.items.length; i++) {
                var data = res.data.data.items

                if (res.data.data.items[i].name.indexOf(keyword) > -1) {
                  data[i].name = that.hilight_word(keyword, data[i].name);
                  data[i].nameIf = 1
                } else {
                  data[i].name = data[i].name;
                  data[i].nameIf = 0
                }
              }
              var list3 = that.data.list3;
              var newlist = list3.concat(res.data.data.items)
              that.setData({
                list3: newlist,
                pageNo: pageNo
              });
              var list3 = that.data.list3
              that.setData({
                list3: list3,
                pageNo: pageNo
              })
            } else if (res.data.code == 20 || res.data.code == 26) {
              wx.hideToast()
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        })
      }
     
 
  },
  lastPageAllNext(pageNo){

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
    that.setData({
      learnMore: '加载中',
      marginTop: 30,
    });
    var keyword = that.data.keyword;

    if (that.data.currentTab == 1) {
      that.setData({
        list: [],
      })
      if (that.data.keyword == '' || that.data.keyword == null || that.data.keyword == undefined) {

      } else {
        that.lastPage(keyword, pageNo, 15)
      }


    } else if (that.data.currentTab == 2){
      that.setData({
        list1: []
      })
      if (that.data.keyword == '' || that.data.keyword == null || that.data.keyword == undefined) {

      } else {
        that.lastPageCs(keyword, pageNo, 15)
      }
    }else{
      that.setData({
        list3: []
      })
      if (that.data.keyword == '' || that.data.keyword == null || that.data.keyword == undefined) {

      } else {
        that.lastPageAll(keyword, pageNo, 15)
      }
    }

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    that.setData({
      learnMore: '加载中',
      marginTop: 30,
    });
    var pageNo = that.data.pageNo;
    var keyword = that.data.keyword;
    if (that.data.currentTab == 1) {
      if (keyword == '' || keyword == null || keyword == undefined) {

      } else {
        that.lastPage(keyword, pageNo, 15)
      }

    } else if(that.data.currentTab == 2) {
      if (keyword == '' || keyword == null || keyword == undefined) {

      } else {
        that.lastPageCs(keyword, pageNo, 15)
      }
    }else{
      if (keyword == '' || keyword == null || keyword == undefined) {

      } else {
        that.lastPageAll(keyword, pageNo, 15)
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '医查查在线',
      desc: '推荐你一款专业的医疗器械和厂商查询工具,各大医院厂商都在用',
      path: 'pages/index/index?shareUserId=' + app.globalData.userId
    }
  }
})