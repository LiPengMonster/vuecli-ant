import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
// import AntLayout from './views/AntLayout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: '',
      component: Login,
      meta: {
        requiresAuth: false,
        tag: 1
      }
      // component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false,
        tag: 1
      }
      // component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/antlayout',
      name: 'antlayout',
      meta: {
        requiresAuth: true,
        tag: 1
      },
      component: () => import( /* webpackChunkName: "about" */ './components/AntLayout.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        requiresAuth: false,
        tag: 1
      },
      component: () => import( /* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/registerOk',
      name: 'registerOk',
      meta: {
        requiresAuth: false,
        tag: 1
      },
      component: () => import( /* webpackChunkName: "about" */ './views/RegisterOk.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requiresAuth: true,
        tag: 1
      },
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    }, {
      path: '/test',
      name: 'test',
      meta: {
        requiresAuth: false,
        tag: 1
      },
      component: () => import( /* webpackChunkName: "about" */ './views/Test.vue')
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      meta: {
        requiresAuth: true,
        tag: 1
      },
      component: () => import( /* webpackChunkName: "about" */ './views/UserInfo.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresAuth: true,
        tag: 1
      },
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }, {
      path: '*',
      name: 'cantfind',
      meta: {
        requiresAuth: false,
        tag: 0
      },
      component: () => import( /* webpackChunkName: "about" */ './views/CantFind.vue')
    }
  ]
})
