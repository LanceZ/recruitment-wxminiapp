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

        that.setData({
          recruitInfoList: res.data.recruitInfoList.content
        });
      }
    });
  },
  onTapRecruitInfoDetail: function (e) {
    wx.navigateTo({
      url: '../recruitinfo/detail?id=' + e.currentTarget.dataset.id
    });
  }
});