<template>
        <div class="photoinfo-container">
                <h3>{{photoinfo.title}}</h3>
                <p class="subtitle">
                  <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
                  <span>点击:{{photoinfo.click}} 次</span>
                </p>
            
                <hr>
            
                <!-- 缩略图区域 -->
                <div class="thumbs">
                    <vue-preview
                    :list="list"
                    :thumbImageStyle="{width: '100px', height: '100px', margin: '10px', boxShadow:'0 0 8px #999'}"
                    :previewBoxStyle="{border: '1px solid #eee'}"
                    :tapToClose="true"
                  />
                </div>
                <!-- 图片内容区域 -->
                <div class="content" v-html="photoinfo.content">
                </div>
            
                <!-- 放置一个现成的 评论子组件 -->
                <cmt-box :id="id"></cmt-box>
              </div>
</template>
<script>
      // // 1. 导入 评论子组件
      import comment from "../subcomponents/comment.vue";
export default {
    data() {
        return {
            id:this.$route.params.id,
            list:[],
            photoinfo:[]
        }
    },
    created() {
      this.getPhotoInfo()
      this.getThumbs()
    },
    methods: {
      getPhotoInfo() {
      // 获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.data.status === 0) {
          this.photoinfo = result.data.message[0];
          console.log(this.photoinfo);
        }
      });
    },
      getThumbs(){
        this.axios.get("api/getthumimages/" + this.id).then(result => {
        if (result.data.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.data.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          // 把完整的数据保存到 list 中
          this.list = result.data.message;
          // console.log(this.list);
        }
      });
      }
    },
    components:{
      'cmt-box':comment
    }
}
</script>

<style lang="less" scoped>
     ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   }
    .photoinfo-container {
      background-color: #fff;
      padding: 15px 5px 0 5px;
      h3 {
         text-align: center;
         font-size:15px;
         color: #26a2ff;
      }
      .subtitle {
        display: flex;
        justify-content:space-between;
        font-size: 12px;
      }
      .content {
        font-size: 13px;
        /* max-height: 104px; */
        line-height: 30px;
      }

    }

</style>