import { Base } from '../../utils/base.js'

class Mine extends Base {
  constructor() {
    super();
  }
  info(callBack) {
    var params = {
      url: 'user/info',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
   
  yuyueSwitch(isOn,callBack) {
    var params = {
      url: 'user/yuyue_switch?isOn='+isOn,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  encrypt(encryptedData, iv, callBack, fcallBack) {
    var params = {
      url: 'user/encrypt_user_info',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
      fCallBack: function (res) {//失败的回调函数
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

export { Mine }