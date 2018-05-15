import { Zhuye } from '../zhuye/zhuye_model.js';
var zhuYe = new Zhuye();
var pageSize = 4;
var app = getApp();  
Page({
  data: {
    page: 1,
    hiddenLoading: false,
    zpCount: 0,
    redu:0,
    yorderCount: 0,
    authorModel: {
      avatarUrl: "../../images/login.png",
      ison:1
    }
  },

  onLoad: function (options) {//主页页面变成了只能通过导航进入
    var that = this;
    var authorID=options.uid;
      this.setData({
        authorID:authorID 
      })
      zhuYe.info((res)=>{//判断当前用户是不是该页面的作者
        if(authorID==res.uid){
          app.globalData.isAuthor = true;
        }
      }) 
      zhuYe.zhuYeInitial(authorID,(res)=>{
        that.setData({
          authorModel:res.authorModel,
          zpCount:res.zpCount, 
          followStatus:res.followStatus
        })
      });
      that.zhuYeData(authorID);
  },
  
  onShow:function(){
    var authorID=this.data.uid;
    if(authorID){
     zhuYe.redu(authorID,(res)=>{
       console.log(res);
       this.setData({
       redu:res.redu
      })
     });
    }
  },

  zhuYeData:function(uid){
    zhuYe.zhuYeAlbum(uid, pageSize, this.data.page, (res) => {
      console.log(res);
      this.setData({
        albumModels: res.albumModels,
        page: this.data.page + 1,
        hasMore: res.hasMore,
      })
    })
  },

  onShareAppMessage: function () {//设置分享页面的信息
    var userName = this.data.authorModel.nickName
    var uid = this.data.uid;
    return {
      title: userName + '的作品集',
      path: 'pages/zhuye/zhuye?uid=' + uid
    }
  },

  albumDetail: function (e) {//点击进入作品详情页
    var id = e.currentTarget.dataset.id;
    var userName = this.data.authorModel.nickName;
    wx.navigateTo({
      url: '../zydetail/zydetail?albumID=' + id + '&userName=' + userName+'&authorID='+this.data.uid,
    })
  },

  //这个方法只有是用户不具备unionID，的时候才会调用
  login:function(event){
    console.log("login");
    this.wxGetUserInfo(event,(res)=>{
      // console.log(res);
    });
  },

  yuyue: function (event) {
    this.wxGetUserInfo(event, (res) => {
      wx.navigateTo({
        url: '../yuyue/yuyue?sellerID=' + this.data.uid + '&nickName=' + res,
      })
    });
  },

  
  follow:function(event){
    var that = this;
    if (app.globalData.isAuthor){
      var followStatus = !that.data.followStatus; 
      that.setData({
        followStatus:followStatus
      })
    }else{
    var authorID=this.data.authorID;
    this.wxGetUserInfo(event,(res)=> {
      zhuYe.followChange(authorID,(res)=>{
        var followStatus=!that.data.followStatus;
        var authorModel = that.data.authorModel;
        authorModel.fans=followStatus?authorModel.fans+1:authorModel.fans-1;
        that.setData({
          authorModel:authorModel,
          followStatus:followStatus
        })
      });
     }) 
    }
  }, 

  onReachBottom() {
    if (this.data.hasMore == true) {
      this.setData({
        hiddenLoading: false
      })
      zhuYe.zhuYe(this.data.uid, pageSize, this.data.page, (res) => {
        var resAlbumModels = res.albumModels;
        var albumModels = this.data.albumModels;
        resAlbumModels.forEach(function (albumModel) {
          albumModels.push(albumModel);
        })
        this.setData({
          albumModels: albumModels,
          page: this.data.page + 1,
          hasMore: res.hasMore,
          hiddenLoading: true
        })
      })
    }
  },

  erWeiCode:function() {//点击二维码小图标
    wx.navigateTo({
      url: '../ercode/ercode?uid=' + this.data.uid
    })
  },
  
  wxGetUserInfo:function(event,callBack){
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
      if (!app.globalData.loginStatus){
      zhuYe.encrypt(event.detail.encryptedData, event.detail.iv,
        (res) => {
          console.log(app.globalData.loginStatus + '' + app.globalData.isAuthor )
          var uid = res.user.id;
          if (app.globalData.isAuthor ) {
            that.setData({
              page: 1,
            })
            that.zhuYeData(uid);
          }
          if (res.code == 201) {
            wx.setStorageSync('token', res.token);
            wx.setStorageSync('loginStatus', res.loginStatus);
            app.globalData.loginStatus = wx.getStorageSync('loginStatus');
          }
          callBack && callBack();
        },
        (res) => {
          console.log(res);
        }
       )
      }
      else{
        callBack && callBack(event.detail.userInfo.nickName);
      }
    }
  }
})