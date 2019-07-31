<template>
  <div class="content-body">
    <a-form :form="form" @submit="handleSubmit">
      <a-divider orientation="left">
        <h4>基本信息</h4>
      </a-divider>
      <a-row type="flex" justify="start">
        <a-col :span="3">
          <a-form-item label="昵称" v-bind="labelItemLayout"></a-form-item>
        </a-col>
        <a-col :span="9">
          <a-form-item v-decorator="['nickname']" v-bind="formItemLayout">
            <label v-decorator="['nickname']">{{this.form.getFieldValue('nickname')}}</label>
          </a-form-item>
        </a-col>
        <a-col :span="0">
          <a-form-item>
            <a-input v-decorator="['id']"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start">
        <a-col :span="3">
          <a-form-item label="性别" v-bind="labelItemLayout"></a-form-item>
        </a-col>
        <a-col :span="9">
          <a-form-item v-bind="formItemLayout">
            <a-radio-group v-decorator="['sex']">
              <a-radio :value="1">男</a-radio>
              <a-radio :value="0">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start" :gutter="1">
        <a-col :span="3">
          <a-form-item label="出生日期" v-bind="labelItemLayout"></a-form-item>
        </a-col>
        <a-col :span="9">
          <a-form-item v-bind="formItemLayout">
            <a-date-picker v-decorator="['birthday']" style="width: 100%" placeholder="请选择日期" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-divider orientation="left">
        <h4>联系信息</h4>
      </a-divider>
      <a-row type="flex" justify="start" :gutter="1">
        <a-col :span="3">
          <a-form-item label="电话" v-bind="labelItemLayout"></a-form-item>
        </a-col>
        <a-col :span="9">
          <a-form-item v-bind="formItemLayout">
            <a-input v-decorator="['phone']" placeholder="请输入电话"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start">
        <a-col :span="3">
          <a-form-item label="邮箱" v-bind="labelItemLayout"></a-form-item>
        </a-col>
        <a-col :span="9">
          <a-form-item v-bind="formItemLayout">
            <a-input v-decorator="['email']" placeholder="请输入邮箱"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="start" :gutter="2">
        <a-col :span="3">
          <a-form-item label="地址" v-bind="labelItemLayout"></a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item v-bind="formItemLayout">
            <a-cascader
              v-decorator="['province']"
              :fieldNames="{ label: 'cname', value: 'id', children: 'items' }"
              :options="province"
              @change="provinceChange"
              placeholder="--省--"
              ref="province"
            ></a-cascader>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item v-bind="formItemLayout">
            <a-cascader
              v-decorator="['region']"
              :fieldNames="{ label: 'cname', value: 'id', children: 'items' }"
              :options="region"
              @change="regionChange"
              placeholder="--市--"
              ref="region"
            ></a-cascader>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item v-bind="formItemLayout">
            <a-cascader
              v-decorator="['city']"
              :fieldNames="{ label: 'cname', value: 'id', children: 'items' }"
              :options="city"
              @change="cityChange"
              placeholder="--县--"
              ref="city"
            ></a-cascader>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start">
        <a-col :span="3"></a-col>
        <a-col :span="3">
          <a-form-item v-bind="formItemLayout">
            <a-button type="primary" htmlType="submit" class="button-primary">保存</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'userinfo',
  data() {
    console.log(1)
    return {
      formItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          }        }
      }, labelItemLayout: {
        labelCol: {
          xs: {
            span: 24,
            offset: 0,
          }        }
      },
      province: [],
      region: [],
      city: [],
      aa: false
    }
  },
  beforeCreate() { // 单页vue开发使用beforeCreate,初始化form
    const _this = this
    _this.form = _this.$form.createForm(_this, {
      onFieldsChange: (_, changedFields) => { // 添加字段改变事件
        _this.$emit('change', changedFields)
      },
      mapPropsToFields: () => {
        return {
          // phone: this.$form.createFormField({
          //   value: this.phone
          // })
        }
      },
      onValuesChange: (_, values) => {
        // console.log(values)
      }
    })
  },
  mounted() {
    const _this = this
    // 初始化省市区级联下拉数据，方案，先初始化省份，通过选择省份数据再次加载子集数据
    const id = JSON.parse(this.$store.getters.userinfo).id

    let p1 =
      _this.axios( // 获取用户数据
        {
          url: '/users/' + id,
          method: 'get'        })
        .then(function (response) {
          let { id, nickname, sex, phone, email, birthday, province, region, city } = response.data
          birthday = moment(birthday, 'YYYY-MM-DD')
          _this.form.setFieldsValue({ id, nickname, sex, phone, email, birthday })
          return { province, region, city }
        }).catch(function (error) {
          return error
        })

    let p2 = Promise.race([p1]).then((result) => {
      // console.log('省', result)
      _this.axios.get( // 获取用户数据
        '/syscity', {
          params: { pid: 0, limit: 100, offset: 0 }
        })
        .then(function (response) {
          console.log('省')
          console.log(response.data)
          _this.province = response.data.rows
          _this.$refs.province.setValue([result.province])
        }).catch(function (error) {
          console.log(error)
        })
      return result
    }).catch((error) => {
      console.log(error)  // 打开的是 'failed'
    })
    let p3 = Promise.race([p2]).then((result) => {
      // console.log('市', result)
      _this.axios.get( // 获取用户数据
        '/syscity', {
          params: { pid: result.province, limit: 100, offset: 0 }
        })
        .then(function (response) {
          _this.region = response.data.rows
          _this.$refs.region.setValue([result.region])
        }).catch(function (error) {
          console.log(error)
        })
      return result
    }).catch((error) => {
      console.log(error)  // 打开的是 'failed'
    })
    Promise.race([p3]).then((result) => {
      // console.log('县', result)
      _this.axios.get( // 获取用户数据
        '/syscity', {
          params: { pid: result.region, limit: 100, offset: 0 }
        })
        .then(function (response) {
          _this.city = response.data.rows
          _this.$refs.city.setValue([result.city])
        }).catch(function (error) {
          console.log(error)
        })
    }).catch((error) => {
      console.log(error)  // 打开的是 'failed'
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => { // 校验
        if (!err) { // 成功
          // 提交保存
          // 服务器校验是否重复
          this.confirmRegister(values)
        }
      })
    },
    moment,
    provinceChange(value) {

      const _this = this
      // console.log(value[0])
      //清空市，区value
      _this.$refs.region.setValue([undefined])
      _this.$refs.city.setValue([undefined])

      _this.axios.get( // 获取用户数据
        '/syscity', {
          params: { pid: value[0], limit: 100, offset: 0 }
        })
        .then(function (response) {
          // console.log('省')
          // console.log(response.data)
          _this.region = response.data.rows
          // _this.$refs.region.setValue([response.data.rows[0].id])
        }).catch(function (error) {
          console.log(error)
        })
    },
    regionChange(value) {

      this.$refs.city.setValue([undefined])
      this.axios.get( // 获取用户数据
        '/syscity', {
          params: { pid: value[0], limit: 100, offset: 0 }
        })
        .then((response) => {
          this.city = response.data.rows
          // _this.$refs.city.setValue([response.data.rows[0].id])
        }).catch(function (error) {
          console.log(error)
        })
    },
    cityChange(value) {
    },
    confirmRegister(values) {
      this.axios.patch(
        '/users/' + values.id, { // 性别，出生日期，电话，邮箱，地址【省市县】
          sex: values.sex,
          birthday: values.birthday.format('YYYY-MM-DD'),
          phone: values.phone,
          email: values.email,
          province: values.province[0],
          region: values.region[0],
          city: values.city[0]
        }
      ).then((response) => {
        console.log(response)// 登录成功，跳转到欢迎页面
        this.$Modal.success({
          title: '信息提示',
          content: '成功'
        })
      })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
//body-box
.content-body {
  height: 100%;
}

//login-panel-button-primary
.button-primary {
  font-size: @basefont-size-14;
  font-family: @basefont-family;
  width: 100%;
  // height: 42px;
  background-color: @basecolor-blue-01;
  border: none;
}

#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}

.ant-cascader-menu-item {
  float: left;
}

.ant-advanced-search-form {
  // padding: 24px;
  // background: #fbfbfb;
  // border: 1px solid #d9d9d9;
  // border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  // display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  // flex: 1;
}
</style>
