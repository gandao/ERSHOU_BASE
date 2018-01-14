<template>
  <div id="user_feedback">
      <div class="title">意见反馈</div>
      <div class="message">
        <div class="wrapper">
          <textarea v-model="user_feedback"></textarea>
        </div>
        <span class="btn" @click.stop.prevent= "confirm_show = true"><a href="#">提交</a></span>
      </div>
      <transition name="fade"> 
        <div class="confirm" v-if="confirm_show">
                <span class="wrapper"  v-if="confirm_show">
                    <div class="title2">是否确定提交！</div>
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
    data() {
        return {
            confirm_show: false,
            prompt_show: false,
            prompt_str: '提交成功',
            user_feedback: ''
        }
    },
    methods: {
        confirm_fun() {
            let that = this
            let option = {}
            option.method = "put"
            option.url = '/user_feedback'
            option.data = {}
            option.data.content = this.user_feedback
            if (this.user_feedback === '') {
                this.prompt_str = '请先输入意见内容'
                this.prompt_show = true
                this.confirm_show = false
            }
            else {
                that.$http(option)
                .then((response) => {
                    this.prompt_str = '提交成功'
                    this.confirm_show = false
                    this.prompt_show = true
                },
                (fileData) => {
                    this.prompt_str = '后台出现了问题正在紧急修复！'
                    this.confirm_show = false
                    this.prompt_show = true
                })
            }
        }
    }
}
</script>

<style lang="less"  type="text/less">
@import "../../common/less/index";
#user_feedback{
    margin-top: 45px;
    margin-bottom: 20px;
  .message{
    width: 80%;
    position: relative;
    padding-bottom: 40px;
    .wrapper{
      min-height: 250px;
      border: 2px solid @main_color;
      textarea{
          min-height: 250px;
        color: #9E9CA1;
        display: block;
        font-size: 18px;
        letter-spacing: 1px;
        line-height: 20px;
        border: none;
        width: 95%;
        margin: auto;
        margin-top: 12px;
        height: 120px;
        outline:none;
        resize:none;
        overflow:hidden; 
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
      border-radius: 2px;
    }
  }
  .title{
      font-size: 16px;
      width:  80%;
      line-height: 35px;
      background: @main_color;
      color: #FFF;
      text-indent: 10px;
      font-weight: bold;
      border-radius: 2px 2px 0 0;
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