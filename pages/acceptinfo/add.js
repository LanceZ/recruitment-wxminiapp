const app = getApp()

Page({
  data: {
    recruitInfoId: '',
    userName: '',
    userMobile: '',
    userEmail: '',
    userDesc: ''
  },
  onLoad: function (options) {
    var that = this;

    that.setData({
      recruitInfoId: options.recruitInfoId
    });

    wx.request({
      url: app.globalData.apiDomain + '/api/user',
      header: {
        'content-type': 'application/json',
        'cookie': "JSESSIONID=" + wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data);
        
        var user = res.data.user;
        that.setData({
          userName: user.userName,
          userMobile: user.userMobile,
          userEmail: user.userEmail
        });

        if (that.data.userName === "") {
          that.setData({ userName: app.globalData.userInfo.nickName });
        }
      }
    });
  },
  formSubmit: function (e) {
    var that = this;
    var form = e.detail.value;
    wx.request({
      url: app.globalData.apiDomain + '/api/acceptinfo',
      method: "POST",
      data: {
        recruitInfoId: that.data.recruitInfoId,
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
          title: '应聘成功',
          icon: 'success',
          duration: 2000
        })
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
          relaod: true
        })
        wx.navigateBack();
      }
    });
  }
});