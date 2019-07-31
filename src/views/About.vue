<template>
  <div class="content-body">
    <a-divider orientation="left">
      <h3>安全设置</h3>
    </a-divider>
    <div class="avatar-info">
      <div>
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          action="/uploadfile"
          :multiple="multiple"
          :withCredentials="withCredentials"
          :showUploadList="false"
          :beforeUpload="beforeUpload"
          @change="handleChange"
          :customRequest="customRequest"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="80px" height="80px" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </div>

      <ul>
        <li>登陆账号&nbsp;:&nbsp;lpmonster</li>
        <li>账号ID&nbsp;:&nbsp;13013260754</li>
        <li>注册时间&nbsp;:&nbsp;19/05/25 12:23:43</li>
      </ul>
    </div>
    <a-divider orientation="left"></a-divider>
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      itemLayout="horizontal"
      :dataSource="data"
    >
      <div
        v-if="showLoadingMore"
        slot="loadMore"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
      >
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="onLoadMore">loading more</a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions">edit</a>
        <a slot="actions">more</a>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <a slot="title" href="https://vue.ant.design/">{{item.name.last}}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
        <div>content</div>
      </a-list-item>
    </a-list>
    <a-divider orientation="left">Left Text</a-divider>

    <a-button type="primary" @click="submit">登录</a-button>
  </div>
</template>
<script>
import reqwest from 'reqwest'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo'
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      imageUrl: '/avatar/' + JSON.parse(this.$store.getters.userinfo).avatar,
      loadingMore: false,
      showLoadingMore: true,
      multiple: true,
      withCredentials: true,
      data: [],
      visible: false
      // headers: {
      //   'Authorization': this.$store.getters.token },
      // pdata: { id: this.$store.getters.userinfo.id }
    }
  },
  mounted() {
    this.getData((res) => {
      this.loading = false
      this.data = res.results
    })
  },
  methods: {
    submit() {
    },
    handleClick(e) {
      console.log('click ', e)
    },
    getData(callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
          callback(res)
        }
      })
    },
    onLoadMore() {
      this.loadingMore = true
      this.getData((res) => {
        this.data = this.data.concat(res.results)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.visible = false
    },
    callback(key) {
      console.log(key)
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        }
        )
        let { id, nickname, avatar } = info.file.response
        this.$store.dispatch('commitadduserinfo', { id, nickname, avatar })
      }
    },
    beforeUpload(file) {
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
    customRequest(info) {
      const formdata = new FormData()
      formdata.append('id', JSON.parse(this.$store.getters.userinfo).id)
      formdata.append('file', info.file)
      this.axios({
        url: '/uploadfile',
        method: 'post',
        data: formdata
      }).then((response) => {
        info.onSuccess(response.data)
      }).catch((error) => {
        info.onError(error)
      })
    }
  }
}
</script>
<style lang="less" scoped>
//body-box
.content-body {
  margin: 20px;
  padding: 20px 118px;
  width: 100%;
  height: 100%;
}

//body-box
.body-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 990px;
  height: 338px;
  margin: auto;
}
.demo-loadmore-list {
  min-height: 350px;
}
//
.avatar-info {
  display: flex;
  justify-content: flex-start;
  ul {
    margin-top: 0px;
    margin-left: 35px;
    font-family: @basefont-family;
    font-size: @basefont-size-13;
    li {
      margin-top: 8px;
    }
  }
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: green;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: green;
}
</style>
