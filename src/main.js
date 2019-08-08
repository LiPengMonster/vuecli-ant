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
  Col,
  Alert,
  message
} from 'ant-design-vue'

Vue.component('layouthead', layouthead)
Vue.component('layoutfooter', layoutfooter)



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
Vue.component(Alert)


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
Vue.use(Alert)


Vue.prototype.$Modal = Modal
Vue.prototype.$message = message

message.config({
  top: `100px`,
  duration: 2,
  maxCount: 3,
});

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // store.dispatch('commitremovetoken');
  if (!to.meta.requiresAuth) {
    return next();
  }
  if (!store.getters.token) {
    return next('/login');
  }
  return next();

})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
