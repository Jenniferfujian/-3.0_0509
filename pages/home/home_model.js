import {Base} from '../../utils/base.js'

class Home extends Base{
  constructor(){
    super();
  }

  list(pageSize,page,callBack) {
    var params = {
      url: 'home/list?pageSize='+pageSize+'&page='+page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

  FollowListLimit(callBack) {
    var params = {
      url: 'follow/list_limit',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }


}

export{Home}