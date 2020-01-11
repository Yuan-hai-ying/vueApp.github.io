<<template>
    <div class="mui-content shop_container">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner good_list" v-for="(item,i) in carslist">
                    <mt-switch></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span>￥{{ item.sell_price }}</span>
                            <numbox></numbox>
                            <a href="">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
                </div>
            </div>
        </div>
    </div>
    </template>
    <script>
        import numbox from "../subcomponents/shopcar_numbox.vue";
        export default {
            data() {
                return {
                    carslist:[]
                }
            },
            created() {
                this.getshopCar()
            },
            methods: {
                getshopCar() {
                    var shopcar = []
                    this.$store.state.car.forEach(item => {
                        // console.log(item);
                        shopcar.push(item.id)
                    });
                    console.log(shopcar.join());
                    if (shopcar.length <= 0) {
                        return;
                    }
                    this.axios.get('api/goods/getshopcarlist/' + shopcar.join()).then(res => {
                        if (res.data.status === 0) {
                            this.carslist = res.data.message;
                        }
                    })
                }
            },
            components: {
                numbox
            }
        }
    </script>
    <style lang="less" scoped>
        .shop_container {
            background-color: #eee;
            overflow: hidden;
        }

        .good_list {
            display: flex;
            justify-content: space-around;

            img {
                height: 60px;
                width: 60px;
            }

            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                p {
                    margin-bottom: 0;

                    span {
                        color: red;
                        font-weight: bold;
                    }
                }

                h1 {
                    font-weight: bold;
                    font-size: 13px;
                }
            }
        }
    </style>