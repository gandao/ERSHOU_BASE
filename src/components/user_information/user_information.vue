<template>
  <div id="user_information">
      <div class="title1">用户详情</div>
     <div class="user_img">
         <span class="title">头像</span>
         <img :src="user.headImageUrl"/>
         <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
     </div>
     <div class="name">
         <span class="title">昵称</span>
         <input v-model="user.nickname" type="text" />
     </div>
     <div class="qq">
         <span class="title">QQ</span>
         <input v-model="user.qq" type="number" />
     </div>
     <div class="tel">
         <span class="title">TEL</span>
         <input v-model="user.phone" type="number" />
     </div>
     <div class="wechart">
         <span class="title">微信</span>
         <input v-model="user.weixin" type="text" />
     </div>
     <div class="btn" @click.stop.prevent="Submit">
         <span><a href="#">保存修改</a></span>
     </div>
     <transition name="fade"> 
        <div class="confirm" v-if="confirm_show">
                <span class="wrapper"  v-if="confirm_show">
                    <div class="title2">是否确定修改！</div>
                    <div class="content2">
                        <div class="btn1">
                            <span @click.stop.prevent="confirm_fun"><a href="#">确定</a></span><span @click.stop.prevent="confirm_show = false;"><a href="#">取消</a></span>
                        </div>
                    </div>
                </span>
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
  </div>
</template>

<script>
export default {
    props: {
    },
    data() {
        return {
            confirm_show: false,
            prompt_show: false,
            prompt_str: '',
            user: {}
        }
    },
    methods: {
        Submit() {
            this.confirm_show = true
        },
        confirm_fun() {
            this.confirm_show = false
        }
    },
    created() {
        let that = this
        let option = {}
        option.method = 'get'
        option.headers = {"Content-Type": "application/json;charset=utf-8"}    
        option.url = '/unusedgoods/user_detail'
        option.withCredentials = true
        this.$http(option).then(function (successData) {
        that.$nextTick(() => {
            if (successData.data.id === -1) {
                alert("后台出现了问题")
            }
            else that.user = successData.data
        })
      },(fileData) => { console.log(fileData)})
    }
}
</script>

<style lang="less"  type="text/less">
@import "../../common/less/index";
#user_information{
    margin-top: 80px;
    position: relative;
    width: 80%;
    border: 2px solid @main_color;
    box-sizing: border-box;
    padding: 30px 25px;
    font-size: 0.86em;
    margin-bottom: 30px;
    .title1{
        position: absolute;
        top: -35px;
        line-height: 35px;
        background: @main_color;
        border: 1px solid @main_color;
        left: -2px;
        right: -2px;
        text-indent: 10px;
        color: #FFF;
        font-weight: bold;
        font-size: 16px;
        border-radius: 2px 2px 0 0 ;
    }
    .title{
        display: inline-block;
        width: 60px;
    }
    .user_img{
        margin-bottom: 10px;
        .title{
            line-height: 60px;
            vertical-align: top;
        }
        img{
            padding: 2px;
            border: 1px solid @main_color;
            display: inline-block;
            width: 60px;
            height: 60px;
            box-sizing: border-box;
        }
        .img_btn{
            margin-left: 20px;
            a{
                color: @main_color; 
                font-size: 0.8em;
                padding: 3px 6px;
                border: 1px solid @main_color;
                border-radius: 3px;
                vertical-align: top;
                line-height: 60px;
                i{
                    vertical-align: top;
                    line-height: 60px;
                }
            }
            
        }
        .avatar-uploader{
            display: inline-block;
            margin-left: 20px;
        }
        .avatar-uploader .el-upload {
            width:57px;
            height: 57px;
            border: 1px dashed @main_color;
            border-radius: 2px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: @main_color;
        }
        .avatar-uploader-icon {
            font-size: 15px;
            color:  @main_color;
            width:57px;
            height: 57px;
            line-height: 57px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
    .name,.qq,.tel,.wechart{
        margin-bottom: 15px;
    }
    input{
        width: 52%;
        outline: none;
        height: 20px;  
        width: 45%;
        border-radius: 2px;
        vertical-align: middle;
        text-indent: 10px;
        font-size: 0.9em;
        color:@main_color;
        letter-spacing: 1px;
        border: 1px solid @main_color;
        &:focus{
        color:@main_color;
        }
        &::-webkit-outer-spin-button,  
        &::-webkit-inner-spin-button{  
        -webkit-appearance: none !important;  
        margin: 0;  
        }  
    }
    .btn{
        margin-top: 20px;

        span{
            margin-left: 65px;
            background: @main_color;
            padding: 3px 7px;
            border-radius: 2px;
            a{
                font-size: 0.8em;
                color: #FFF;
            }

        }
        
    }
    .confirm{
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
                padding-top: 35px;
                .btn1{
                    margin-bottom: 10px;
                    text-align: center;
                    span{   
                        padding: 5px 10px;
                        display: inline-block;
                        border-radius: 3px;
                        font-size: 0.9em;
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
                        &:last-child{
                            color: @main_color;
                            border: 1px solid @main_color;
                            margin-left: 12px;
                            
                            a{
                                 color: @main_color;
                                 
                            }
                            &:hover{
                               background:rgba(225,57,70,0.05);
                            }
                            
                        }
                    }
                }
            }

      
        }
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