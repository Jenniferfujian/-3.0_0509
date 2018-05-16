// pages/zanwo.js
import { Home } from '../home/home_model.js';
var app = getApp();
var home = new Home();
var pageSize = 4;//下拉刷新，每页返回的个数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    hiddenLoading: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    home.list(pageSize, this.data.page, (res) => {
      console.log(res);
      this.setData({
        albumModels: res.albumModels,
        hasMore: res.hasMore,
        page: this.data.page + 1,
        hiddenLoading: true
      })
    });
  },
  
  onShow(){
    home.FollowListLimit((res) => {
      this.setData({
        followModels: res.followModel
      })
    })
  },

  albumDetail: function (e) {
    var albumID = e.currentTarget.dataset.id;
    var userName = e.currentTarget.dataset.nickname;
    var authorID = e.currentTarget.dataset.authorid;
    wx.navigateTo({
      url: '../zydetail/zydetail?albumID=' + albumID + "&userName=" + userName+'&authorID='+authorID,
    })
  },
  
  zhuYe:function(e){
    var authorID = e.currentTarget.dataset.authorid;
    wx.navigateTo({
      url: '../zhuye/zhuye?uid=' +authorID ,
    })
  },
  
  myFollow:function(e){
   wx.navigateTo({
     url: '../myfollow/myfollow',
   })
  },

  onReachBottom: function () {
    this.setData({
      hiddenLoading: false
    });
    home.list(pageSize, this.data.page, (res) => {
      var resAlbumModels = res.albumModels;
      var albumModels = this.data.albumModels;
      resAlbumModels.forEach(function (albumModel) {
        albumModels.push(albumModel);
      })
      this.setData({
        hasMore: res.hasMore,
        albumModels: albumModels,
        page: this.data.page + 1,
        hiddenLoading: true
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: "微作，让作品为自己代言",
      path: 'pages/home/home'
    }
  }
})
