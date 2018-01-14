<template>
  <div id="shop_detail">
       <div class="where_wrapper">
          <span>首页</span> <i class="el-icon-arrow-right"> </i><span>商品详情</span>
      </div>
      <a @click.native="test" href="#"></a>
      <div class="title_wrapper">
        <span class="line"></span>
        <span class="text">
          <div class="p1">商品参数</div>
          <div class="p2">PRODUCT</div>
        </span>
        <span class="line"></span>
      </div>
      <div class="content">
        <div class="wrapper">
          <div class="img_wrappre">
            <div class="big_img">
              <img :src=goods.imageUrls[imge_index] />
            </div>
            <ul>
              <li :key="index" :class="{'select': select[index]}" v-for="(item,index) in goods.imageUrls" @click.stop.prevent=img_click(index)><a href="#"><img :src=item /></a></li>
            </ul>
            <div class="other_message">
              <span class="data">发布于: {{goods.uploadTime}}</span>
              <span class="like_count">{{goods.collecterCount}} 次收藏</span>
            </div>
          </div>
          <div class="detail_wrappre">
            <div class="name">{{goods.name}}</div>
            <div class="text_wrapper"><span class="title">价格</span><span class="new">￥ {{goods.price}}</span></div>
            <div class="text_wrapper"><span class="title">原价</span><span class="old">￥ {{goods.originalPrice}}</span></div>
            <div class="text_wrapper"><span class="title">卖家</span><span class="second">{{goods.ownerName}}</span></div>
            <div class="text_wrapper"><span class="title">交易地点</span><span class="second">{{goods.address}}</span></div>
            <div class="text_wrapper"><span class="title">交易方式</span><span class="second">在线交易/线下交易</span></div>
            <div class="goods_detail">
              <div>宝贝描述</div>
              <p>{{goods.introduction}}</p>
            </div>
            <div class="contact_like">
              <span @click.stop.prevent="is_contact_wrapper_fun1" class="contact"><a href="#"><i class="el-icon-mobile-phone
"></i>联系方式</a></span>
              <span class="like" @click.stop.prevent='add_save'><a href="#"><i class="el-icon-star-on"></i>想要</a></span>
            </div>
          </div>
        </div>
      </div>
      <div class="title_wrapper">
        <span class="line"></span>
        <span class="text">
          <div class="p1">买家留言</div>
          <div class="p2">MESSAGE</div>
        </span>
        <span class="line"></span>
      </div>
      <div class="message">
        <div class="wrapper">
          <textarea v-model="user_message"></textarea>
        </div>
        <span class="btn" @click.stop.prevent="submit"><a href="#">提交</a></span>
      </div>
      <div class="section_two">
        <div class="classify">
          <span class="select">其他推荐</span>
          <div class="select_wrapper">
            <span class="select"><a href="#"><i class="el-icon-arrow-left"></i></a></span>
            <span><a href="#"><i class="el-icon-arrow-right"></i></a></span>
          </div>
        </div>
        <div class="content_warpper">
          <ul>
            <li  @click=reload><shop-item :item_data='other_recommend[0]' :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: other_recommend[0].id}}"><img :src=other_recommend[0].imageUrl /></router-link></div></shop-item></li>
            <li><shop-item :item_data='other_recommend[1]' :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: other_recommend[1].id}}"><img :src=other_recommend[1].imageUrl /></router-link></div></shop-item></li>
            <li ><shop-item :item_data='other_recommend[2]' :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: other_recommend[2].id}}"><img :src=other_recommend[2].imageUrl /></router-link></div></shop-item></li>
            <li ><shop-item :item_data='other_recommend[3]' :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: other_recommend[3].id}}"><img :src=other_recommend[3].imageUrl /></router-link></div></shop-item></li>
          </ul>
        </div>
      </div>
    <transition name="fade">
      <div class="contact_wrapper" v-if="is_contact_wrapper">
        <div class="title">联系方式<span  class="colse"><a @click.stop.prevent="is_contact_wrapper_fun" href="#"><i class="el-icon-close"></i></a></span></div>
        <div class="detail">
          <div><span class="first">手机号:</span><span class="second">{{goods.contacts[2].contact}}</span></div>
          <div><span class="first">QQ号:</span><span class="second">{{goods.contacts[1].contact}}</span></div>
          <div><span class="first">微信号:</span><span class="second">{{goods.contacts[0].contact}}</span></div>
        </div>
      </div> 
    </transition>
     <transition name="fade"> 
        <div class="prompt" v-if="prompt_show">
                <span class="wrapper"  v-if="prompt_show">
                    <div class="title2">提示</div>
                    <div class="content2">
                        {{prompt_str}}
                        <div class="btn1">
                            <span @click.stop.prevent="prompt_show = false"><a href="#">确定</a></span>
                        </div>
                    </div>
                </span>
        </div>
    </transition> 
    <div class="cover"  v-if="is_contact_wrapper"></div>
  </div>
</template>

<script>
import shop_item from "../shop_item/shop_detail"
export default {
  props: ["datas"],
  created() {
    this.datas.router_main = 1
    let that = this
    that.$http.get("http://localhost:8080/unusedgoods/goods_detail?id=" + that.$route.query.id).then(function (successData) {
        that.$nextTick(() => {
            that.goods = successData.data
            console.log(that.goods)
        })
      },(fileData) => { console.log(fileData)})
      that.$http.get("http://localhost:8080/unusedgoods/goods_recommend?id=" + that.$route.query.id).then(function (successData) {
        that.$nextTick(() => {
            that.other_recommend = successData.data
        })
      },(fileData) => { console.log(fileData)})
  },
  data() {
    return {
     "is_contact_wrapper": false,
     goods: {},
     other_recommend: [],
     select: [true,false,false,false],
     prompt_show: false,
     prompt_str: '',
     user_message: "",
     imge_index: 0
    }
  },
  methods: {
    is_contact_wrapper_fun() {
      this.is_contact_wrapper = false
      return false
    },
    is_contact_wrapper_fun1() {
      this.is_contact_wrapper = true
      return false
    },
    submit() {
      if (this.datas.is_logIn) {
        if (this.user_message !== '') {
            let option = {}
            let data = {}
            let that = this
            data.id = this.goods.ownerId
            data.content = this.user_message
            option.data = data
            option.method = "put"
            option.url = '/unusedgoods/add_userdlg'
            that.$http(option).then(function (successData) {
              if (successData.data.id === 1) {
                that.prompt_str = '提交成功'
              }
              else {
                that.prompt_str = '后台可能出现了错误'
              }
              that.prompt_show = true
            },(fileData) => { console.log(fileData)})
        }
        else {
          this.prompt_str = '请先输入留言信息'
          this.prompt_show = true
        }
      }
      else {
        this.prompt_str = '请您先登录'
        this.prompt_show = true
      }
    },
    init_data() {
      let that = this
      that.$http.get("http://localhost:8080/unusedgoods/goods_detail?id=" + that.$route.query.id).then(function (successData) {
        that.$nextTick(() => {
            that.goods = successData.data
        })
      },(fileData) => { console.log(fileData)})
      that.$http.get("http://localhost:8080/unusedgoods/goods_recommend?id=" + that.$route.query.id).then(function (successData) {
        that.$nextTick(() => {
            that.other_recommend = successData.data
        })
      },(fileData) => { console.log(fileData)})
    },
    add_save() {
      if (this.datas.is_logIn) {
        let option = {}
        let that = this
        option.method = 'get'
        option.url = '/unusedgoods/add_save?id=' + that.$route.query.id
        that.$http(option).then(function (successData) {
            if (successData.data.id === 1) {
              that.prompt_str = '收藏成功'
            }
            else {
              that.prompt_str = '后台可能出现了错误'
            }
            that.prompt_show = true
      },(fileData) => { console.log(fileData)})
      }
      else {
        this.prompt_str = '请您先登录'
        this.prompt_show = true
      }
    },
    img_click(index) {
      for (let i = 0; i < this.select.length; i++) {
        this.select[i] = false
      }
      this.select[index] = true
      this.imge_index = index
    },
    reload() {
      this.$root.reload()
    }
  },
  components: {
    "shopItem": shop_item
  },
  watch: {
    '$route': 'init_data'
  }

}
</script>

<style lang="less"  type="text/less">
@import "../../common/less/index";
#shop_detail{
  position: relative;
  .where_wrapper{
      padding: 11px 0;
      background: @main_color;
      font-size: 10px;
      font-weight: bold;
      color: #FFF;
      span:first-child{
          margin-left: 150px;
      }
  }
  .title_wrapper{
    padding: 40px 0 30px 0;
    display: flex;
    width: 70%;
    margin: 0 auto; 
    .line{
      flex: 1;
      height: 1px;
      background: @main_color;
      display: block;
      margin: auto 0;
    }
    .text{
      text-align: center;
      flex: 0 0 130px;
      color: @main_color;
      .p1{
        font-size: 23px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .p2{
        font-size: 11px;
      }
    }
  }
  .content{
    width: 70%;
    margin: 0 auto;
    min-height: 400px;
    border: 1px solid @main_color;
    .wrapper{
      display: flex;
      margin: 20px 20px;
      .img_wrappre{
        position: relative;
        flex: 0 0 370px;
        font-size: 0;
        margin-top: 30px;
        .big_img{
          padding: 5px 4px;
          border: 1px solid  @main_color;
          display: inline-block;
          img{
            display: block;
            width: 270px;
            height: 350px;
          }
        }
        ul{
          display: inline-block;
          vertical-align: top; 
          li{
            width: 61px;
            height: 80px;
            margin-left: 10px;
            margin-bottom: 10px;
            padding: 3px 2px;
            &:last-child{
            margin-bottom: 0;              
            }
            &.select{
              border: 1px solid @main_color;
              width: 60px;
              height: 79px;
              img{
                width: 60px;
                height: 79px;
              }
            }
            a{
              display: block;
              img{
                display: block;
                width: 61px;
                height: 80px;
              }
            }
          }
        }
        .other_message{
          position: absolute;
          top: -22px;
          left: 1px;
          span{
            font-size: 12px;
            color: #CCCEDB;
          }
          .data{
            margin-right: 20px;
          }
        }
      }
      .detail_wrappre{
        position: relative;
        flex: 1;
        margin-left: 20px;
        .name{
          font-size: 24px;
          font-weight: bold;
          color: @main_color; 
          border-bottom: 1px solid @main_color;
          padding-bottom: 8px;
          margin-bottom: 30px;
        }
        .text_wrapper{
          margin-bottom: 21px;
          &:last-child{
            margin-bottom: 0;
          }
          .title{
            display: inline-block;
            min-width: 100px;
            font-size: 15px;
            color: #B6B5B5;
          }
          .new{
            font-size: 20px;
            color: @main_color;
            font-weight: bold;
          }
          .old{
            font-size: 15px;
            color: @main_color;
            text-decoration: line-through;
            // font-weight: bold;
          }
          .second{
            font-size: 14px;
            color: @main_color;
          }
          
        }
        .goods_detail{
            div{
              font-size: 14px;
              color: #B6B5B5;
              margin-bottom: 10px;
            }
            p{
              font-size: 13px;
              line-height: 19px;
              letter-spacing: 1px;
              text-indent: 28px;
              color: @main_color;    
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 4;
              overflow: hidden;
            }
        }
        .contact_like{
          position: absolute;
          bottom: 0;
          right: 15px;
          .contact{
            margin-right: 20px;
          }
          .like,.contact{
            padding: 7px 12px 7px 10px;
            background: @main_color;
            border-radius: 2px;
            display: inline-block;
            &:active{
              background: #EE8484;
            }
            a{
              display: block;
              color: #FFF;
              font-size: 12px;
              text-align: center;
              i{
                margin-right: 3px;
              }
            }
          }
        }
      }
    }

  }
  .message{
    width: 70%;
    position: relative;
    margin: 0 auto;
    padding-bottom: 40px;
    // margin-bottom: 30px;
    .wrapper{
      min-height: 150px;
      border: 1px solid @main_color;
     
      textarea{
        color: #9E9CA1;
        display: block;
        font-size: 18px;
        letter-spacing: 1px;
        line-height: 20px;
        border: none;
        width: 90%;
        margin: auto;
        margin-top: 12px;
        height: 120px;
        outline:none;
        resize:none;
        overflow:hidden; 
        // &:foucde
      }
    }
    .btn{
      a{
         display: inline-block;
         color: #FFF;
         line-height: 25px;
         font-size: 12px;
         width: 45px;
         text-align: center;
         &:active{
          background: #EE8484;
         }
      }
      position: absolute;
      bottom: 0;
      right: 1px;
      background: @main_color;
      // padding: 5px 10px;
     
      border-radius: 2px;
    }
  }
  .section_two{
    width: 70%;
    padding: 40px 0 50px 0;
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
        color: @main_color;
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
    .content_warpper {
      margin: 0 auto;
      text-align: center;
      ul{
        display: inline-block;
        text-align: center;
        font-size: 0;
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
  .contact_wrapper{
    position: fixed;
    z-index: 999;
    width: 260px;
    border-radius: 2px;
    top: 39%;
    left:43%;
    border: 2px solid @main_color;
    background: #FFF;
    box-shadow: 1px 1px 50px rgba(0,0,0,.1);
    &.fade-enter-active,&.fade-leave-active{
      transition: all 0.28s ease-in-out;
    }
    &.fade-enter-to,&.fade-leave{
      transform: scale(1,1)
    }
		&.fade-enter,&.fade-leave-to{
      transform: scale(0,0)
    }
    .title{
      padding: 10px 0;
      text-align: center;
      background: @main_color;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      .colse{
        position: absolute;
        background: #fff;
        top: -12px;
        right: -12px;
        display: inline-block;
        width: 26px;
        height: 26px;
        border: 2px solid @main_color;
        border-radius: 14px;
        &:hover{
          border: 2px solid #EE8484;
          i{
            color: #EE8484;
          }
        }
        i{
          color: @main_color;
          text-align: center;
          line-height: 28px;
          font-size: 15px;
          font-weight: bold;
        }
      }
    }
    .detail{
      position: relative;
      padding: 30px 0;
      width: 70%;
      margin: 0 auto;
      div{
        margin-bottom: 18px;
        &:last-child{
          margin-bottom: 0px;
        }
        .first{
          display: inline-block;
          font-size: 14px;
          color: #B6B5B5;
          width: 60px;
        }
        .second{
          font-size: 16px;
          color: @main_color;
        }
        // text-align: center;
      }
    }
    
  }
  .cover{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    // z-index: 1000;
  }
  .prompt{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        &.fade-enter-active,&.fade-leave-active{
            transition: all 0.28s ease-in-out;
        }
        &.fade-enter-to,&.fade-leave{
            transform: scale(1,1)
        }
        &.fade-enter,&.fade-leave-to{
            transform: scale(0,0)
        } 
        .wrapper{  
            width: 250px;
            height: 200px;
            position: absolute;
            top: 40%;
            left: 43%;
            .title2{
                line-height: 30px;
                color: #fff;
                font-size: 0.9em;
                font-weight: bold;
                letter-spacing: 1px;
                background: @main_color;
                border-radius: 5px 5px 0 0 ;
                text-align: center;
            }
            .content2{
                background: #FFF;
                padding: 10px 5px;
                border: 2px solid @main_color;
                padding-top: 25px;
                text-align: center;
                color: @main_color;
                .btn1{
                    margin-top: 10px;
                    color: #FFF;
                    text-align: right;
                    span{   
                        padding: 5px 10px;
                        display: inline-block;
                        border-radius: 3px;
                        font-size: 0.8em;
                        box-sizing: border-box;
                        &:first-child{
                            background: @main_color;
                            border: 1px solid @main_color;
                            margin-right: 12px;
                            a{
                                 color: #fff;
                            }
                            &:hover{
                               background:#e13946;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>