import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import layouthead from './components/LayoutHead.vue'
import layoutfooter from './components/LayoutFooter.vue'

import {
  Form,
  Button,
  Layout,
  Input,
  Tooltip,
  Select,
  Modal,
  Avatar,
  Popover,
  breadcrumb,
  Divider,
  Menu,
  Icon,
  Drawer,
  Upload,
  List,
  Spin,
  Tabs,
  Radio,
  DatePicker,
  Cascader,
  Row,
  Col
} from 'ant-design-vue'
// moment.locale('zh-cn')

Vue.component('layouthead', layouthead)
Vue.component('layoutfooter', layoutfooter)
// const globalbase = require('./less/global.less')

Vue.component(Form)
Vue.component(Button.name, Button)
Vue.component(Button.Group.name, Button.Group)
Vue.component(Layout.name, Layout)
Vue.component(Input)
Vue.component(Tooltip)
Vue.component(Select)
Vue.component(Modal)
Vue.component(Avatar)
Vue.component(Popover)
Vue.component(breadcrumb)
Vue.component(Divider)
Vue.component(Menu)
Vue.component(Icon)
Vue.component(Drawer)
Vue.component(Upload)
Vue.component(List)
Vue.component(Spin)
Vue.component(Tabs)
Vue.component(Radio)
Vue.component(DatePicker)
Vue.component(Cascader)
Vue.component(Row)
Vue.component(Col)


Vue.use(Form)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Modal)
Vue.use(Avatar)
Vue.use(Popover)
Vue.use(breadcrumb)
Vue.use(Divider)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Upload)
Vue.use(List)
Vue.use(Spin)
Vue.use(Tabs)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(Row)
Vue.use(Col)


Vue.prototype.$Modal = Modal


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  // store.dispatch('commitremovetoken')

  if (to.meta.requiresAuth) { // 判断该路由是否需要登录权限

    if (store.getters.token) { // 通过vuex state获取当前的token是否存在store.state.token
      next() // 判断是否访问的登录页面，是的话跳转到欢迎页面
    } else {
      next('/login')
    }
  } else {
    if (store.getters.token) { // 通过vuex state获取当前的token是否存在store.state.token
      if (to.meta.tag === 0) {
        next()
      } else {
        next('/about')
      }
    } else {
      if (to.meta.tag >= 0) {
        next()
      } else {
        next('/login')
      }
    }
  }
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
