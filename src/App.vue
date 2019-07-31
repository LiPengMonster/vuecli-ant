<template>
  <div id="app">
    <a-layout>
      <layouthead></layouthead>
      <a-layout>
        <a-layout>
          <a-layout-sider width="200" style="background-color: red !important;" v-if="menu">
            <a-menu
              mode="inline"
              :selectedKeys="this.menuselectkeys"
              :openKeys="[2,6]"
              :style="{ height: '100%', borderRight: 0 }"
              :inlineCollapsed="collapsed"
              @click="menuclick"
            >
              <a-sub-menu :key="item.id" v-for="item in menu.filter(item=>item.level===1)">
                <span slot="title">
                  <a-icon type="user" />
                  {{item.menu}}
                </span>
                <a-menu-item
                  :key="item1.id"
                  v-for="item1 in menu.filter(item1=>item1.pid===item.id)"
                >
                  <router-link
                    :to="{
                        name: item1.route
                  }"
                  >{{item1.menu}}</router-link>
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </a-layout-sider>
          <a-layout-content>
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
      <layoutfooter></layoutfooter>
    </a-layout>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
}
//body-box
.ant-layout-content {
  width: 100%;
  min-height: 580px;
  background-color: @basecolor-gray-04;
}
.ant-menu {
  background: @basecolor-gray-06 !important;
}
.ant-menu-item {
  font-size: @basefont-size-10 !important;
}

.ant-menu-item-selected {
  background: @basecolor-white-01 !important;
  border-right: 0px;

  a {
    color: black;
  }
}
.ant-menu-item-selected::after {
  border-right: 0px solid red !important;
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      collapsed: true
    }
  },
  created() {
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    // 判断是否有menu数据,没有则查询后台,有则不处理
    if (this.token && !this.menu) {
      this.axios.get('/menu')
        .then(response => this.$store.dispatch("commitaddmenu", response.data.rows)).
        catch(error => console.log(error))
    }
    if (this.token && localStorage.getItem('menuselectkeys')) {
      this.$store.dispatch("commitaddmenuselectkeys", localStorage.getItem('menuselectkeys'))
    }
  },
  computed: {
    ...mapState({
      token: state => state.token,
      menu: state => state.menu,
      menuselectkeys: (state) => {
        if (state.menuselectkeys)
          return JSON.parse(state.menuselectkeys)
        return [3]
      }
    }
    )
  },
  methods: {
    menuclick(item, key, keyPath) {
      this.$store.dispatch("commitaddmenuselectkeys", JSON.stringify([item.key]))
    }
  }
}
</script>
