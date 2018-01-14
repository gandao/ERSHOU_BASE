<template>
  <div id="header">
    <div class="header-warapper" >
      <div class="img-wrapper" @click.stop.prevent="main_pager"><a href="#"><img src="./logo.png"></a><span>ERSHOU</span></div>
      <div class="main_page" @click.stop.prevent="main_pager"><a href="#"><span class="{'is_main_page': false}">首页</span></a></div>
      <div class="search-wrappre"><input v-model="search_content" type="text" ><a href="#"><span @click.stop.prevent="search"><i class="el-icon-search
"></i></span></a></div>
      <div v-if="datas.is_logIn" class="user_wrappre" @click="show = !show" >
        <a href="#">
          <span class="img-wrapper">
            <img :src= datas.user.url />
          </span>
          <span class="user_name">
              {{datas.user.value}}
          </span>
        </a>
        <el-collapse-transition>
          <div v-show="show" class="menu-wrappre">
            <ul>
              <li @click.stop.prevent="router_change('my_goods')"><a href="#"><i class="el-icon-goods"></i>我的商品</a></li>
              <li @click.stop.prevent="router_change('add_goods')"><a href="#"><i class="el-icon-edit-outline
"></i>发布商品</a></li>
              <li @click.stop.prevent="router_change('user_information')"><a href="#"><i class="el-icon-date"></i>个人信息</a></li>
              <li @click.stop.prevent="router_change('my_message')"><a href="#"><i class="el-icon-goods"></i>我的留言</a></li>
              <li @click.stop.prevent="router_change('save')"><a href="#"><i class="el-icon-star-on"></i>我的收藏</a></li>
              <li @click.stop.prevent="router_change('user_feedback')"><a href="#"><i class="el-icon-document"></i>意见反馈</a></li>
              <li @click.stop.prevent="log_out"><a href="#"><i class="el-icon-back"></i>退出</a></li>    
            </ul>
          </div>
        </el-collapse-transition>
      </div>
      <div  v-else class="login" @click.stop.prevent="log"><router-link to="../logIn">登录/注册</router-link></div>
    </div>
    <transition name="fade"> 
        <div class="prompt" v-if="prompt_show">
                <span class="wrapper_1"  v-if="prompt_show">
                    <div class="title2">提示</div>
                    <div class="content2">
                        请输入搜索内容
                        <div class="btn1">
                            <span @click.stop.prevent="prompt_show = false"><a href="#">确定</a></span>
                        </div>
                    </div>
                </span>
        </div>
    </transition> 
  </div>
</template>
<script>
import event_transfer from "../../common/js/event_transfer.js"
export default {
  props: ["datas"],
  data() {
    return {
      show: false,
      search_content: '',
      prompt_show: false
    } 
  },
  methods: {
    log() {
      return false
    },
    search() {
      this.search_content = this.search_content.replace(/(^\s*)|(\s*$)/g, "")
      if (this.search_content === '') {
        this.prompt_show = true
      }
      else {
        this.datas.search_content = this.search_content
        if (this.datas.router_main === 1)
        {
          this.$router.push({ path: './shop_list' })
        } 
        else if (this.datas.router_main === 0) {
          this.$router.push({ path: './shop_list' })
        }
        else this.$router.push({ path: './../shop_list' })
        this.datas.router_main = 1
        event_transfer.$emit("search")
      }
    },
    main_pager() {
      if (this.datas.router_main === 1)
      {
        this.$router.push({ path: './main1' })
      } 
      else if (this.datas.router_main === 0) {
        this.$router.push({ path: './main1' })
      }
      else this.$router.push({ path: './../main1' })
      this.datas.router_main = 0
    },
    log_out() {
      let that = this
      let option = {}
      option.method = 'get'
      option.url = "/unusedgoods/out"
      this.$http(option).then(function (successData) {
        console.log(successData.data)
      },(fileData) => { console.log(fileData)}
    )
      if (this.datas.router_main === 1)
      {
        this.$router.push({ path: './main1' })
      } 
      else if (this.datas.router_main === 0) {
        this.$router.push({ path: './main1' })
      }
      else this.$router.push({ path: '../main1' })
      this.datas.router_main = 0
      this.datas.is_logIn = false
    },
    router_change(path) {
      if (this.datas.router_main === 1)
      {
        this.$router.push({ path: './user_center/' + path })
      } 
      else if (this.datas.router_main === 0) {
        this.$router.push({ path: './user_center/' + path })
      }
      else this.$router.push({ path: './' + path })
      this.datas.router_main = 2
      this.show = false
    }
   
  },
  created() {
     this.datas.router_main = 1
        let option = {}
        let url = '/unusedgoods/user_islogin'
        let that = this
   
        option.url = url
        option.method = "GET"
        if (that.datas.is_logIn === true) return
        that.$http(option)
        .then((response) => {
             that.$nextTick(() => {
                if (response.data.id !== -1) {
                    that.datas.user = response.data
                    that.datas.is_logIn = true
                }
                else {
                    if (that.datas.router_main === 1) {
                      that.datas.router_main = 0
                      that.$router.push({ path: './main1' })
                    }
                    else if (that.datas.router_main === 2) {
                      that.datas.router_main = 0
                      that.$router.push({ path: './../main1' })
                    }
                }
			})
        },function() {
          if (that.datas.router_main === 1) {
            that.datas.router_main = 0
            that.$router.push({ path: './main1' })
          }
          else if (that.datas.router_main === 2) {
            that.datas.router_main = 0
            that.$router.push({ path: './../main1' })
          }
        }
        )
  }
}
</script>
<style lang="less"  type="text/less">
@import "../../common/less/index";
@height: 53px;
#header{
  background: #FFF;
  height: @height;
  font-size: 0;
  .header-warapper>div{
    display: inline-block;
  }
  .header-warapper{
    display: flex;
    width: 70%;
    margin: 0 auto;
    text-align: center;
    .img-wrapper{
      flex: 0 0 80px;
      a{
        display: block;
      }
      span{
        display: block;
        font-size: 10px;
        color: @main_color;
        font-weight: bold;
        margin-top: 3px;
      }
      img{
        margin: 0 auto;
        display: block;
        width: 35px;
        height: 35px;
      }
    }
    .main_page{
      flex: 0 0 120px;
      font-size: 16px;
      line-height: @height;
      // color: @main_color;
      span{
         color: @main_color;
      }
      .is_main_page{
        line-height: 48px;
        box-sizing: border-box;
        display: inline-block;
        font-weight: bold;
        padding: 0 3px;
        border-bottom: 2px solid @main_color;
      }
    }
    .search-wrappre{
      flex: 3;
      margin: auto  0;
      input{
        display: inline-block;
        font-size: 13px;
        width: 70%;
        outline: none;
        height: 22px;  
        border: 1px solid @main_color;
        vertical-align: middle;
        text-indent: 15px;
        color:@main_color;
        // vertical-align: top;
        &:focus{
          color:@main_color;
          }
      }
      a{
        margin-left: 10px;
        display: inline-block; 
        vertical-align: middle;
        span{
          display: block;
          font-size: 18px;
          background: @main_color;
          text-align: center;
          padding: 4px 9px;
          border-radius: 1px;
          &:active{
            background: #EF9191;
          }
          i{
            color: #fff;
          }
        }
      }
    }
    .user_wrappre{
      position: relative;
      flex: 1.8;
      line-height: @height;
      &:hover{
        .menu-wrappre{
          visibility: visible;
        }
        
      }
      a{
        display: block;
      }
      .img-wrapper{
        line-height: 44px;
        text-align: left;
        display: inline-block;
        margin: auto 0;
        border-radius: 22px;
        box-shadow: 1px 1px #F1F1F1, -1px -1px #F1F1F1;
        text-align: center;
        border: 1px solid @main_color;
        width: 44px;
        height: 44px;
        vertical-align: middle;
        img{
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          vertical-align: middle;
        }
      }
      .user_name{
        display: inline-block;
        line-height: @height;
        vertical-align: top;
        color: @main_color;
        font-size: 14px;
        font-weight: bold;
        margin-left: 10px;
      }
      .menu-wrappre{
        z-index: 999;
        position: absolute;
        top: @height;
        left: 75px;
        text-align: left;
        background-color: @main_color;
        
        a{
          line-height: 25px;
          display: block;
          color: #fff;
          font-size: 11px;
          i{
            font-size: 14px;
            margin-right: 10px;
          }
        }
        li{
          letter-spacing: 2px;
           padding: 0 30px 0 10px;
        }
        li:hover{
          background: #EF9291;
        }
        
      }
    }
    .login{
      flex: 1.8;
      a{
        color: @main_color;
      }
      line-height: @height;
      font-size: 17px;
    }
  }
  .prompt{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        font-size: 17px;
        &.fade-enter-active,&.fade-leave-active{
            transition: all 0.28s ease-in-out;
        }
        &.fade-enter-to,&.fade-leave{
            transform: scale(1,1)
        }
        &.fade-enter,&.fade-leave-to{
            transform: scale(0,0)
        } 
        .wrapper_1{  
            width: 250px;
            height: 200px;
            position: absolute;
            top: 33%;
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
