//app.js
App({
  globalData: {
    resCode: {
      success: 0,
      checkUserFail: 12
    },
    apiDomain: "http://127.0.0.1:8080",
    userInfo: null
  },
  onShow: function () {
    var that = this;
    wx.checkSession({
      success: function () {
        wx.request({
          url: that.globalData.apiDomain + '/api/user',
          header: {
            'content-type': 'application/json',
            'cookie': "JSESSIONID=" + wx.getStorageSync('sessionid')
          },
          success: function (res) {
            console.log(res.data);

            if (res.data.resCode == that.globalData.resCode.checkUserFail) {
              that.login();
            }
          }
        });
      },
      fail: function () {
        that.login();
      }
    });
  },
  onLaunch: function () {
  },
  login: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        var that = this;
        if (res.code) {
          wx.request({
            url: that.globalData.apiDomain + '/api/login',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);
              wx.setStorageSync("sessionid", res.data);
            }
          });
        }
      }
    });
  }
})