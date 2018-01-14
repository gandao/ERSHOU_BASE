<template>
  <div id="app">
    <router-view :datas= "datas" class="main_content"></router-view>
  </div>
 
</template>
<script>
export default {
    data() {
    return {
      datas: {
          router_main: Number(0),
          is_logIn: false,
          all_main: {
            banner_img: [],
            banner_img1: [],
            data: {}
          }
      }
    }
  },
  created() {
    let that = this
    this.$http.get("http://localhost:8080/unusedgoods/home_pictures").then(function (successData) {
      that.$nextTick(() => {
            for (let i = 0; i < 4; i++) {
              that.datas.all_main.banner_img.push(successData.data[i].url)
            }
            for (let i = 0; i < 3; i++) {
              that.datas.all_main.banner_img1.push(successData.data[i + 4].url)
            }
      })
      // console.log(successData.data)
    },
     (fileData) => { console.log(fileData)}
    )
  }
}
</script>
<style lang="less"  type="text/less">
@import "./common/less/index";
#app{
 display: flex;
 height: 100%;
 flex-direction: column;
 .main_content{
   flex: 1;
   height: 100%;
 }
 
}

</style>
