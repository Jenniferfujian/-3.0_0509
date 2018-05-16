import { Base } from '../../utils/base.js'

class YuYueSetting extends Base {
  constructor() {
    super();
  }
  
  status(callBack){
    var params = {
      url: 'user/yuyue_status',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  switchFunc(callBack){
      var params = {
        url: 'user/yuyue_switch',
        sCallBack: function (res) {
          callBack && callBack(res);
        },
        method:"POST"
      };
      this.request(params);
  }
}
export { YuYueSetting }