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
      form: this.form
    }
  },
  beforeCreate() { // 单页vue开发使用beforeCreate,初始化form
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => { // 添加字段改变事件
        this.$emit('change', changedFields)
      },
      mapPropsToFields: () => {
        return {

          username: this.$form.createFormField({
            value: this.username
          })
        }
      },
      onValuesChange: (_, values) => {
        console.log(values)
        // Synchronize to vuex store in real time
        // this.$store.commit('update', values)
      }
    })
  },
  methods: {
    handleSubmit(e) { // 注册提交
      e.preventDefault()
      this.form.validateFields((err, values) => { // 校验
        if (!err) { // 成功
          // 提交保存
          // 服务器校验是否重复
          this.confirmRegister(values)
        }
      })
    },
    compareToFirstPassword(rule, value, callback) { // 确认密码校验
      const form = this.form
      if (value && value !== form.getFieldValue('userpass')) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) { // 密码修改后校验确认密码
      const form = this.form
      if (value) {
        form.validateFields(['confirmpass'], { force: true })
      }
      callback()
    },
    checkaccount() {
      const username = this.form.getFieldValue('username')
      const form = this.form
      const usererror = form.fieldsStore.fields.username.errors

      if (!username | username === '') {
        console.log('')
      } else {
        if (!usererror) {
          // 校验是否重复
          this.axios(
            {
              url: 'checkregister',
              method: 'post',
              data: {
                username: username,
                identitytype: 'account'
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
            })
            .then(function (response) {
              // 数据库存在重复用户名，校验
              form.validateFields(['username'], { force: true })
            })
            .catch(function (error) {
              console.log(error)
              // 不处理
            })
        }
      }
    },
    checkUsername(rules, value, callback) {
      if (!value | value === '') { callback(new Error(this.regular.usernameMsg)) } else {
        const reg = new RegExp(this.regular.username)
        if (!reg.test(value)) {
          console.log(this.form)
          callback(new Error(this.regular.usernameMsg))
        } else {
          console.log(rules)
          callback()
        }
      }
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
        })
        .then(function (response) {
          console.log(response)// 登录成功，跳转到欢迎页面
          router.push({ name: 'registerOk', params: { username: values.username } })
        })
        .catch(function (error) {
          console.log(error)
          if (error.code === 466) { // 466用户名注册重复
            // 校验用户名
            form.validateFields(['username'], { force: true }, (errors, values) => {
              form.setFields({
                username: {
                  value: values.username,
                  errors: [new Error(error.msg)]
                }
              })
            })
          }
        })
    }
  }
}
</script>

  <style  lang = "less" scoped>
@import "../less/register.less";
</style>
