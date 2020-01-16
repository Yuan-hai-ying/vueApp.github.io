<<template>
    <div class="mui-content shop_container">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner good_list" v-for="(item,i) in carslist">
                    <mt-switch v-model="$store.getters.getjiesuan[item.id]"
                        @change="selectedChange(item.id,$store.getters.getjiesuan[item.id])"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span>￥{{ item.sell_price }}</span>
                            <numbox :initcount="$store.getters.getcarCount[item.id]" :goodsid="item.id"></numbox>
                            <a @click="remove(item.id,i)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan" v-if="flag">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getzongjia.count}}</span> 件，总价 <span
                                class="red">{{$store.getters.getzongjia.money}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
    </template>
    <script>
        import {
            MessageBox,
            Toast
        } from 'mint-ui';
        import numbox from "../subcomponents/shopcar_numbox.vue";
        export default {
            data() {
                return {
                    carslist: [],
                    flag: true,
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
                            // console.log(this.carslist);
                        }
                    })
                },
                remove(e, i) {
                    const htmls = `
                    <div class="box">
                        <div class="isunbind">是否删除该商品？</div>
                    </div>`
                    MessageBox({
                        title: '',
                        message: htmls,
                        showCancelButton: true,
                        cancelButtonClass: 'cancelButton',
                        confirmButtonClass: 'confirmButton',
                        confirmButtonText: '确定',
                        cancelButtonText: '暂不'
                    }).then(action => {
                        if (action == 'confirm') {
                            this.carslist.splice(i, 1)
                            this.$store.commit('removeForcar', e)
                            Toast({
                                message: '操作成功',
                                iconClass: 'mui-icon mui-icon-checkmarkempty',
                                duration: 1000,
                            });
                        }
                    }).catch(err => {});
                },
                selectedChange(id, selected) {
                    // console.log(id,selected);
                    this.$store.commit('upcarselected', {
                        id,
                        selected: selected
                    })
                }

            },
            components: {
                numbox
            }
        }
    </script>
    <style lang="less" scoped>
        .cancelButton {
            background: #959595 !important;
            width: 30px !important;
            height: 20px;
            color: #fff !important;
            /* border-radius: .05rem; */
            border: none;
            /* margin: .2rem !important; */
        }

        .confirmButton {
            background: #d9534f !important;
            width: 30px !important;
            height: 20px;
            color: #fff !important;
            /* border-radius: .05rem; */
            border: none;
            /* margin: .2rem !important; */
        }

        .mint-msgbox-message .box .isunbind {
            color: #000000 !important;
        }
        .shop_container {
            background-color: #eee;
            overflow: hidden;
        }

        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .red {
                color: red;
            }
        }

        .good_list {
            display: flex;
            justify-content: space-around;

            img {
                height: 0.6rem;
                width: 0.6rem;
                align-self: center;
                /* margin:0 auto; */
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
                    font-size: 0.13rem;
                }
            }
        }
    </style>