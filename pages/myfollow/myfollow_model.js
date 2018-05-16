import { Base } from '../../utils/base.js'

class MyFollow extends Base {
  constructor() {
    super();
  }
  list(pageSize,page,callBack) {
    var params = {
      url: 'follow/list?pageSize=' + pageSize + '&page=' + page,
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }
}

export { MyFollow }