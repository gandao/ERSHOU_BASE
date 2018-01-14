<template>
  <div id="my_message">
      <div class="title">
      </div>
      <ul :class="{'no_pager': !pager_show}" class="main_content">
          <li class="talk_item" v-for="(item,index) in user_message" :key="index">
              <ul>
                  <li class="talk_item_item" v-for="(item1,index1) in item.contents" :key="index1">
                      <div class="title1"><span class="roleA">{{item1.roleA}}</span>回复<span class="roleB">{{item1.roleB}}</span><span class="date">{{item1.date}}</span></div>
                      <div class="contents"><p>{{item1.content}}</p></div>
                  </li>
              </ul>
              <div class="btn">
                  <span @click.stop.prevent="response(item.id)"><a href="#">回复</a></span>
                  <span @click.stop.prevent=delete1(item.id)><a href="#">删除</a></span>
              </div>
          </li>
      </ul>
    <div v-if="pager_show" class="pager_wrapper">
        <span class="pager">
            <el-pagination
                @current-change="pager_change"
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                :current-page="page_detail.now"
                :page-count="page_detail.all"
                >
            </el-pagination>
        </span>
    </div>
    <transition name="fade"> 
        <div class="reply" v-if="reply_show">
                <span class="wrapper"  v-if="reply_show">
                    <div class="title">编辑回复</div><div class="content2">
                        <textarea v-model="reply_content"></textarea>
                        <div class="btn">
                            <span @click.stop.prevent="reply_fun"><a href="#">确定</a></span><span @click.stop.prevent="reply_show = false;"><a href="#">取消</a></span>
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
    <transition name="fade"> 
        <div class="confirm" v-if="confirm_show">
                <span class="wrapper"  v-if="confirm_show">
                    <div class="title">确认删除</div>
                    <div class="content2">
                        <div class="btn">
                            <span @click.stop.prevent="confirm_fun"><a href="#">确定</a></span><span @click.stop.prevent="confirm_show = false;"><a href="#">取消</a></span>
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
            pager_show: false,
            selected: false,
            reply_show: false,
            prompt_show: false,
            confirm_show: false,
            user_id: -1,
            prompt_str: '',
            reply_content: '',
            user_message: [],
            page_detail: {}
        }
    },
    methods: {
        Not_read() {
            this.selected = false
        },
        Readed() {
            this.selected = true
        },
        pager_change(val) {
            val--

            let that = this
            let option = {}
            option.method = 'get'
            option.headers = {"Content-Type": "application/json;charset=utf-8"}    
            option.url = '/unusedgoods/user_message?start=' + val
            option.withCredentials = true

            this.$http(option).then(function (successData) {
            that.$nextTick(() => {
                that.user_message = successData.data.list
                that.page_detail.all = successData.data.allPageCount
                that.page_detail.now = successData.data.currentPageCount + 1
            })
            },(fileData) => { console.log(fileData)})
        },
        delete1(id) {
            this.user_id = id
            this.confirm_show = true
        },
        confirm_fun() {
           this.confirm_show = false 
        },
        response(id) {
            this.reply_show = true
            this.user_id = id
        },
        reply_fun() {
            if (this.reply_content === "") {
                this.prompt_str = "请输入回复内容"
                this.prompt_show = true
            }
            // this.reply_show = false
        }

    },
    created() {
        let that = this
        let option = {}
        option.method = 'get'
        option.url = '/unusedgoods/user_message?start=0'
        this.$http(option).then(function (successData) {
        that.$nextTick(() => {
            that.user_message = successData.data.list
            that.page_detail.all = successData.data.allPageCount
            that.page_detail.now = successData.data.currentPageCount + 1
            if (successData.data.allPageCount > 1) {
                that.pager_show = true
            }
            else that.pager_show = false
        })
      },(fileData) => { console.log(fileData)})
    }
}
</script>

<style lang="less"  type="text/less">
@import "../../common/less/index";
#my_message{
    font-size: 0.9em;
    margin-top: 30px;
    .title{
        border-bottom: 1px solid @main_color;
        span{
            font-size: 0.9em;
            a{
                display: inline-block;
                line-height: 28px;
            }
            &:last-child{
                margin-left: 8px;
            }
            &.selected a{
                font-size: 1.07em;
                font-weight: bold;
                color: @main_color;
                border-bottom: 2px solid @main_color;
            }
        }
    }
    .main_content{
        font-size: 0.9em;
        &.no_pager{
            margin-bottom: 40px;
        }
        .talk_item{
            border-bottom: 1px solid @main_color;
            margin-top: 10px;
            padding-bottom: 5px;
            &:last-child{
                border-bottom:none;
                padding-bottom: 0;
            }
            .talk_item_item{
                margin-bottom: 10px;
                position: relative;
                border-bottom: 1px solid #ECECEC;
                padding-bottom: 5px;
                &:last-child{
                    margin-bottom: 10px;
                    border-bottom: none;
                    padding-bottom: 0px;
                }
                
                .title1{
                    color:  rgb(169, 169, 170);
                    margin-bottom: 8px;
                }
                .roleA{
                    color:rgb(97, 93, 93);
                    margin-right: 5px;
                }
                .roleB{
                    color:rgb(97, 93, 93);
                    margin-left: 5px;
                }
                .date{
                    position: absolute;
                    color: rgb(192, 193, 197);
                    top: 0;
                    right: 0;
                    font-size: 0.8em;   
                }
                .contents{
                    text-indent: 20px;
                    font-size: 1.2em;
                    color:  @main_color;
                }
            }
            .btn{
                text-align: right;
                span{
                    &:last-child{
                        margin-left: 5px;  
                    }
                    a{
                        color: @main_color;
                        &:hover{
                            color: #EF9291;
                        }
                    }
                }
            }
            .text{
                text-indent: 1.5em;
                font-size: 1.08em;
                color: #000;
                letter-spacing: 1px;
                line-height: 18px;
            }
        }
    }
    .pager_wrapper{
        margin-top: 20px;
        margin-bottom: 25px;
        text-align: left;
        .pager{
            margin-right: 30px;
            text-align: right;
            li,button,span{
                line-height: 20px;
                height: 20px;
                min-width: 20px;
                color: #6D6D6D;
            }
            button{
                padding: 0;
            }
            .btn-prev{
                margin-right: 10px;
            }
            li:hover,button:hover{
                color: @main_color;
            }
            li{
                &last-child{
                    margin-right: 0;
                }
                text-align: center;
                min-width: 20px;
                margin-right: 10px;
                padding: 0;
                &.active{
                    background: @main_color;
                    color: #fff;
                    
                }  
            }
        }
    }
    .reply{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        &.fade-enter-active,&.fade-leave-active{
            transition: all 0.37s ease-in-out;
        }
        &.fade-enter-to,&.fade-leave{
            transform: scale(1,1)
        }
        &.fade-enter,&.fade-leave-to{
            transform: scale(0,0)
        } 
        .wrapper{  
            width: 300px;
            height: 200px;
            position: absolute;
            top: 30%;
            left: 40%;
            .title{
                border: none;
                line-height: 38px;
                color: #fff;
                font-size: 1.15em;
                font-weight: bold;
                letter-spacing: 4px;
                background: @main_color;
                border-radius: 5px 5px 0 0 ;
                text-align: center;
            }
            .content2{
                background: #FFF;
                padding: 10px 5px;
                border: 2px solid @main_color;
                .btn{
                    margin-bottom: 10px;
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
                            margin-left: 15px;
                            margin-right: 28px;
                            a{
                                 color: @main_color;
                                 
                            }
                            &:hover{
                               background:rgba(225,57,70,0.05);
                            }
                            
                        }
                    }
                }
                textarea{
                    min-height: 100px;
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

      
        }
    }
     .prompt{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
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
            top: 37%;
            left: 43%;
            .title{
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
                .btn{
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
}

</style>