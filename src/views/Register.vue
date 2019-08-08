<template>
  <div class="content-body">
    <a-form :form="form" @submit="handleSubmit">
      <div class="body-box">
        <div class="body-module">
          <div class="login-panel">
            <!-- 1 -->
            <a-form-item>
              <div class="login-panel-title" autofocus>欢迎注册MONSTER</div>
            </a-form-item>
            <!-- 2 -->

            <div class="validate-register">
              <a-form-item has-feedback>
                <a-tooltip placement="rightTop" :trigger="['focus']">
                  <template slot="title">
                    <div class="tooltip-register">
                      <li>&middot;5-25个字符，【数字、字母、中文】</li>
                      <li>&middot;请勿包含身份证/银行卡等隐私信息</li>
                    </div>
                  </template>

                  <a-input
                    placeholder="设置会员名"
                    autocapitalize="on"
                    class="login-panel-user"
                    v-decorator="[
                      'username',
                      {
                        rules:[{validator:checkUsername}]
                      }
                      ]"
                  ></a-input>
                </a-tooltip>
              </a-form-item>
            </div>
            <!-- 3 -->
            <div class="validate-register">
              <a-form-item has-feedback>
                <a-tooltip placement="rightTop" :trigger="['focus']">
                  <template slot="title">
                    <div class="tooltip-register">
                      <li>&middot;6-20个字符，密码不能和会员名相同</li>
                      <li>&middot;只能包含字母、数字以及标点符号（除空格）</li>
                      <li>&middot;字母、数字和标点符号至少包含两种</li>
                    </div>
                  </template>
                  <a-input
                    placeholder="设置登录密码"
                    type="password"
                    class="login-panel-password"
                    v-decorator="[
                      'userpass',
                      {
                        rules:[{required: true,pattern: regular.userpass,message: regular.userpassMsg},{validator: validateToNextPassword}]
                      }
                      ]"
                  ></a-input>
                </a-tooltip>
              </a-form-item>
            </div>
            <!-- 3 -->
            <div class="validate-register">
              <a-form-item has-feedback>
                <a-tooltip placement="rightTop" :trigger="['focus']">
                  <template slot="title">
                    <div class="tooltip-register">
                      <li>&middot;请再次输入你的密码</li>
                    </div>
                  </template>
                  <a-input
                    placeholder="再次输入密码"
                    type="password"
                    class="login-panel-password"
                    v-decorator="[
                      'confirmpass',
                      {
                        rules:[{required: true,message:'两次密码输入不一致'},{validator:compareToFirstPassword}]
                      }
                      ]"
                  ></a-input>
                </a-tooltip>
              </a-form-item>
            </div>
            <!-- 4 -->
            <a-button type="primary" html-type="submit" class="login-panel-button-primary">注册</a-button>
          </div>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script>
import { regular } from '../utils/validate.js'
export default {
  name: 'register',
  data() {
    return {
      regular: regular,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit(e) { // 注册提交
      e.preventDefault()
      this.form.validateFields((err, values) => { // 校验
        !err && this.confirmRegister(values)  // 成功
      })
    },
    compareToFirstPassword(rule, value, callback) { // 确认密码校验
      value && value !== this.form.getFieldValue('userpass') && callback(new Error('两次密码输入不一致'))
      callback()
    },
    validateToNextPassword(rule, value, callback) { // 密码修改后校验确认密码
      value && this.form.validateFields(['confirmpass'], { force: true })
      callback()
    },
    checkUsername(rules, value, callback) {

      !value && callback(new Error(this.regular.usernameMsg))
      const reg = new RegExp(this.regular.username)
      !reg.test(value) && callback(new Error(this.regular.usernameMsg))
      callback()
    },
    confirmRegister(values) {
      const router = this.$router
      const form = this.form
      this.axios(
        {
          url: 'register',
          method: 'post',
          data: {
            username: values.username,
            password: values.userpass,
            identitytype: 'account'
          }
        })
        .then(result => {
          router.push({ name: 'registerOk', params: { username: values.username } })
        })
        .catch(error => {
          form.validateFields(['username'], { force: true }, (errors, values) => { // 校验用户名
            form.setFields({
              username: {
                value: values.username,
                errors: [new Error(error.data.message)]
              }
            })
          })

        })
    }
  }
}
</script>

  <style  lang = "less" scoped>
@import "../less/register.less";
</style>
