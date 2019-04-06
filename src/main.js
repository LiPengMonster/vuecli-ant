import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  Layout,
  Input
} from 'ant-design-vue'

Vue.component(Button.name, Button)
Vue.component(Button.Group.name, Button.Group)
Vue.component(Layout.name, Layout)
Vue.component(Input)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Input)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
