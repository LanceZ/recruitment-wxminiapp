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
    this.getUser();
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
  },
  getUser: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  }
})