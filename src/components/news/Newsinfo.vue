<template>
    <div class="new-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo[0].title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo[0].add_time | dateFormat }}</span>
            <span>点击：{{ newsinfo[0].click }}次</span>
        </p>

        <hr>

        <!-- 内容区域 -->
        <!-- <div class="content" v-html="newsinfo[0].content"></div> -->
        <div class="content" v-html="newsinfo[0].content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    // // 1. 导入 评论子组件
    import comment from "../subcomponents/comment.vue";

    export default {
        data() {
            return {
                id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
                newsinfo: {} // 新闻对象
            };
        },
        created() {
            this.getNewsInfo();
        },
        components: {
            'comment-box': comment
        },
        methods: {
            getNewsInfo() {
                this.axios.get("/api/getnew/" + this.id).then(result => {
                    // console.log(result);
                    if (result.data.status === 0) {
                        // 成功了
                        this.newsinfo = result.data.message
                        console.log(this.newsinfo)
                    } else {
                        // 失败的
                        // Toast("");
                    }
                });
            }
        },
    };
</script>

<style lang="less" scoped>
    .new-container {
        padding: 0 4px;

        .title {
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }

        .subtitle {
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }

        .content {
            img {
                width: 100%;
            }
        }
    }
</style>