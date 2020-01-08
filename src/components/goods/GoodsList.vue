<template>
  <div class="goods-list">
    
    <div class="goods-item" v-for="(item,i) in goodslist" :key="i" @click="goDetail(item.id)">
      <img :src="item.img_url">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodslist:[],
        pageindex:1,
      }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
      getGoodsList() {
      // 获取商品列表
      this.axios
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.data.status === 0) {
            this.goodslist = this.goodslist.concat(result.data.message);
            console.log(this.goodslist);
          }
        });
    },
    goDetail(id){
      console.log(id);
      this.$router.push({ name: "goodsinfo", params: { id } });
      // this.$router.push("/home/goodsinfo/" + id);
    }
    },
  }
</script>

<style lang="scss" scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    background-color: #fff;
    justify-content: space-between;

    .goods-item {
      justify-content: space-between;
      flex-direction: column;
      display:flex;
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin:4px 0;
      padding:2px;
      font-size: 14px;
      min-height: 293px;

      img {
      width: 100%;
    }
      h1{
        font-size: 14px;
      }
      .info {
      background-color: #eee;
      }
      p {
        margin: 0;
        padding: 5px;
      }
      .price .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
      }
      .price .old {
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }

    }
  }
</style>
