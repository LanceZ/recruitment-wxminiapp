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

        if (res.data.resCode != "0") {
          wx.showToast({
            title: res.data.resMsg,
            icon: 'none',
            duration: 2000
          });
          return;
        }

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

        if (res.data.resCode != "0") {
          wx.showToast({
            title: res.data.resMsg,
            icon: 'none',
            duration: 2000
          });
          return;
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