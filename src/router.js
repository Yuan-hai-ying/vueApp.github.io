import VueRouter from 'vue-router'

import home from './components/tabbar/HomeContainer.vue'
import Member from './components/tabbar/MemberContainer.vue'
import search from './components/tabbar/SearchContainer.vue'
import shopcar from './components/tabbar/ShopcarContainer.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:home},
    {path:'/Member',component:Member},
    {path:'/search',component:search},
    {path:'/shopcar',component:shopcar}

  ],
  linkActiveClass:"mui-active"
})
// 把路由对象暴露出去
export default router