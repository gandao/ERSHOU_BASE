<template>
  <div id="main">
      <div class="section_one">
        <div class="wrapper">
          <div class="left">
            <ul>
              <li @click.stop.prevent="classify_fun('数码')"><a href="#">数码</a></li>
              <li @click.stop.prevent="classify_fun('家电')"><a href="#">家电</a></li>
              <li @click.stop.prevent="classify_fun('衣物')"><a href="#">衣物</a></li>
              <li @click.stop.prevent="classify_fun('书籍')"><a href="#">书籍</a></li>
              <li @click.stop.prevent="classify_fun('生活用品')"><a href="#">生活用品</a></li>
              <li @click.stop.prevent="classify_fun('其他')"><a href="#">其他</a></li>
            </ul>
          </div>
          <div class="right">
            <div class="wrapper1">
              <div class="left1">
                 <div class="img-wrapper">
                  <img :src= datas.all_main.banner_img1[0] />
                  <div class="one"></div>
                  <div class="two"></div>
                </div>
              </div>
              <div class="right1">
                <div class="img-wrapper first">
                  <img :src= datas.all_main.banner_img1[1] />
                  <div class="one"></div>
                  <div class="two"></div>
                </div>
                 <div class="img-wrapper second">
                  <img :src= datas.all_main.banner_img1[2] />
                  <div class="one"></div>
                  <div class="two"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section_two">
        <div class="classify">
          <span :class="{'select':section_two_select[0]}" @click.stop.prevent="section_two_btn(0)"><a href="#" >给你想要</a></span> / <span :class="{'select':section_two_select[1]}" @click.stop.prevent="section_two_btn(1)"><a href="#" >新品上市</a></span> / <span :class="{'select':section_two_select[2]}" @click.stop.prevent="section_two_btn(2)"><a href="#" >精品推荐</a></span>
          <div class="select_wrapper">
            <span :class="{'select': section_item_is_show}"><a href="#"  @click.stop.prevent="section_item_is_show=true"><i class="el-icon-arrow-left"></i></a></span>
            <span :class="{'select': !section_item_is_show}"><a href="#" @click.stop.prevent="section_item_is_show=false"><i class="el-icon-arrow-right"></i></a></span>
          </div>
        </div>
        <div class="content_warpper">
          <transition name="fade">
            <ul class="second"  v-if="section_item_is_show">
              <li><shop-item :item_data=section_two_content[4] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_two_content[0].id}}"><img :src=section_two_content[0].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_two_content[5] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_two_content[1].id}}"><img :src=section_two_content[1].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_two_content[6] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_two_content[2].id}}"><img :src=section_two_content[2].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_two_content[7] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_two_content[3].id}}"><img :src=section_two_content[3].imageUrl /></router-link></div></shop-item></li>
            </ul>
          </transition>
          <transition name="fade">
            <ul class="second" v-if="!section_item_is_show" >
              <li><shop-item :item_data=section_two_content[4] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_two_content[4].id}}"><img :src=section_two_content[4].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_two_content[5] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_two_content[5].id}}"><img :src=section_two_content[5].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_two_content[6] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_two_content[6].id}}"><img :src=section_two_content[6].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_two_content[7] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_two_content[7].id}}"><img :src=section_two_content[7].imageUrl /></router-link></div></shop-item></li>
            </ul>
          </transition>
        </div>
      </div>
      <div class="section_three">
        <a href="#"><img src="./banner2.png"></a>
      </div>
      <div class="section_four">
        <div class="wrapper">
          <div class="classify">
            <span :class="{'select':section_three_select[0]}" @click.stop.prevent="section_three_btn(0)"><a href="#" >男士</a></span> / <span :class="{'select':section_three_select[1]}" @click.stop.prevent="section_three_btn(1)"><a href="#" >女士</a></span> / <span :class="{'select':section_three_select[2]}" @click.stop.prevent="section_three_btn(2)"><a href="#" >其他</a></span>
            <span class="more"><a href="#">查看更多<i class="el-icon-arrow-right"></i></a></span>
          </div>
          <div class="content_warpper">
            <ul>
              <li><shop-item :item_data=section_three_content[0] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_three_content[0].id}}"><img :src=section_three_content[0].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_three_content[1] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_three_content[1].id}}"><img :src=section_three_content[1].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_three_content[2] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_three_content[2].id}}"><img :src=section_three_content[2].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_three_content[3] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_three_content[3].id}}"><img :src=section_three_content[3].imageUrl /></router-link></div></shop-item></li>
            </ul>
            <ul>
              <li><shop-item :item_data=section_three_content[4] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_three_content[4].id}}"><img :src=section_three_content[4].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_three_content[5] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_three_content[5].id}}"><img :src=section_three_content[5].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_three_content[6] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_three_content[6].id}}"><img :src=section_three_content[6].imageUrl /></router-link></div></shop-item></li>
              <li><shop-item :item_data=section_three_content[7] :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: section_three_content[7].id}}"><img :src=section_three_content[7].imageUrl /></router-link></div></shop-item></li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import shop_item from "../shop_item/shop_detail"
export default {
  props: ["datas"],
  data() {
    return {
      section_item_is_show: true,
      section_two_content: [],
      section_three_content: [],
      section_two_select: [true,false,false],
      section_three_select: [true,false,false]
    }
  },
  components: {
    "shopItem": shop_item
  },
  created() {
    let that = this
    this.$http.get("http://localhost:8080/unusedgoods/home_recommend").then(function (successData) {
      that.$nextTick(() => {
            that.datas.all_main.data = successData.data
            // console.log(that.datas.all_main.data)
            that.datas.router_main = 0
            that.section_two_content = that.datas.all_main.data[0].views
            that.section_three_content = that.datas.all_main.data[3].views
			})
    },
     (fileData) => { console.log(fileData)}
    )
  },
  methods: {
    section_two_btn(key) {
      this.section_two_content = this.datas.all_main.data[key].views
      for (let i = 0; i < this.section_two_select.length; i++) {
        this.section_two_select[i] = false
      }
      this.section_two_select[key] = true
    },
    section_three_btn(key) {
      this.section_three_content = this.datas.all_main.data[key + 3].views
      for (let i = 0; i < this.section_three_select.length; i++) {
        this.section_three_select[i] = false
      }
      this.section_three_select[key] = true
    },
    classify_fun(key_word) {
        this.datas.search_content = key_word
        this.$router.push({ path: './shop_list' })
      }
  }
}
</script>
<style lang="less"  type="text/less">
@import "../../common/less/index";
#main{
  .section_one{
    height: 400px;
    background: #F5F5F5;
    .wrapper{
      height: 400px;
      width: 70%;
      margin: 0 auto;
      font-size: 0;
      .left{
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        background-color: #EE8484;
        padding: 0 21px;
        border-radius: 3px;
        margin-top: 60px;
        margin-right: 30px;
        margin-left: 30px;
        li{
          padding: 0 3px;
          text-align: center;
          line-height: 35px;
          border-bottom: 1px solid #fff;
          &:last-child{
            border-bottom: none;
          }
          a{
            display: block;
            font-size: 13px;
            font-weight: bold;
            color: #fff;
            &:hover{
              color: #DD5563;
            }
          }
        }
      }
      .right{
        display: inline-block;
        .right1{
          display: inline-block;
          .first{
            width: 140px !important;
            margin-bottom: 20px;
            // margin-top: 15px;
            img{
              display: block;
              width: 140px !important;
              height: 140px;
           }
          }
          .second{
            img{
              display: block;
              width: 250px;
              height: 140px;
           }
          }
        }
        .wrapper1{
          margin-top: 50px;
        }
        .left1{
          width: 300px;
          height: 300px;
          display: inline-block;
           margin-right: 30px;
           img{
            display: block;
            width: 300px;
            height: 300px;
          }
        }
        .img-wrapper{
          position: relative;
          // background: #000;
          .one{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 3px;
            left: 3px;
            border: 1px solid #D3D3D3;
          }
          .two{
            width: 100%;
            height: 100%;
            position: absolute;
            top: -6px;
            left: -6px;
            border: 1px solid #D3D3D3;
          }
        }
      }
    }
  }
  .section_two{
    width: 70%;
    padding: 40px 0 50px 0;
    min-height: 339px;
    margin: 0 auto;
    .classify{
      position: relative;
      font-size: 14px;
      color:#CCCEDB;
      margin-bottom: 40px;
      a{
        color:#CCCEDB;
      }
      .select{
        a{
          color: @main_color;
        }
      }
      .select_wrapper{
        
        position: absolute;
        top: 0;
        right:0;
        span{
          padding: 2px 4px;
          background: #CCCEDB;
        }
        .select{
           background:@main_color;
        }
        a{
          color: #FFF;
          font-size: 15px;
          font-weight: bold;
        }
      }
    }
    .content_warpper{
      margin: 0 auto;
      text-align: center;
      position: relative;
      ul{
        font-size: 0;
        &.fade-enter-active,&.fade-leave-active{
          transition: all 0.7s ease-in-out;
          position: absolute;
        }
        &.fade-enter-to,&.fade-leave{
          transform: scale(1,1);
          opacity: 1;
        }
        &.fade-enter,&.fade-leave-to{
          transform: scale(0,0);
          opacity: 0;
        }
        &.second{
          position: absolute;
          top: 0px;
          left: 10px;
        }
        li{
          display: inline-block;
          margin-right: @shop_item_GPA;
          &:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }
  .section_three{
    img{
      display: block;
      width: 100%;
      height: 310px;
    }
  }
  .section_four{
    padding: 40px 0 40px 0;
    background: #F5F5F5;
    .wrapper{
      width: 70%;
      margin: 0 auto;
      
    }
    .classify{
      position: relative;
      font-size: 14px;
      color:#CCCEDB;
      margin-bottom: 40px;
      a{
        color:#CCCEDB;
      }
      .select{
        a{
          color: @main_color;
        }
      }
      .more{
        position: absolute;
        top: 0;
        right: 0;
        background: #EE8484;
        font-size: 13px;
        padding: 5px 6px;
        border-radius: 2px;
        &:active{
          background: @main_color; 
        }
        a{
          display: block;
          color: #FFF;
          i{
            font-weight: bold;
          }
        }
        
      }
    }
    .content_warpper{
      text-align: center;
      ul{
        display: block;
        li{
          display: inline-block;
          margin-right: @shop_item_GPA;
          &:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>