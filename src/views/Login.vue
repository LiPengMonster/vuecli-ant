<template>
  <div class="content-body">
    <a-form :form="form" @submit="handleSubmit">
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
            <a-form-item>
              <a-input
                auto-focus="auto-focus"
                placeholder="邮箱/会员名/8位ID"
                autocapitalize="on"
                class="login-panel-user"
                v-decorator="[
                      'username',
                      {
                        rules:[{required: true,message: '请输入用户名'}]
                      }
                      ]"
              ></a-input>
            </a-form-item>
            <!-- 3 -->
            <a-form-item>
              <a-input
                placeholder="请输入邮箱密码"
                type="password"
                class="login-panel-password"
                v-decorator="[
                      'userpass',
                      {
                        rules:[{required: true,message: '请输入密码'}]
                      }
                      ]"
              ></a-input>
            </a-form-item>
            <!-- 4 -->

            <a-button type="primary" html-type="submit" class="login-panel-button-primary">登录</a-button>
            <!-- 5 -->
            <div class="login-panel-links">
              <router-link
                :to="{
                        name: 'registerOk'
                  }"
              >忘记密码</router-link>
              <router-link :to="{
                        name: 'test'
                  }">忘记会员名</router-link>
              <router-link :to="{
                        name: 'register'
                  }">免费注册</router-link>
            </div>
            <!-- 6 -->
            <div class="login-panel-third">
              <div class="login-panel-third-01">其他方式登录：</div>
              <img src="../assets/images/wechat.png" class="login-panel-third-wechat" />
              <img src="../assets/images/qq.png" class="login-panel-third-qq" />
            </div>
          </div>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: this.form
    }
  },
  computed: {
    key() {
      return this.$route.path + Math.random()
    }
  },
  beforeCreate() { // 单页vue开发使用beforeCreate,初始化form
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => { // 添加字段改变事件
        this.$emit('change', changedFields)
      }
    })
  },
  mounted() {
    this.username = this.$route.params.username
  },
  methods: {
    handleSubmit(e) { // 登录提交
      e.preventDefault()
      this.form.validateFields((err, values) => { // 校验
        if (!err) { // 成功
          this.confirmLogin(values)
        }
      })
    },
    confirmLogin(values) { // 登录
      this.axios({
        url: '/login',
        method: 'post',
        data: {
          username: values.username,
          userpass: values.userpass,
          identity_type: 'account'
        },
        transformRequest: [function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            // 如果要发送中文 编码
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(
        (response) => {
          const token = response.data.token
          const { id, nickname, avatar } = response.data.data.user
          const { menu } = response.data.data
          // 获取成功跳转主页面
          this.$store.dispatch('commitaddtoken', token)
          this.$store.dispatch('commitaddmenu', menu)
          this.$store.dispatch('commitadduserinfo', { id, nickname, avatar }).then(() => {
            this.$router.push({ name: 'about' })// 跳转到欢迎页面
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
    },
    handleCancel(e) {
      console.log(e)
      this.visible = false
    }
  }
}
</script>

<style  lang="less" scoped>
@import "../less/login.less";
</style>
