// pages/yuyuesetting/yuyuesetting.js
import { YuYueSetting } from '../yuyuesetting/yuyuesetting_model.js';
var yuYueSetting = new YuYueSetting();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked:false
  },
  onLoad: function (options) {
   var that=this;
   yuYueSetting.status((res)=>{
     var checked = res.ison == 1 ? true : false
     that.setData({
       checked: checked
     })   
    })
  },
  switchChange(){
    yuYueSetting.switchFunc((res)=>{
      this.setData({
        checked: !this.data.checked
      })
    })
  }
})