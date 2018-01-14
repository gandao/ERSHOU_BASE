<template>
  <div id="user_center">
      <div class="wrapper">
          <div class="bigImage">
              <span class="title">
                  <div class="name">ERSHOU PERSONAL CENTER</div>
                  <div class="date"><i class="el-icon-date"></i>2016-9-12</div>
              </span>
          </div>
          <div class="content">
              <div class="left">
                  <div class="img_wrappre">
                    <img src="./QM387nh7As_thumb_1437790672318.jpg"/>
                    <div class="name">用户2313</div>
                  </div>
                <ul class="menu">
                    <li :class="{'selected': selected[0] === true}" @click.stop.prevent="Menu_selected(0)"><router-link to="./my_goods"><i class="el-icon-goods"></i>我的商品</router-link></li>
                    <li :class="{'selected': selected[1] === true}" @click.stop.prevent="Menu_selected(1)"><router-link to="./add_goods"><i class="el-icon-edit-outline"></i>发布商品</router-link></li>
                    <li :class="{'selected': selected[2] === true}" @click.stop.prevent="Menu_selected(2)"><router-link to="./user_information"><i class="el-icon-date"></i>个人信息</router-link></li>
                    <li :class="{'selected': selected[3] === true}" @click.stop.prevent="Menu_selected(3)"><router-link to="./my_message"><i class="el-icon-goods"></i>我的留言</router-link></li>
                    <li :class="{'selected': selected[4] === true}" @click.stop.prevent="Menu_selected(4)"><router-link to="./save"><i class="el-icon-star-on"></i>我的收藏</router-link></li>
                    <li :class="{'selected': selected[5] === true}" @click.stop.prevent="Menu_selected(5)"><router-link to="./user_feedback"><i class="el-icon-document"></i>意见反馈</router-link></li>
                    <li @click.stop.prevent="log_out"><a href="#"><i class="el-icon-back"></i>退出</a></li> 
                </ul>
              </div>
              <div class="right">
                  <div class="position">
                      当前位置：<span><a href="#">首页</a></span> <i class="el-icon-arrow-right"></i> <span><a href="#">个人中心</a></span> <i class="el-icon-arrow-right"></i> <span><a href="#">个人信息</a></span>
                  </div>
                  <div class="content1">
                      <router-view></router-view>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    props: ["datas"],
    data() {
        return {
            selected: [false,false,false,false,false,false]
        }
    },
    methods: {
        Menu_selected(key) {
            for (let i = 0; i < this.selected.length; i++) {
                // console.log(this.selected[i])
                this.selected[i] = false
            }
            this.selected[key] = true
        },
        log_out() {
            this.$router.push({ path: '../main1' })
            this.datas.router_main = 0
            this.datas.is_logIn = false
        }   
    },
    created() {
        this.datas.router_main = 2
    }
}
</script>

<style lang="less"  type="text/less">
@import "../../common/less/index";
#user_center{
    height: 100%;
    .wrapper{
        height: 100%;
        display: flex;
        flex-direction: column;
        .bigImage{
            flex: 0 0 250px;
            background: url("./2.jpg") no-repeat;
            position: relative;
            .title{
                position: absolute;
                bottom: 6px;
                left: 27%;
                color: #fff;
                .name{
                    font-size: 1.48em;
                    letter-spacing: 1px;
                    margin-bottom: 18px;
                }
                .date{
                    font-size: 0.74em;
                    i{
                        margin-right: 8px;
                    }
                }
            }
        }

    }
    .content{
        flex: 1;
        width: 75%;
        margin: 0 auto;
        .left{
            position: relative;
            display: inline-block;
            margin-right: 30px;
            width: 140px;
            top: -65px;
            .img_wrappre{
                padding: 25px 10px;
                padding-bottom: 9px;
                text-align: center;
                background: rgba(255,255,255,0.2);
                img{
                    margin:0 auto;
                    display: block;
                    border-radius: 350px;
                    width: 70px;
                    height: 70px;
                }
                .name{
                    margin-top: 8px;
                    font-size: 0.8em;
                    color: @main_color;
                    font-weight: bold;
                }
            }
            .menu{
                background: @main_color;
                li{
                    line-height: 28px;
                    &:hover{
                       background:#EF9291;
                    }
                    &.selected{
                       background:#EF9291;
                    }
                }
                a{
                    
                    color: #FFF;
                    font-size: 0.83em;
                    &:hover{
                       background:#EF9291;
                    }
                }
                i{
                    margin-left: 20px;
                    margin-right: 15px;
                }
            }
        }
        .right{
            vertical-align: top;
            display: inline-block;
            width: 70%;
            .position{
                width: 110%;
                margin-top: 10px;
                font-size: 0.65em;
                border-bottom: 1px solid @main_color;
                padding-bottom: 8px;
                margin-bottom: 15px;
            }
            .content1{
                margin-left: 20px;
                width: 100%;
            }
        }
    }
}
</style>