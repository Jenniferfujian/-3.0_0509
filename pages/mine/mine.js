// pages/my/my.js
import { Mine } from '../mine/mine_model.js';
var mine = new Mine();
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    amount: 0,
    isOn: true,
    userInfo: {//默认的灰色头像，没有昵称，没有简介
      nickName: '',
      title: '',
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var loginStatus = app.globalData.loginStatus
    //var loginStatus=false;
    this.setData({
      loginStatus: loginStatus
    })
    if(loginStatus){
      mine.info((res) => {
        this.showAfterLogin(res);
      });
    }
  },
 
  showAfterLogin:function(res){
    this.setData({
      userInfo: res.userModel,
      hiddenLoading: true
    });
  },

  login:function(e){
   var that=this;
   that.wxGetUserInfo(e,(res)=>{
     console.log(res);
     that.showAfterLogin(res);
   })
  },
  zhuYe: function () {
    var uid = this.data.userInfo.id;
    wx.navigateTo({
      url: "../zhuye/zhuye?uid=" + uid,
    })
  },
  edit: function () {
    var userInfo = this.data.userInfo
    wx.redirectTo({
      url: '../infoedit/infoedit?nickName=' + userInfo.nickName + '&title=' +     userInfo.title + '&uid=' + userInfo.id,
    })
  },
  erCode: function () {
    var uid = this.data.userInfo.id;
    wx.navigateTo({
      url: '../ercode/ercode?uid=' + uid,
    })
  },
  yveWo: function () {
    wx.navigateTo({
      url: '../yvewo/yvewo',
    })
  },
  yuyuesetting: function () {
    wx.navigateTo({
      url: '../yuyuesetting/yuyuesetting',
    })
  },
  wxGetUserInfo: function (event, callBack) {
    if (!event.detail.userInfo) {
      wx.showModal({
        title: '提示',
        content: '取消授权，部分功能无法正常使用，是否重新授权',
        cancelText: "否",
        confirmText: "是",
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
            })
          }
        }
      })
    } else {
      var that = this;
      if (!app.globalData.loginStatus) {
        mine.encrypt(event.detail.encryptedData, event.detail.iv,
          (res) => {
            wx.setStorageSync('token', res.token);
            wx.setStorageSync('loginStatus', res.loginStatus);
            app.globalData.loginStatus = wx.getStorageSync('loginStatus');
            that.setData({
              loginStatus: app.globalData.loginStatus
            })
            callBack && callBack(res);
          },
        )
      }
      else {
        callBack && callBack(event.detail.userInfo.nickName);
      }
    }
  }
})
