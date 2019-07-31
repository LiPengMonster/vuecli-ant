<template>
  <div class="content-body">
    <div class="body-box">
      <div class="body-module">
        <!-- 1 -->
        <img src="../assets/images/registerok.png" width="46px" height="46px">
        <div style="margin-left:20px;padding-top:10px;">
          <h3 class="login-panel-title" autofocus>
            恭喜您,您的账号:
            <span>{{username}}</span>
          </h3>
          <div class="login-panel-title" autofocus>注册成功,{{tsecond}}秒后将跳入登录界面</div>
        </div>
        <!-- 2 -->
      </div>
    </div>
  </div>
</template>

<script>
</script>

  <style  lang = "less" scoped>
@import "../less/registerok.less";
</style>
<script>
export default {
  name: 'retisterOk',
  data() {
    return {
      /*以下方法就是接收父页面传参
      获取id:this.$route.params.id
      获取title:this.$route.params.title,
      */
      username: '',
      tsecond: 3
    }
  },
  //这里面可以根据获取到的id进行获取相应数据
  mounted() {
    // console.log(this.$route.params)
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    _this.username = _this.$route.params.username
    _this.timer = setInterval(() => {
      _this.tsecond--;
      if (_this.tsecond === 0) {
        _this.$router.push({ path: "/login", params: { username: _this.username } })
      } // 修改数据date
    }, 1000)
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }

}
</script>
