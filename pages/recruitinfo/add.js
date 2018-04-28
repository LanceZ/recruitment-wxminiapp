const app = getApp()

Page({
  data: {
    title: "",
    remuneration: "",
    remunerationIndex: 0,
    remunerations: ["上不封顶", "最高5K", "最高10K", "最高15K", "最高20K", "最高30K", "最高50K"],
    companyName: "",
    region: [],
    requireSex: "",
    sexs: [
      { name: '无所谓', value: '无所谓', checked: 'true' },
      { name: '男', value: '男' },
      { name: '女', value: '女' },
    ],
    requireAge: "",
    requireAgesIndex: 0,
    requireAges: ["无所谓", "00后", "95后", "90后", "85后", "80后", "70后"],
    recruitNumber: "",
    jobDesc: "",
    userName: "",
    userMobile: "",
    userEmail: ""
  },
  onLoad: function () {
    console.log(app.globalData.userInfo);
    var that = this;
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
  onRemunerationChange: function (e) {
    this.setData({
      remuneration: this.data.remunerations[e.detail.value]
    });
  },
  onRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
  },
  onSexChange: function (e) {
    this.setData({
      requireSex: e.detail.value
    });
  },
  onAgeChange: function (e) {
    this.setData({
      requireAge: this.data.requireAges[e.detail.value]
    });
  },
  formSubmit: function (e) {
    var that = this;
    var form = e.detail.value;
    wx.request({
      url: app.globalData.apiDomain + '/api/recruitinfo',
      method: "POST",
      data: {
        title: form.title,
        remuneration: that.data.remunerations[form.remuneration],
        companyName: form.companyName,
        region: form.region[0] + "." + form.region[1] + "." + form.region[2],
        requireSex: form.requireSex,
        requireAge: that.data.requireAges[form.requireAge],
        jobDesc: form.jobDesc,
        recruitNumber: form.recruitNumber,
        userName: form.userName,
        userMobile: form.userMobile,
        userEmail: form.userEmail
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
          title: '发布成功',
          icon: 'success',
          duration: 2000
        });

        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
          relaod: true
        });
        wx.navigateBack();
      }
    });
  }
})