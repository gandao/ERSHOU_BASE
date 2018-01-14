<template>
    <div id="app1" >
      <slideshow :imgdata="datas.all_main.banner_img" v-if=slideshow_show></slideshow>
      <v-header :datas="datas" ></v-header>
      <div class="content"  @click="change_show">
          <router-view :datas="datas" ></router-view>
      </div> 
      <div class="foot">
        <div class="p1">SICH UP SPECIAL PROMOTIONS</div>
        <div class="p2">Get exclusive deals you want find anywhere else stright to your inbox!</div>
      </div>
    </div>
  </div>
</template>
<script>
import header from "../../components/header/header"
import slideshow from "../../components/slideshow/slideshow"
import data from "../../data/index"
export default {
  props: ["datas"],
  components: {
    "v-header": header,
    "slideshow": slideshow
  },
  methods: {
    change_show() {
      this.is_show = !this.is_show
    }
  },
  computed: {
      slideshow_show: function() {
          if (this.datas.router_main > 0) return false
          return true
      }
  }
}
</script>
<style lang="less"  type="text/less">
@import "../../common/less/index";
#app1{
  height: 100%;
  flex: 1;
   display: flex;
 	 flex-direction: column;
   .content{
     flex: 1;
     background: #FFF;
   }
  .foot{
    flex:0 0 30px;
    background-color: @main_color;
    text-align: center;
    color: #FFF;
    padding-bottom: 10px ;
    .p1{
      margin-bottom: 7px;
      padding-top: 20px;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .p2{
      font-size: 10px;
      letter-spacing: 1px;
    }
  }
}
</style>