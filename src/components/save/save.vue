<template>
  <div id="save">
    <div class="wrapper">
        <div class="title_1">
          <span :class="{'selected': selected === false}" @click.stop.prevent="sell"><a href="#">在热卖的</a></span>
          <span :class="{'selected': selected === true}" @click.stop.prevent="up_sell"><a href="#">已下架的</a></span>
        </div>
        <ul :class="{'no_pager': !pager_show}">
            <li :class="{'no_margin_right': index>0 && (index+1)%4 === 0}" v-for="(item,index) in user_goods" :key = "index">
                <div class="item_wrappre">
                    <img :src="user_goods[index].imageUrl" />
                    <div class="name">{{user_goods[index].name}}</div>
                    <div class="price">
                       <span class="new">￥{{user_goods[index].price}}</span><span class="old">￥{{user_goods[index].originalPrice}}</span>
                    </div>
                    <div v-if="selected" class="conver">
                        <span class="title">
                            已下架
                        </span>
                    </div>
                </div>
                <div class="btn1" @click.stop.prevent="Delete(user_goods[index].id)">
                        <a href="#"><i class="el-icon-delete"></i>删除</a>
                </div>
            </li> 
        </ul>
    </div>
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
        <div class="confirm" v-if="confirm_show">
                <span class="wrapper"  v-if="confirm_show">
                    <div class="title">是否取消收藏！</div>
                    <div class="content2">
                        <div class="btn">
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
    methods: {
        Delete(key) {
           this.confirm_show = true
           this.key = key
        },
        confirm_fun() {
            this.confirm_show = false
            let that = this
            let option = {}
            option.method = 'get'
            option.headers = {"Content-Type": "application/json;charset=utf-8"}    
            option.url = '/unusedgoods/user_save_delete?id=' + that.key
            option.withCredentials = true

            this.$http(option).then(function (successData) {
                if (successData.data.id !== -1) {
                    that.prompt_str = "取消收藏成功！"
                }
                else that.prompt_str = "服务器君不玩了！"
                that.prompt_show = true
            },(fileData) => { console.log(fileData)}) 
        },
        sell() {
            this.fun_index = 1
            this.selected = false
            let that = this
            let option = {}
            option.method = 'get'
            option.headers = {"Content-Type": "application/json;charset=utf-8"}    
            if (that.fun_index === 1) {
                option.url = '/unusedgoods/user_save_onsell_save?start=0' 
            }
            else option.url = '/unusedgoods/user_save_upsell_save?start=0' 
            option.withCredentials = true

            this.$http(option).then(function (successData) {
            that.$nextTick(() => {
                that.user_goods = successData.data.list
                that.page_detail.all = successData.data.allPageCount
                that.page_detail.now = successData.data.currentPageCount + 1
                if (successData.data.allPageCount > 1) {
                    that.pager_show = true
                }
                else that.pager_show = false
                // console.log(that.user_goods)
            })
            },(fileData) => { console.log(fileData)})      
        },
        up_sell() {
            this.fun_index = 2
            this.selected = true
            let that = this
            let option = {}
            option.method = 'get'
            option.headers = {"Content-Type": "application/json;charset=utf-8"}    
            if (that.fun_index === 1) {
                option.url = '/unusedgoods/user_save_onsell_save?start=0'
            }
            else option.url = '/unusedgoods/user_save_upsell_save?start=0' 
            option.withCredentials = true

            this.$http(option).then(function (successData) {
            that.$nextTick(() => {
                that.user_goods = successData.data.list
                that.page_detail.all = successData.data.allPageCount
                that.page_detail.now = successData.data.currentPageCount + 1
                if (successData.data.allPageCount > 1) {
                    that.pager_show = true
                }
                else that.pager_show = false
                console.log(that.user_goods)
            })
            },(fileData) => { console.log(fileData)})
        },
         pager_change(val) {
            // console.log(val)
            val--

            let that = this
            let option = {}
            option.method = 'get'
            option.headers = {"Content-Type": "application/json;charset=utf-8"}    
            if (that.fun_index === 1) {
                option.url = '/unusedgoods/user_save_onsell_save?start=' + val
            }
            else option.url = '/unusedgoods/user_save_upsell_save?start=' + val
            option.withCredentials = true

            this.$http(option).then(function (successData) {
            that.$nextTick(() => {
                that.user_goods = successData.data.list
                that.page_detail.all = successData.data.allPageCount
                that.page_detail.now = successData.data.currentPageCount + 1
            })
            },(fileData) => { console.log(fileData)})
        }
    },
    data() {
        return {
            pager_show: false,
            confirm_show: false,
            goods_id: 0,
            prompt_show: false,
            prompt_str: '',
            fun_index: 1,
            page_detail: {},
            user_goods: [],
            selected: false,
            key: 0
        }
    },
    created() {
        this.fun_index = 1
        let that = this
        let option = {}
        option.method = 'get'
        option.headers = {"Content-Type": "application/json;charset=utf-8"}    
        option.url = '/unusedgoods/user_save_onsell_save?start=0'
        option.withCredentials = true
        this.$http(option).then(function (successData) {
        that.$nextTick(() => {
            that.user_goods = successData.data.list
            that.page_detail.all = successData.data.allPageCount
            that.page_detail.now = successData.data.currentPageCount + 1
            if (successData.data.allPageCount > 1) {
                that.pager_show = true
            }
            else that.pager_show = false
            // console.log(that.user_goods)
        })
      },(fileData) => { console.log(fileData)})
    }
}
</script>

<style lang="less"  type="text/less">
@import "../../common/less/index";
#save{
    margin-top: 10px;
    .wrapper{
        .title_1{
            border-bottom: 1px solid #ECECEC;
            margin-bottom: 30px;
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
        ul{
            margin-top: 10px;
             &.no_pager{
                margin-bottom: 40px;
            }
        }
        li{
            margin-top: 10px;
            width: 23%;
            box-sizing: border-box;
            // padding: 2px 3px;
            border: 1px solid #F3F3F3;
            margin-right: 15px;
            display: inline-block;
            &.no_margin_right{
                margin-right: 0;
            }
            .item_wrappre{
                position: relative;
            }
            img{
                display: block;
                width: 100%;
                height: 128px;
            }
            .name{
                font-size: 0.75em;
                text-align: center;
                line-height: 18px;
            }
            .price{
                line-height: 15px;
                text-align: center;
                .old{
                    color: #CCCEDB;
                    font-size: 0.6em;
                    margin-left: 7px;
                    text-decoration: line-through;
                }
                .new{
                    font-size: 0.8em;
                    color: @main_color;
                    font-weight: bold;
                }
            }
            .btn1{
                margin-top: 5px;
                display: flex;
                line-height: 20px;
                background: @main_color;
                a{
                    display: block;
                    width: 100%;
                    text-align: center;
                    font-size: 0.8em;
                    color: #FFF;
                    line-height: 25px;
                    i{
                        margin-right: 5px;
                        font-size: 0.9em;
                    }
                    &:hover{
                        color: #EF9291;
                    }
                }
            }
            .conver{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left:0;
                z-index: 999;
                text-align: center;
                span{
                    position: absolute;
                    top: 20%;
                    right: 20%;
                    display: inline-block;
                    background: rgba(236,92,92,0.7);
                    width: 80px;
                    height: 80px;
                    border-radius: 40px;
                    text-align: center;
                    line-height: 80px;
                    color: #FFF;
                    font-size: 1.2;
                    font-weight: bold;
                }
            }
        }
    }
    .pager_wrapper{
        margin-top: 20px;
        margin-bottom: 20px;
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
     .confirm{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        &.fade-enter-active,&.fade-leave-active{
            transition: all 0.33s ease-in-out;
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