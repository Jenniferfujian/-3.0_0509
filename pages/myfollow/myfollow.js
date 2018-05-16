// pages/myfollow/myfollow.js
import { MyFollow } from '../myfollow/myfollow_model.js';
var myFollow = new MyFollow();
var pageSize = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasFollow:true,
    page: 1
  },

  zhuYe: function (e) {
    var authorID = e.currentTarget.dataset.authorid;
    wx.navigateTo({
      url: '../zhuye/zhuye?uid=' + authorID,
    })
  },

  onLoad: function (options) {
    myFollow.list(pageSize, this.data.page, (res) => {
      var length = res.followModels.length;
      if (length == 0) {
        this.setData({
          hasFollow:false
        })
      }
      this.setData({
        followModels: res.followModels,
        times: res.followModels.length,
        page: this.data.page + 1
      })
    });
  },

  onReachBottom: function () {
    myFollow.list(pageSize, this.data.page, (res) => {
      var resfollowModels = res.followModels;
      var followModels = this.data.followModels;
      resfollowModels.forEach(function (resOrder) {
        followModels.push(resOrder);
      })
      this.setData({
        followModels: followModels,
        times: res.followModels.length,
        page: this.data.page + 1
      })
    });
  }


})