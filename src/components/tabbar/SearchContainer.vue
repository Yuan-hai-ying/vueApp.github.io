<<template>
    <div>
        <div class="search">
            <span class="mui-icon mui-icon-search"></span>
            <input type="search" placeholder="搜索" @focus='Tosearch()' @blur="quxiao()" ref="input">
            <a v-show="searchShow">取消</a>
        </div>
    </div>
    </template>
    <script>
        import {
            Indicator,
            Toast
        } from 'mint-ui';
        export default {
            data() {
                return {
                    searchShow: false,
                    // timer: ''
                }
            },
            methods: {
                Tosearch() {
                    this.searchShow = true;
                    Indicator.close();
                },
                quxiao() {
                    let that = this;
                    console.log(this.$refs.input.value);
                    this.searchShow = false;
                    if (this.$refs.input.value) {
                        Indicator.open({
                            text: '搜索中...',
                            spinnerType: 'fading-circle'
                        });
                        this.timer = setTimeout(function () {
                            console.log(this); // 这里的this指向window对象
                            // _that.$router.push('/home');
                            Indicator.close();
                        }, 2000)
                        // console.log(1111);
                        // Indicator.close()
                        // that.timer = setTimeout(Indicator.close(), 5000);

                    } else {
                        Toast({
                            message: '搜索商品名称不能为空',
                            // iconClass: 'mui-icon mui-icon-checkmarkempty',
                            duration: 2000,
                        });
                    }
                    Indicator.close();
                }
            },
        }
    </script>
    <style lang="less" scoped>
        .search {
            display: flex;
            align-items: center;
            position: relative;
            padding: 10px 10px;
            /* padding-right: 0; */
            background-color: #d9d9d9;
        }

        span {
            position: absolute;
            left: 15px;
            bottom: 19px;
            font-size: 18px;
        }

        a {
            width: 45px;
            text-align: center;
            /* margin:0 auto; */
            margin-left: 10px;
        }

        input[type=search] {
            font-size: 16px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin-bottom: 0;
            height: 34px;
            line-height: 34px;
            text-align: left;
            border: 0;
            border-radius: 4px;
            background-color: #fff;
            text-indent: 0.5em;
            width: 100%;
        }
    </style>