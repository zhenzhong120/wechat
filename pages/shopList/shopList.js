// pages/shopList/shopList.js
Page({
  /** 页面的初始数据*/
  data: {
    shopList: [],
    pageIndex: 0, //封装的请求数据函数中设置的pageIndex ++，第一次加载就要自增1
    pageSize: 20,
    catId: 1,
    hasMore: true //2.1 设定变量，是否还有更多的数据
  },
  // 3、封装加载数据的函数
  loadMore: function () {
    if (!this.data.hasMore) { //2.2 如果没有更多的数据直接返回
         wx.showToast({
        title: '没有更多数据啦',
        icon: 'success',
        duration: 4000
      })
      return;
    }
    wx.showNavigationBarLoading({
      success: (res) => {},
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://locally.uieee.com/categories/' + this.data.catId + '/shops',
      data: {
        _limit: this.data.pageSize,
        _page: ++this.data.pageIndex
      },
      success: (res) => {
        //6、请求过来的数据把本来的替换掉了 =》解决办法：获取原本数据，通过concat进行拼接
        let newList = this.data.shopList.concat(res.data);
        //2.3 获取数据的总数
        // var count = parseInt(res.header["x-total-count"]);
        var count = (res.header["x-total-count"] - 0);
        //2.4 比较滚动的数据是否和请求的数据总条数相等
        var flag = this.data.pageIndex * this.data.pageSize < count;
        this.setData({
          shopList: newList,
          hasMore: flag
        })
        wx.hideNavigationBarLoading({
          success: (res) => {},
        })
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })

  },
  /** 生命周期函数--监听页面加载 */
  onLoad: function (options) {

    // 1、根据首页传递过来的参数，设置导航条标题
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      })
    }

    //2、把获取的参数设置到data中，方便复用
    this.setData({
      catId: options.cat
    })
    this.loadMore(); //4、调用加载数据的函数
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
   //下拉刷新页面
   //请求数据的函数
   this.setData({
     pageIndex:0,
     hasMore:true,
     shopList:[]
   })
   this.loadMore();
   wx.stopPullDownRefresh(); //加载完之后停止下拉刷新动画，否则在手机端会一直存在
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      //5、触底再调用加载数据的函数
      this.loadMore();

    }


    ,

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})