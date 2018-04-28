//myinfo.js
const app = getApp()

Page({
  data: {
    user: {}
  },
  onLoad: function () {
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
  },
  formSubmit: function (e) {
    var that = this;
    var form = e.detail.value;
    wx.request({
      url: app.globalData.apiDomain + '/api/user',
      method: "PUT",
      data: {
        userName: form.userName,
        userMobile: form.userMobile,
        userEmail: form.userEmail,
        userDesc: form.userDesc
      },
      header: {
        'content-type': 'application/json',
        'cookie': "JSESSIONID=" + wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data);

        if (res.data.resCode != app.globalData.resCode.success) {
          throw new Error(res.data.resCode);
        }

        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 5000
        });

        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 2000)
      }
    });
  }
});