<template>
  <div id="slideshow">
    <el-carousel height="300px"  trigger="click">
      <el-carousel-item v-for="(item,index) in imgdata" :key="index">
        <img :src=item />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    props: {
        imgdata: {
            type: Array
        }
    }
}
</script>

<style lang="less"  type="text/less">
#slideshow{
  margin-bottom: 5px;
}
img{
    display: block;
    width: 100%;
    height: 100%;
    z-index: 999;
}
</style>