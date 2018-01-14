<template>
  <div id="add_goods">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
            <el-input  v-model="form.name"></el-input>
        </el-form-item>
        
         <el-form-item class="small" label="商品价格">
            <el-input  v-model="form.price"></el-input>
        </el-form-item>
         <el-form-item class="small" label="商品原价">
            <el-input  v-model="form.oldprice"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
            <el-select v-model="form.classification" placeholder="请选择商品类型">
                <el-option label="数码" value="数码"></el-option>
                <el-option label="家电" value="家电"></el-option>
                <el-option label="衣物" value="衣物"></el-option>
                <el-option label="书籍" value="书籍"></el-option>
                <el-option label="生活用品" value="生活用品"></el-option>
                <el-option label="其他" value="其他"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="交易方式">
            <el-checkbox-group v-model="form.trade_method">
                <el-checkbox label="线上交易"></el-checkbox>
                <el-checkbox label="线下交易"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="交易地点">
            <el-input v-model="form.place"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
            <el-input v-model="form.QQ"></el-input>
        </el-form-item>
        <el-form-item label="TEL">
            <el-input v-model="form.TEL"></el-input>
        </el-form-item>
        <el-form-item label="微信">
            <el-input v-model="form.weixin"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.describle"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品图片">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                file-list="fileList2"
                auto-upload = 'false'
                limit = "4"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg文件，且保证至少有一张最多4张</div>
            </el-upload>
        </el-form-item> -->
         <el-form-item>
            <el-button type="primary" @click.stop.prevent="onSubmit">提交</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
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
        form: {
          name: '',
          price: '',
          oldprice: '',
          classification: '',
          trade_method: [],
          place: '',
          QQ: '',
          TLE: '',
          weixin: '',
          describle: ''
        },
        fileList2: [],
        prompt_show: false,
        prompt_str: '',
        confirm_show: false
      }
    },
    methods: {
        onSubmit() {
          this.confirm_show = true
        },
        picture_put(key) {
        },
        confirm_fun() {
            this.confirm_show = false
            if (this.form.name !== '' && this.form.price !== '' && this.form.oldprice !== '' && this.form.place !== '' && this.form.classification !== '' && this.form.describle !== '' && this.form.trade_method !== []) {
                if (this.form.QQ === '' && this.form.weixin === '' && this.form.TLE === '') {
                    this.prompt_str = "请输入至少一种联系方式"
                    this.prompt_show = true
                }
                else {
                }
            }
            else {
                this.prompt_str = "还有未完善的商品信息！"
                this.prompt_show = true
            }
        },
        handleRemove (file, fileList) {
            // console.log(file, fileList)
        },
        handlePreview (file) {
            // console.log(file)
        },
        confirmFun() {
            let formData = new FormData()
            formData.append('data', this.form)
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            this.$http.post('/upload', formData, config).then(function (res) {
                if (res.status === 200) {
                }
            })
        }
    }
}
</script>

<style lang="less"  type="text/less">
@import "../../common/less/index";
#add_goods{
    width: 77.5%;
    margin-top: 50px;
    margin-bottom: 30px;
    input,textarea,{
        &:focus{
            border: 1px solid #EF9291;
            color: @main_color;
        }
    }
    .small{
        display: inline-block;
        width: 220px;
    }
    
    .el-checkbox{
        &.is-checked{
            input,.el-checkbox__inner{
                border: 1px solid @main_color;
                background: @main_color !important;
                &:hover{
                    border: 1px solid @main_color;
                }
            }
            .el-checkbox__label{
                color: @main_color !important;
            }
        }
        .el-checkbox__inner{
            border:1px solid @main_color !important;
        }
    }
    .el-button--primary{
        background: @main_color;
        border: 1px solid @main_color;
        &:hover{
             background: #de2f2f;
             border: 1px solid #de2f2f;
        }
    }
    .el-button--default{
        color: @main_color;
        border: 1px solid @main_color;
        background: rgba(236,92,92,0.05);
        &:hover,&:visited,&:active,&:link{
            background:#fff;
        }
    }
    .el-upload-list__item-status-label{
        background: @main_color;
    }
    .el-upload-list__item-name:hover{
        color: @main_color;
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