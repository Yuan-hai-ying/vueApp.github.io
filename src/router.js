import VueRouter from 'vue-router'

import home from './components/tabbar/HomeContainer.vue'
import Member from './components/tabbar/MemberContainer.vue'
import search from './components/tabbar/SearchContainer.vue'
import shopcar from './components/tabbar/ShopcarContainer.vue'
import newslist from './components/news/NewsList.vue'
import newsinfo from './components/news/Newsinfo.vue'
import photoList from './components/photos/photoList.vue'
import photoinfo from './components/photos/photoinfo.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:home},
    {path:'/Member',component:Member},
    {path:'/search',component:search},
    {path:'/shopcar',component:shopcar},
    {path:'/home/newslist',component:newslist},
    {path:'/home/newsinfo/:id',component:newsinfo},
    {path:'/home/photoList',component:photoList},
    {path:'/home/photoinfo/:id',component:photoinfo},


  ],
  linkActiveClass:"mui-active"
})
// 把路由对象暴露出去
export default router