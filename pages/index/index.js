//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    reload: false,
    page: 0,
    pageSize: 5,
    hasNoData: false,
    loading: false,
    recruitCount: 0,
    acceptCount: 0,
    recruitInfoList: []
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.syncUserInfo(app.globalData.userInfo);
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.syncUserInfo(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.syncUserInfo(res.userInfo);
        }
      })
    }

    this.getRecruitInfoList(true);
  },
  syncUserInfo: function (userInfo) {
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true
    });

    wx.request({
      url: app.globalData.apiDomain + '/api/user',
      method: "PUT",
      data: {
        wxNickName: userInfo.nickName,
        wxGender: userInfo.gender,
        wxAvatarUrl: userInfo.avatarUrl,
        wxCountry: userInfo.country,
        wxProvince: userInfo.province,
        wxCity: userInfo.city
      },
      header: {
        'content-type': 'application/json',
        'cookie': "JSESSIONID=" + wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data);

        if (res.data.resCode == "11") {
          app.login();
        }
      }
    });
  },
  onShow: function () {
    if (this.data.relaod) {
      this.getRecruitInfoList(true);
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getRecruitInfoList(true);
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 2000);
  },
  onReachBottom: function () {
    var that = this;
    if (that.data.loading) {
      return;
    }
    if (that.data.hasNoData) {
      return;
    }
    that.setData({ loading: true });
    that.getRecruitInfoList(false);
    setTimeout(() => {
      that.setData({
        loading: false
      })
    }, 2000);
  },
  getRecruitInfoList: function (reload) {
    var that = this;
    if (reload) {
      this.setData({ page: 0, hasNoData: false, recruitInfoList: [] });
    }
    wx.request({
      url: app.globalData.apiDomain + '/api/recruitinfo',
      data: {
        page: that.data.page,
        pageSize: that.data.pageSize
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.resCode == "11") {
          app.login();
          return;
        }
        var list = that.data.recruitInfoList;
        list = list.concat(res.data.recruitInfoList.content);

        that.setData({
          hasNoData: res.data.recruitInfoList.last,
          page: that.data.page + 1,
          recruitCount: res.data.recruitInfoList.totalElements,
          acceptCount: res.data.acceptCount,
          recruitInfoList: list,
        });
      }
    });
  },
  onTapAddRecruitInfo: function () {
    wx.navigateTo({
      url: '../recruitinfo/add'
    });
  },
  onTapRecruitInfoDetail: function (e) {
    wx.navigateTo({
      url: '../recruitinfo/detail?id=' + e.currentTarget.dataset.id
    });
  }
})
