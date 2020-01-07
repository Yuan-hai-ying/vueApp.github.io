<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==currentindex? 'mui-active' :' ']" v-for="item in cates"
                        :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>

        </div>
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+item.id"  v-for="item in list" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1>{{item.title}}</h1>
                    <span>{{item.zhaiyao}}</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
    import mui from '../../lib/mui/js/mui.min.js'
    import {
        Toast
    } from "mint-ui";
    export default {
        data() {
            return {
                cates: [],
                list: [],
                currentindex: 0,
            }
        },
        created() {
            this.getAllCategory();
            this.getPhotoListByCateId(0)
        },
        mounted() {
            // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
            // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
            // 2. 初始化滑动控件
            mui(".mui-scroll-wrapper").scroll({
                deceleration: 0.0055 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getPhotoListByCateId(cateId) {
                this.currentindex = cateId;
                this.axios.get("api/getimages/" + cateId).then(result => {
                    // console.log(result);
                    if (result.data.status === 0) {
                        if (result.data.message.length > 0) {
                            this.list = result.data.message;
                        } else {
                            this.list=' '
                            Toast({
              message: '暂无更多图片',
              // duration: 2000,
              iconClass: ''
            })
                        }
                    }
                });

            },
            getAllCategory() {
                this.axios.get("api/getimgcategory").then(result => {
                    // console.log(result);
                    if (result.data.status === 0) {
                        // 手动拼接出一个最完整的 分类列表
                        result.data.message.unshift({
                            title: "全部",
                            id: 0
                        });
                        this.cates = result.data.message;
                        // console.log(this.cates);
                    }
                });
            },


        },
    }
</script>
<style lang="less" scoped>
    * {
        touch-action: pan-y;
    }

    img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

    .photo-list {
        margin: 0;
        padding: 10px;
        padding-bottom: 0;

        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;

            img {
                width: 100%;
                vertical-align: middle;
            }

            .info {
                position: absolute;
                bottom: 0;
                color: #fff;
                text-align: left;
                max-height: 84px;
                padding: 0 0 0 5px;
                background-color: rgba(0, 0, 0, 0.4);


                h1 {
                    font-size: 14px;
                }

                span {
                    font-size: 12px;
                }
            }
        }
    }
</style>