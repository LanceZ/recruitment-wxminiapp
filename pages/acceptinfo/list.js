//myaccept.js
const app = getApp()

Page({
  data: {
    by: '',
    recruitInfoId: '',
    recruitInfo: {},
    acceptInfoList: []
  },
  onLoad: function (options) {
    var that = this;

    that.setData({
      by: options.by,
      recruitInfoId: options.recruitInfoId
    });

    var url = '';
    if (that.data.by == 'user') {
      url = app.globalData.apiDomain + '/api/user/acceptinfo';
    }
    else if (that.data.by == 'recruitInfoId') {
      url = app.globalData.apiDomain + '/api/acceptinfo?recruitInfoId=' + that.data.recruitInfoId;
    }

    wx.request({
      url: url,
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

        var acceptInfoList = res.data.acceptInfoList.content;
        var recruitInfo = {};
        if (acceptInfoList.length > 0) {
          recruitInfo = acceptInfoList[0].recruitInfo;
        }

        that.setData({
          acceptInfoList: res.data.acceptInfoList.content,
          recruitInfo: recruitInfo
        });
      }
    });
  }
});