//app.js
App({
  onLaunch: function (options) {
    //options.scene 可以识别用户是通过什么方式进入的小程序
    console.log("app.js ---onLaunch---" + JSON.stringify(options));
  },
  onShow:function(){
    console.log("app.js ---onShow---");
  },
  onHide:function(){
    console.log("app.js ---onHide---");
  },
  onError: function (msg){
    console.log("app.js ---onError---" + msg);
  }
  
})