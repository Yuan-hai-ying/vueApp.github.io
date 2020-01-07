<template>
        <div class="photoinfo-container">
                <h3>11</h3>
                <p class="subtitle">
                  <span>发表时间:</span>
                  <span>点击:次</span>
                </p>
            
                <hr>
            
                <!-- 缩略图区域 -->
                <!-- <div class="thumbs">
                  <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" :key="item.src">
                </div> -->
            
                <!-- 图片内容区域 -->
                <div class="content"></div>
            
                <!-- 放置一个现成的 评论子组件 -->
                <!-- <cmt-box :id="id"></cmt-box> -->
              </div>
</template>
<script>
export default {
    data() {
        return {
            list:[]
        }
    },
}
</script>

<style lang="less" scoped>
    
</style>