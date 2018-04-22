//my.js
const app = getApp()

Page({
  data: {
    user: {}
  },
  onLoad: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiDomain + '/api/user',
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
          user: res.data.user
        });
      }
    });
  }
})