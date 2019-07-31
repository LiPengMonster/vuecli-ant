<template>
  <div>
    <a-upload
      name="avatar"
      listType="picture-card"
      class="avatar-uploader"
      :showUploadList="false"
      :beforeUpload="beforeUpload"
      :customRequest="handleSubmit"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="avatar"
        width="80px"
        height="80px"
        name="imgload"
        ref="imgload"
      >
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'"/>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>
<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'home',
  data () {
    return {
      loading: false,
      imageUrl: '',
      filename: '',
      form: this.form
    }
  },
  beforeCreate () { // 单页vue开发使用beforeCreate,初始化form
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => { // 添加字段改变事件
        this.$emit('change', changedFields)
      },
      onValuesChange: (_, values) => {
        console.log(values)

        // Synchronize to vuex store in real time
        // this.$store.commit('update', values)
      }
    })
  },
  methods: {
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
    handleSubmit (info) { // 注册提交
      getBase64(info.file, (imgsrc) => {
        this.imageUrl = imgsrc
        this.loading = false
        this.axios(
          { url: '/updateAvatar',
            method: 'post',
            data: { filebase64: imgsrc, filename: info.file.name },
            transformRequest: [function (data) {
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
          .then(function (res) {
            console.log(res)
            this.imageSave = res.data.image
          }.bind(this))

          .catch(function (error) {
            console.log(error)
          })
      })
    }
  }
}
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
