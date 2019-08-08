<template>
  <div style="z-index:9999;">
    <a-layout-header>
      <img
        src="~@/assets/images/nav.png"
        style="margin-right:15px;width:24px;height:24px;"
        @click="showDrawer"
        v-if="this.userinfo"
      />
      <a-drawer
        title="Basic Drawer"
        placement="left"
        :closable="false"
        @close="onClose"
        :visible="visible"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-drawer>
      <img src="~@/assets/images/monster.png" />
      <a class="logo-name">MONSTER</a>
      <span class="head-title">
        <a-popover v-if="this.userinfo">
          <div class="info-links" slot="title">
            <router-link
              :to="{
                        name: 'home'
                  }"
            >{{this.userinfo.nickname}}</router-link>
          </div>
          <div slot="content" class="info-content">
            <router-link :to="{
                        name: 'home'
                  }">资料设置</router-link>
            <a-divider type="horizontal" dashed />
            <a-button type="primary" class="logout" @click="logout">登出</a-button>
          </div>
          <a-avatar
            style="backgroundColor:#87d068"
            icon="user"
            v-if="this.userinfo"
            :src="'/avatar/'+this.userinfo.avatar"
          />
        </a-popover>
        <span>联系我们</span>
        <span>关于我们</span>
        <span>案例</span>
        <span>首页</span>
      </span>
    </a-layout-header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutHead',
  data() {
    return {
      collapsed: false,
      visible: false,
      count: 0
    }
  },
  created() {
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    if (this.token && localStorage.getItem('userinfo')) {
      this.$store.dispatch("commitadduserinfo", JSON.parse(localStorage.getItem('userinfo')))
    }
  },
  mounted() {
    //创建定时器更新时间
    // setInterval(() => {
    //   this.$store.getters.token && this.count++
    // }, 1000);
  },
  beforeDestroy() {
    //实例销毁前青出于定时器
    clearInterval();

  },
  computed: {
    ...mapState({
      userinfo: (state) => {
        if (state.userinfo)
          return JSON.parse(state.userinfo)
        else
          return undefined
      },
    }),
  },
  methods: {

    logout() {
      this.$store.dispatch('commitremovetoken').then(() => { this.$router.push({ name: 'login' }) }
      )
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    navclick() {
      alert('00')
    },
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
.ant-layout-header {
  padding-left: 15px;
  background-color: @basecolor-black-01;
  height: 64px;
  border-bottom: 1px solid @basecolor-gray-01;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  background-image: url("~@/less/monster.png");
  // border: 1px solid red;
  color: @basecolor-white-01;
  width: 32px;
  height: 32px;
}

//logo-name
.logo-name {
  margin-left: 10px;
  flex: 1;
  color: @basecolor-white-01;
  font-size: @basefont-size-18;
  font-family: @basefont-family;
}

//head:首页，案例，关于我们，联系我们
.head-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  color: @basecolor-white-01;
  font-size: @basefont-size-15;
  font-family: @basefont-family;
}

.head-title span {
  margin-left: 30px;
}
.info-links {
  height: 28px;
  text-align: center;
  a {
    color: @basecolor-white-01;
    font-size: 5px;
    font-family: @basefont-family;
    text-align: center;
  }
}
.info-content {
  text-align: center;
  a {
    color: @basecolor-white-01;
    font-size: 5px;
    font-family: @basefont-family;
  }
}

.logout {
  width: 70px;
  height: 23px;
  background-color: @basecolor-gray-01;
  font-size: 5px;
  font-family: @basefont-family;
  border: 0px;
}
</style>
