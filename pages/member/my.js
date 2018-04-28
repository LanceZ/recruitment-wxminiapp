//my.js
const app = getApp()

Page({
  data: {
    user: {}
  },
  onLoad: function () {
  },
  onShow: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiDomain + '/api/user',
      header: {
        'content-type': 'application/json',
        'cookie': "JSESSIONID=" + wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data);

        that.setData({
          user: res.data.user
        });
      }
    });
  }
})