<template>
  <div id="log_in">
    <div class="title_wrapper">
        <div class="wrapper">
            <span class="img_wrapper">
                <img src="./logo.png"/>
            </span><span class="title-wrappre">
                <div class="big">二手交易平台</div>
                <div class="small">SECOND-HAND TRADING PLATFORM</div>
            </span>
        </div>
        <span class="circle">
            <div class="wrapper">
                <div>账号</div>
                <div>登录</div>
            </div>
        </span>
    </div>
    <div class="input_wrapper">
        <div class="wrapper">
            <div class="title">ACCOUNT LOGIN</div>
            <div class="input">
                <span class="name">账号</span>
                <input type="text" v-model="user.account"></input>
            </div>
            <div class="input last">
                <span class="name">密码</span>
                <input type="password" v-model="user.password"></input>
            </div>
            <div class="entry_wrapper">
                <span @click.stop.prevent="first_action = true;option = 0;"><a href="#">我要注册</a></span>|<span class="second" @click.stop.prevent="first_action = true;option = 1;"><a href="#">忘记密码</a></span><span class="btn" @click="logIn"><a href="#">登录</a></span>
            </div>
        </div>
    </div>
    <transition name="fade"> 
        <div class="register" v-if="register_show">
                
                <span class="wrapper"  v-if="register_show">
                    <div class="title">注册</div>
                    <div class="content">
                        <div><span class="name">邮箱</span><input disabled v-model="user_proving.account" type="text"/></div>
                        <div><span class="name">设置密码</span><input v-model="user_proving.password" type="password"/></div>
                        <div><span class="name">确认密码</span><input v-model="user_proving.password_ok" type="text"/></div>
                        <div class="btn">
                            <span @click.stop.prevent="findcode_fun"><a href="#">确定</a></span><span @click.stop.prevent="register_show = false;"><a href="#">取消</a></span>
                        </div>
                    </div>
                </span>
        </div>
    </transition>
    <transition name="fade"> 
        <div class="findcode" v-if="findcode_show">
                <span class="wrapper"  v-if="findcode_show">
                    <div class="title">设置密码</div>
                    <div class="content">
                        <div><span class="name">邮箱</span><input disabled v-model="user_proving.account" type="text"/></div>
                        <div><span class="name">设置密码</span><input v-model="user_proving.password" type="password"/></div>
                        <div><span class="name">确认密码</span><input v-model="user_proving.password_ok" type="text"/></div>
                        <div class="btn">
                            <span @click.stop.prevent="findcode_fun"><a href="#">确定</a></span><span @click.stop.prevent="findcode_show = false;"><a href="#">取消</a></span>
                        </div>
                    </div>
                </span>
        </div>
    </transition>
    <transition name="fade"> 
        <div class="account_proving" v-if="first_action">
                
                <span class="wrapper"  v-if="first_action">
                    <div class="title">账户验证</div>
                    <div class="content">
                        <div><span class="name">邮箱</span><input v-model="user_proving.account" class="first" type="text"/><span class="btn1" @click.stop.prevent="user_proving_fun"><a href="#">{{user_proving_str[user_proving_index]}}</a></span></div>
                        <div><span class="name">验证码</span><input v-model="user_proving.recode" type="text"/></div>
                        <div class="btn">
                            <span @click.stop.prevent="account_proving_fun"><a href="#">确定</a></span><span @click.stop.prevent='first_action = false'><a href="#">取消</a></span>
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
    props: ["datas"],
    data() {
        return {
            register_show: false,
            findcode_show: false,
            first_action: false,
            prompt_show: false,
            option: 0,
            prompt_str: '',
            user: {
                account: "",
                password: ""
            },
            user_proving: {
                account: "",
                recode: "",
                password: "",
                password_ok: ""
            },
            user_proving_str: ["获取验证码","重新获取"],
            user_proving_index: 0
        }
    },
    methods: {
        logIn() {
            let that = this
            let option = {}
            let url = '/logIn'
            // this.$router.push({ path: '/main/main1' })
            option.withCredentials = true
            option.url = url
            option.data = this.user
            option.method = "put"
            
            that.$http(option)
            .then((response) => {
                that.$nextTick(() => {
                    if (response.data.id !== -1) {
                        that.datas.user = response.data
                        that.datas.is_logIn = true
                        that.$router.push({ path: '/main/main1' })  
                    }
                    else {
                        that.prompt_str = response.data.value
                        that.prompt_show = true
                    }
                })
            },
            (fileData) => { 
                that.prompt_str = '后台出现了问题正在紧急修复！'
                that.prompt_show = true
            })
        },
        account_proving_fun() {
            if (this.user_proving.account !== '' && this.user.recode !== '') {
                let option = {}
                let data = {}
                let that = this
                data.account = this.user_proving.account
                data.reqcode = this.user_proving.recode
                option.data = data
                option.method = 'put'
                option.url = "/unusedgoods/account_proving"
                this.$http(option).then(function (successData) {
                    if (successData.data.id === 1) {
                        that.first_action = false
                        if (that.option === 0) {
                            that.register_show = true
                        }
                        else that.findcode_show = true
                    }
                    else {
                        that.prompt_str = successData.data.value
                        that.prompt_show = true
                    }
                },(fileData) => { console.log(fileData)})
            }
            else {
                that.prompt_str = '请输入完整信息'
                that.prompt_show = true
            }
        }, 
        user_proving_fun() {
            this.user_proving_index = 0
            let that = this
            let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
            if (!reg.test(this.user_proving.account)) {
                this.prompt_str = "请输入正确的邮箱"
                this.prompt_show = true 
            }
            else {
               let option = {}
               let accounts = {}
               accounts.account = this.user_proving.account
               option.method = 'put'
               option.data = accounts
               option.headers = {"Content-Type": "application/json;charset=utf-8"}
               option.withCredentials = true
               if (this.option === 0) {
                   option.url = "/unusedgoods/logIn_account_proving_new"
               }
              else option.url = "/unusedgoods/logIn_account_proving_code"
              this.$http(option).then(function (successData) {
                    if (successData.data.id === -1) {
                        that.prompt_str = successData.data.value
                    } else {
                        that.prompt_str = "已发送"
                        that.user_proving_index = 1
                    }  
                    that.prompt_show = true             
                    }
                    ,(fileData) => { console.log(fileData)})
            }
        },
        findcode_fun() {
            let that = this
            if (this.user_proving.password === this.user_proving.password_ok && this.user_proving.password !== '') {
                let option = {}
                let data = {}
                data.account = this.user_proving.account
                data.password = this.user_proving.password
                option.data = data
                option.method = 'put'
                if (this.option === 0) {
                    option.url = "/unusedgoods/logIn__new"
                }
                else option.url = "/unusedgoods/logIn_code"
                this.$http(option).then(function (successData) {
                        if (successData.data.id === 1) {
                            if (that.option === 0) {
                                that.register_show = false
                                that.prompt_str = "注册成功" 
                            } else {
                                that.findcode_show = false
                                that.prompt_str = "修改成功"
                            }
                        } else {
                            that.prompt_str = successData.data.value
                        }
                        that.prompt_show = true }
                        ,(fileData) => { console.log(fileData)})
             }
             else {
                 if (this.user_proving.password === '' || this.user_proving.password_ok === '') {
                    that.prompt_str = "请输入完整信息"
                 }
                 else if (this.user_proving.password !== this.user_proving.password_ok) {
                     that.prompt_str = "密码不一致"
                 }
                 that.prompt_show = true
             }
          } 
    }
}
</script>

<style lang="less"  type="text/less">
@import "../../common/less/index";
#log_in{
    flex: 1;
    display: flex;
    flex-direction: column;
    .title_wrapper{
        position: relative;
        flex: 0 0 250px;
        background: #FFF;
        .wrapper{
            width: 50%;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            .img_wrapper{
                display: inline-block;
                width: 75px;
                height: 75px;
                img{
                    display: block;
                    width: 75px;
                    height: 75px;
                }
            }
            .title-wrappre{
                vertical-align: top;
                display: inline-block;
                margin-left: 20px;
                margin-top: 14px;
                text-align: center;
                .big{
                    text-align: center;
                    font-size: 2.1em;
                    font-weight: bold;
                    letter-spacing: 9px;
                    margin-bottom: 10px;
                }
                .small{
                    font-size: 0.65em;
                     letter-spacing: 2px;
                }
            }

        }
        .circle{
            z-index: 999;
            position: absolute;
            bottom: -45px;
            left: 46%;
            width: 90px;
            height: 90px;
            background: #fff;
            border-radius: 45px;
            border: 2px solid @main_color;
            box-sizing: border-box;
            .wrapper{
                margin: 0 auto;
                margin-top: 18px;
                font-size: 1.33em;
                color: @main_color;
                div{
                   font-weight: bold; 
                   &:last-child{
                       margin-top: 7px;
                   }
                }

            }
        }
    }
    .input_wrapper{
        flex: 1;
        background: @main_color;
        .wrapper{
            padding: 10px 5px;
            border-radius: 2px;
            width: 30%;
            margin: 0 auto;
            margin-top: 10px;
            background: rgba(245,250,250,0.23);
            color: #FFF;
            .title{
                margin-bottom: 27px;
                margin-top: 50px;
                text-align: center;
                font-size: 1.35em;
                letter-spacing:3px;
            }
            .input{
                text-align: center;
                &.last{
                    margin-top: 10px;
                }
                span{
                    line-height: 20px;
                    font-size: 0.9em;
                    margin-right: 10px;
                }
                input{
                    width: 52%;
                    outline: none;
                    height: 22px;  
                    border-radius: 2px;
                    vertical-align: middle;
                    text-indent: 10px;
                    font-size: 0.9em;
                    color:@main_color;
                    letter-spacing: 1px;
                    &:focus{
                    color:@main_color;
                    }
                }
            }
            .recode{
                margin-top: 10px;
                text-align: center;
                &.last{
                    margin-top: 10px;
                }
                span{
                    text-align: left;
                    margin-right: 20px;
                    line-height: 25px;
                    font-size: 0.9em;
                }
                input{
                    position: relative;
                    left: -12px;
                    width: 52%;
                    outline: none;
                    height: 22px;  
                    border-radius: 2px;
                    vertical-align: middle;
                    text-indent: 10px;
                    font-size: 0.9em;
                    color:@main_color;
                    letter-spacing: 1px;
                    &:focus{
                    color:@main_color;
                    }
                }
            }
            img{
                display: block;
                width: 51.6%;
                height: 60px;
                margin-left: 30.9%;
                margin-top: 10px;
            }
            .entry_wrapper{
                margin-left: 29%;
                margin-top: 20px;
                font-size: 0.7em;
                margin-bottom: 15px;
                span{
                    a{
                        color: #FFF;
                    }
                    &:first-child{
                        margin-right: 4px;
                    }
                    &.second{
                      margin-left: 4px;
                    }
                    &.btn{
                        padding: 3px 14px;
                        margin-left:30px;
                        font-size: 1.1em;
                        border-radius: 2px;
                        background: #CD4D4C;
                    }
                }
            }
            input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
            input[type="number"]{
                -moz-appearance: textfield;
            }
        }
    }
    .register,.findcode,.account_proving{
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
            width: 350px;
            position: absolute;
            top: 35%;
            left: 38%;
            .title{
                line-height: 40px;
                color: #fff;
                font-size: 1.2em;
                font-weight: bold;
                letter-spacing: 4px;
                background: @main_color;
                border-radius: 5px 5px 0 0 ;
                text-align: center;
            }
            .content{
                background: #FFF;
                padding: 10px 5px;
                border: 2px solid @main_color;
                div:first-child{
                    margin-top: 20px;
                }
                div{
                    margin-bottom: 25px;
                }
                .name{
                    font-size: 0.9em;
                    display: inline-block;
                    width: 80px;
                    margin-left: 20px;
                    // margin-right: 10p;
                    color:#6d6d6d;
                }
                input{
                    width: 62%;
                    outline: none;
                    height: 20px;  
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
            }

      
        }
    }
    .findcode .wrapper{
        width: 350px;
    }
    .account_proving .wrapper{
        width: 350px;
        .first{
            width: 120px !important;
        }
        .btn1{
            margin-left: 10px;
            display: inline-block;
            a{
                font-size: 0.8em;
                color: @main_color; 
                &:hover{
                    color: #ea113d
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