//myaccept.js
const app = getApp()

Page({
  data: {
    acceptInfoList: []
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiDomain + '/api/user/acceptinfo',
      header: {
        'content-type': 'application/json',
        'cookie': "JSESSIONID=" + wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data);

        if (res.data.resCode == "11") {
          app.login();
          return;
        }

        that.setData({
          acceptInfoList: res.data.acceptInfoList.content
        });
      }
    });
  },
  onTapAcceptInfoDetail: function (e) {
    wx.navigateTo({
      url: '../acceptinfo/detail?id=' + e.currentTarget.dataset.id
    });
  }
});