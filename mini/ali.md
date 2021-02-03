### 支付宝小程序

##### 小程序顶层 app.js
```javascript
App({
  onLaunch(options) {
    // 第一次打开
  },
  onShow(options) {
    // 小程序启动，或从后台被重新打开
  },
  onHide() {
    // 小程序前台进入后台
  },
  onError(msg) {
    // 小程序脚本发生错误或api调用出现报错
  }
})
```

##### app.json 应用配置
  app.json 用于对小程序进行全局配置，设置页面文件的路径、窗口表现、多tab等
  1. pages (Array)
     第一项代表小程序首页
     页面路径不需要写任何后缀
  2. window (Object)
  3. tabBar (Object)
