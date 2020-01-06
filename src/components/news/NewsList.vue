<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item,i) in getNewsList">
                <router-link :to='"/home/newsinfo/"+item.id'>
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{item.add_time |dateFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              getNewsList:[],
            }
        },
        created() {
            this.getNewslist();
        },
        methods: {
            getNewslist() {
                this.axios.get("/api/getnewslist").then(result => {
                    console.log(result);
                    if (result.data.status === 0) {
                        // 成功了
                        this.getNewsList=result.data.message
                        console.log(this.getNewsList)
                    } else {
                        // 失败的
                        Toast("");
                    }
                });
            }
        },
    }
</script>
<style lang="less" scoped>
    .mui-media-body {
        font-size: 14px;
    }

    .mui-ellipsis {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #7cc7ff;
    }
</style>