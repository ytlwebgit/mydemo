import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import User from '@/views/users/User.vue'
// 一定要记得use
Vue.use(VueRouter)

// 这个default将来这个文件被引入的时候会默认返回
export default new VueRouter({
  routes: [{
    name: 'Login',
    path: '/',
    component: Login
  }, {
    name: 'Login',
    path: '/login',
    component: Login
  }, {
    name: 'Home',
    path: '/home',
    component: Home,
    redirect: {
      'name': 'Welcome'
    },
    // 添加嵌套路由
    children: [{
      name: 'Welcome',
      path: 'welcome',
      component: Welcome
    },
    {
      name: 'User',
      path: 'user',
      component: User
    }
    ]
  }]
})
