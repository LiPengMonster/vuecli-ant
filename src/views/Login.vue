<template>
  <div>
    <a-layout>
      <a-layout-header>
        <div class="head-show">
          <a class="head-show logo"></a>
          <a class="head-show logo-name">MONSTER</a>
          <a class="head-show head-login">联系我们</a>
          <a class="head-show head-login">关于我们</a>
          <a class="head-show head-login">案例</a>
          <a class="head-show head-login">首页</a>
        </div>
      </a-layout-header>

      <a-layout-content>
        <div class="login-body">
          <div class="login-body-box">
            <div class="login-body-content">
              <div class="login-body-title">
                <h1 class="h">无&nbsp;&nbsp;&nbsp;&nbsp;题</h1>
                <p>伤情最是晚凉天，憔悴斯人不堪怜。</p>
                <p>邀酒摧肠三杯醉，寻香惊梦五更寒。</p>
                <p>钗头凤斜卿有泪，荼蘼花了我无缘。</p>
                <p>小楼寂寞新雨月，也难如钩也难圆。</p>
              </div>
              <div class="login-body-module">
                <div class="login">
                  <!-- 1 -->
                  <div class="corner-icon-view">
                    <div class="master-login-title">密码登录</div>
                    <div class="poptip">
                      <div class="poptip-arrow">
                        <em class="em-arrow"></em>
                      </div>
                      <div class="poptip-content">扫码登录</div>
                    </div>
                    <i class="icon-qrcode"></i>
                    <i class="icon-qrcode-over"></i>
                  </div>
                  <!-- 2 -->
                  <div class="login-content nc-outer-box">
                    <div class="login-plain-wrap">
                      <!-- 2.1 -->
                      <a-input-group>
                        <a-input
                          autofocus="autofocus"
                          placeholder="邮箱/会员名/8位ID"
                          autocapitalize="on"
                          class="login-user"
                        ></a-input>
                        <!-- 2.2 -->
                        <a-input
                          placeholder="请输入邮箱密码"
                          type="password"
                          style="padding-left:10px; font-size:12px;width:100%;height:42px;margin-bottom:18px;"
                        ></a-input>
                        <a-button type="primary" class="login-button-primary">登录</a-button>
                        <!-- 2.3 -->
                        <div class="login-links">
                          <a href="#">忘记密码</a>
                          <a href="#">忘记会员名</a>
                          <a href="#">免费注册</a>
                        </div>
                      </a-input-group>
                    </div>
                  </div>
                  <!-- 3 -->
                  <div class="login-blocks sns-login-block">
                    <div class="sns-login">
                      <div class="sns-login-title">其他方式登录：</div>
                      <div class="sns-login-third">
                        <img src="../assets/images/wechat.png" class="sns-login-third-wechat">
                        <img src="../assets/images/qq.png" class="sns-login-third-qq">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>

      <a-layout-footer>
        <div class="footer-content b-font b-dis footer-content-font">
          <span class="footer-content-span">MONSTER DESIGN</span>
          <hr style="width:500px;margin-bottom:20px;border-color:#919294;">
          <span class="footer-content-span">首页1</span>
          <span class="footer-content-span">案例</span>
          <span class="footer-content-span">关于我们</span>
          <span class="footer-content-span">联系我们</span>
          <span style="boder:1px solid red;">© 2009-2019 Monster.com</span>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>

export default {
  name: 'Login'
}
</script>

<style scoped lang="less">
.b-font {
  font: 400 12px arial;
  color: white;
}
.b-dis {
  display: block;
  width: 100%;
  height: 100%;
}
.b-float-left {
  float: left;
}
.b-float-right {
  float: right;
}

a {
  color: #9b9ea0;
  text-decoration: none;
  margin-left: 10px;
  display: inline-block;
  font: 400 12px arial;
}
.ant-layout {
  position: fixed;
  flex: auto;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.ant-layout-header {
  background-color: #202325;
  height: 64px;
  border-bottom: 1px solid #919294;
}
.ant-layout-content {
  background-color: #202325;
}
.ant-layout-footer {
  background-color: #424650;
  height: 30%;
}
.head-show {
  display: block;
  border: 0px solid red;
  color: white;
  font: 14px arial;
  padding-top: 11px;
}
.head-login {
  float: right;
  margin-left: 30px;
}
.logo {
  background-image: url("../assets/images/monster.png");
  display: block;
  border: 0px solid red;
  width: 32px;
  height: 32px;
  position: relative;
  top: 5px;
  float: left;
}
.logo-name {
  display: block;
  border: 0px solid red;
  position: relative;
  font-size: 18px;
  float: left;
}

.login-body {
  padding: 74px 0 118px;
  // background-image: url("../assets/images/background-img.png");
  // background-repeat: no-repeat;
  // background-attachment: fixed;
  // background-size: cover;
}
.login-body-box {
  width: 990px;
  margin: auto;
  position: relative;
  height: 388px;
  border: 0px solid red;
}
.login-body-content {
  border: 0px solid green;
  display: block;
  height: 388px;
}
.login-body-title {
  display: block;
  float: left;
  width: 400px;
  height: 100%;
  padding-top: 20px;
  color: #cccccc;
}
p {
  margin-top: 40px;
  font-size: 19px;
  display: block;
}
.login-body-title .h {
  color: #cccccc;
  padding-left: 100px;
}

.login-body-module {
  width: 380px;
  height: 364px;
  border: 0px solid silver;
  background-color: white;
  position: absolute;
  padding-top: 22px;
  margin-top: 22px;
  right: 0px;
}
.corner-icon-view {
  position: relative;
  height: 44px;
  width: 100%;
  display: block;
  border: 0px solid yellowgreen;
  margin: 0 auto;
}
.master-login-title {
  font-size: 18px;
  font-weight: 400;
}
.poptip {
  background-color: #e6f9fc;
  border: 1px solid #00c1de;
  line-height: 16px;
  z-index: 9999;
  padding: 5px 10px;
  position: absolute;
  top: 0;
  right: 45px;
  display: block;
}
.poptip-arrow {
  position: absolute;
  z-index: 10;
  *zoom: 1;
  top: 8px;
  right: 0;
}
.em-arrow {
  position: absolute;
  top: 0;
  left: -0.22em;
  width: 9px;
  height: 9px;
  border: 1px solid #00c1de;
  border-bottom: 0px;
  border-right: 0px;
  overflow: hidden;
  transform: rotate(133deg);
  background-color: #e6f9fc;
  display: block;
}
.iconfont {
  display: block;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 40px;
  color: #ff9000;
  border: 3px solid red;
  width: 40px;
  height: 40px;
}
.icon-qrcode {
  background-image: url("../assets/images/qkcode.png");
  display: block;
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0;
  top: 0;
}
.icon-qrcode-over {
  display: block;
  width: 40px;
  height: 40px;
  position: relative;
  float: right;
  right: 11px;
  top: -17px;
  background-color: white;
  transform: rotate(45deg);
}

.poptip-content {
  color: #00c1de;
  font-size: 12px;
  font-weight: 400;
}
.login {
  width: 330px;
  min-height: 321px;
  margin: 0 auto;
  background-color: white;
}
.login-bocks {
  margin: 8 0;
  text-align: right;
  zoom: 1;
}

.login-plain-wrap {
  display: block;
  padding-top: 10px;
  font-size: 14px;
  box-sizing: border-box;
}
.login-user {
  padding-left: 10px;
  font-size: 12px;
  width: 100%;
  height: 42px;
  margin-bottom: 18px;
}

.login-links {
  margin: 8px 0 0 0;
  text-align: right;
}

.sns-login-block {
  margin: 8px 0;
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  display: block;
}
.sns-login {
  margin: 10px 0;
  float: left;
  width: 100%;
}
.login-button-primary {
  font: 14px system-ui;
  font-family: PingFang SC, Helvetica, Arial, Verdana, Microsoft YaHei, serif !important;
  width: 100%;
  height: 42px;
  background-color: #00c1de;
  border: none;
}
.sns-login-title {
  color: #373d41;
  font-size: 12px;
  font-family: PingFang SC, Helvetica, Arial, Verdana, Microsoft YaHei, serif !important;
  float: left;
  margin-top: 2px;
}
.sns-login-other {
  float: left;
}
.sns-login-third {
  float: left;
}

.sns-login-third-wechat {
  margin-left: 10px;
  float: left;
  width: 22px;
  height: 22px;
}
.sns-login-third-qq {
  width: 22px;
  height: 22px;
  float: left;
  margin-left: 10px;
}
.footer-content {
  border: 0px solid green;
  text-align: center;
  margin-top: 40px;
}
.footer-content-font {
  font-size: 15px;
  font-family: "微软雅黑";
  color: #cccccc;
}
.footer-content-span {
  margin-right: 30px;
  cursor: pointer;
}
body {
  font: 400 33px arial;
  font-family: PingFang SC, Helvetica, Arial, Verdana, Microsoft YaHei, serif !important;
}
</style>
