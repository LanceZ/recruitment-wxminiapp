const app = getApp()

Page({
  data: {
    id: "",
    title: "",
    remuneration: "",
    companyName: "",
    region: "",
    requireSex: "",
    requireAge: "",
    recruitNumber: "",
    jobDesc: "",
    userId: "",
    userName: "",
    userMobile: "",
    userEmail: "",
    user: {}
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    });

    wx.request({
      url: app.globalData.apiDomain + '/api/recruitinfo/' + that.data.id,
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
        
        var recruitInfo = res.data.recruitInfo;
        that.setData({
          title: recruitInfo.title,
          remuneration: recruitInfo.remuneration,
          companyName: recruitInfo.companyName,
          region: recruitInfo.region,
          requireSex: recruitInfo.requireSex,
          requireAge: recruitInfo.requireAge,
          recruitNumber: recruitInfo.recruitNumber,
          jobDesc: recruitInfo.jobDesc,
          userId: recruitInfo.userId,
          userName: recruitInfo.userName,
          userMobile: recruitInfo.userMobile,
          userEmail: recruitInfo.userEmail,
          user: res.data.user
        });
      }
    });
  },
  onTapAddRecruitInfo: function () {
    wx.navigateTo({
      url: '../recruitinfo/add'
    });
  },
  onTapAddAcceptInfo: function() {
    var that = this;
    wx.navigateTo({
      url: '../acceptinfo/add?recruitInfoId=' + that.data.id
    });
  },
  onTapListAcceptInfo: function () {
    var that = this;
    wx.navigateTo({
      url: '../acceptinfo/list?by=recruitInfoId&recruitInfoId=' + that.data.id
    });
  },
})