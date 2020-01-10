// 入口文件
import Vue from 'vue'

// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: {
        car:car,
    },
    mutations: {
        addcar(state, goodsinfo) {
            // console.log(goodsinfo);
            var flag = false;
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += goodsinfo.count
                    flag = true;
                    return true;
                }
            })
            if (flag == false) {
                state.car.push(goodsinfo)
            }
            
             // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        }

    },
    getters: { // this.$store.getters.***
        // 相当于 计算属性，也相当于 filters
        getAllCount(state) {
          var c = 0;
          state.car.forEach(item => {
            c += item.count
          })
          return c
        },
    }

})
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 导入格式化时间插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})
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
import {
    Header,
    Swipe,
    SwipeItem,
    Button,
    Lazyload
} from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.use(Lazyload);
// import 'mint-ui/lib/style.css'
// 导入缩略图插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)
// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

// 导入跟组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store

})