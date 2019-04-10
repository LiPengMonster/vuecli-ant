<template>
  <div>
    <a-layout>
      <a-layout-header>
        <a class="logo"></a>
        <a class="logo-name">MONSTER</a>
        <span class="head-title">
          <span>联系我们</span>
          <span>关于我们</span>
          <span>案例</span>
          <span>首页</span>
        </span>
      </a-layout-header>

      <a-layout-content>
        <div class="body-box">
          <div class="body-title">
            <h1>无&nbsp;&nbsp;&nbsp;&nbsp;题</h1>
            <p>伤情最是晚凉天，憔悴斯人不堪怜。</p>
            <p>邀酒摧肠三杯醉，寻香惊梦五更寒。</p>
            <p>钗头凤斜卿有泪，荼蘼花了我无缘。</p>
            <p>小楼寂寞新雨月，也难如钩也难圆。</p>
          </div>
          <div class="body-module">
            <div class="login-panel">
              <!-- 1 -->
              <div class="login-panel-title">
                <div class="login-panel-title-01">密码登录</div>
                <div>
                  <div class="login-panel-title-02">扫码登录</div>
                  <em class="login-panel-title-03"></em>
                  <i class="login-panel-title-04"></i>
                  <i class="login-panel-title-05"></i>
                </div>
              </div>
              <!-- 2 -->
              <a-input
                autofocus="autofocus"
                placeholder="邮箱/会员名/8位ID"
                autocapitalize="on"
                class="login-panel-user"
              ></a-input>
              <!-- 3 -->
              <a-input placeholder="请输入邮箱密码" type="password" class="login-panel-password"></a-input>
              <!-- 4 -->
              <a-button type="primary" class="login-panel-button-primary">登录</a-button>
              <!-- 5 -->
              <div class="login-panel-links">
                <a href="#">忘记密码</a>
                <a href="#">忘记会员名</a>
                <a href="#">免费注册</a>
              </div>
              <!-- 6 -->
              <div class="login-panel-third">
                <div class="login-panel-third-01">其他方式登录：</div>
                <img src="../assets/images/wechat.png" class="login-panel-third-wechat">
                <img src="../assets/images/qq.png" class="login-panel-third-qq">
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>

      <a-layout-footer>
        <div class="footer-content">
          <div id="title">MONSTER DESIGN</div>
          <hr>
          <div class="footer-content-02">
            <span>首页</span>
            <span>案例</span>
            <span>关于我们</span>
            <span>联系我们</span>
            <span>© 2009-2019 Monster.com</span>
            <span>&nbsp;</span>
          </div>
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

<style  lang="less" scoped>
@import "../less/base.less";
@import "../less/login.less";
</style>
