import { Base } from '../../utils/base.js'

class Zhuye extends Base {
  constructor() {
    super();
  }
  
  info(callBack) {//返回当前用户信息，判断是否是该页面的作者
    var params = {
      url: 'user/info',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }


  followChange(authorID,callBack){
    var params = {
      url: 'follow/change',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      method: 'POST',
      data: {
        authorID: authorID
      }
    };
    this.request(params);
  }

  zhuYeInitial(authorID,callBack){
    var params = {
      url: 'user/zhuye_initial?authorID='+authorID,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  zhuYeAlbum(authorID,pageSize,page,callBack) {
    var params = {
      url: 'user/zhuye_album?authorID='+authorID+'&pageSize='+pageSize+'&page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  encrypt(encryptedData, iv, callBack,fcallBack) {
    var params = {
      url: 'user/encrypt_user_info',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      fCallBack:function(res){//失败的回调函数
        fcallBack && fcallBack(res);
      },
      method: 'POST',
      data: {
        encryptedData: encryptedData,
        iv: iv
      }
    };
    this.request(params);
  }
}
export { Zhuye }