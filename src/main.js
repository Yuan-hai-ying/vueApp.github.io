// 入口文件
import Vue from 'vue'

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 导入vue axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
// import VueAxios from 'vue-axios'
// 设置请求的根路径
// axios.defaults.baseURL= 'http://vue.studyit.io'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// Vue.use(axios);
Vue.prototype.http = axios;　
// import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
// Vue.use(VueResource)
// 设置请求的根路径
// Vue.http.options.root = 'http://vue.studyit.io';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
// Vue.http.options.emulateJSON = true;
// 导入mui
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 按需导入mintUI
import {Header,Swipe, SwipeItem} from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name,Header)
// import 'mint-ui/lib/style.css'

// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

// 导入跟组件
import app from './App.vue'

var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router

})