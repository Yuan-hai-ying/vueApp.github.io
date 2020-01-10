<template>
  <div>
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for='(item,index) in lunboList'>
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images//menu1(1).png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
        </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodlist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images//menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>
  </div>
</template>
<script>
  import {
    Toast
  } from "mint-ui";
  export default {
    data() {
      return {
        lunboList: []
      };
    },
    created() {
      this.getlunbo();
    },
    methods: {
      getlunbo() {
        this.http.get("/api/getlunbo").then(result => {
          // console.log(result);
          if (result.data.status ===0) {
            // 成功了
            this.lunboList = result.data.message;
          } else {
            // 失败的
            // Toast("加载轮播图失败");
            Toast({
              message: '加载轮播图失败',
              // duration: 2000,
              iconClass: ''
            })
          }
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .mint-swipe {
    height: 200px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;

    img {
      width: 60px;
      height: 60px;
    }

    .mui-media-body {
      font-size: 13px;
    }
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>