//myrecruit.js
const app = getApp()

Page({
  data: {
    recruitInfoList: [] 
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.apiDomain + '/api/user/recruitinfo',
      header: {
        'content-type': 'application/json',
        'cookie': "JSESSIONID=" + wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data);

        if (res.data.resCode != "0") {
          wx.showToast({
            title: res.data.resMsg,
            icon: 'none',
            duration: 2000
          });
          return;
        }

        that.setData({
          recruitInfoList: res.data.recruitInfoList.content
        });
      }
    });
  }
});