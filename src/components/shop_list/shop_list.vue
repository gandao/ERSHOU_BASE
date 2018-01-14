<template>
  <div id="shop_list">
      <div class="where_wrapper">
          <span>首页</span> <i class="el-icon-arrow-right"> </i><span>搜索结果</span>
      </div>
      <div class="sort">
        <el-button-group>
            <el-button :class="{'select':sort_select[0]}" size="mini" @click='sort_fun(0)'>综合</el-button>
            <el-button :class="{'select':sort_select[1]}" size="mini" @click='sort_fun(1)'>收藏数</el-button>
            <el-button :class="{'select':sort_select[2]}" size="mini" @click='sort_fun(2)'>评论数</el-button>
            <el-button :class="{'select':sort_select[3]}" size="mini" @click='sort_fun(3)'>价格</el-button>
        </el-button-group>
      </div>
      <div class="content haspager">
        <ul>
            <li  v-for='(item,index) in list_data' :key="index" :class="{'no_margin': (index+1)%4 === 0}">
                <shop-item :item_data=item :datas="datas"><div class="img_wrapper"><router-link :to="{path: './shop_detail',query: {id: item.id}}"><img :src=item.imageUrl /></router-link></div></shop-item>
            </li>
        </ul>
        <div v-if="pager_show" class="pager">
            <el-pagination
                @current-change="pager_change"
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                :current-page="0"
                :page-count="page_detail.all"
                >
            </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
import shop_item from "../shop_item/shop_detail"
import event_transfer from "../../common/js/event_transfer.js"
export default {
    props: ['datas'],
    data() {
        return {
            list_data: {},
            page_detail: {},
            pager_show: false,
            sort_select: [false,false,false,false]
        }
    },
    created() {
        // 设置put数据
        this.datas.router_main = 1
        let option = {}
        let put_data = {}
        let url = '/search'
        let that = this
        put_data.classification = ""

        put_data.keyWords = this.datas.search_content    
        put_data.min = ''
        put_data.max = ''
        put_data.start = '1'
   
        option.url = url
        option.data = put_data
        option.method = "POST"

        that.$http(option)
        .then((response) => {
             that.$nextTick(() => {
                that.list_data = response.data.list
                that.page_detail.all = response.data.allPageCount
                if (that.page_detail.all > 1) {
                    that.pager_show = true
                }
			})
        },(fileData) => { console.log(fileData)}
        )
    },
    methods: {
        pager_change() {
            
        },
        sort_fun(index) {
             that.$nextTick(() => {
                for (let i = 0; i < this.sort_select.length; i++) {
                    this.sort_select[i] = false
                }
                this.sort_select[index] = true
             })
            
            // alert(1)
            // if (index === 0) {
            // }
            // else if (index === 1) {
            // }
            // else if (index === 2) {
            // }
            // else 
        }
    },
    components: {
        "shop-item": shop_item
    },
    mounted() {
        let that = this
        event_transfer.$on('search',function() {
            let option = {}
            let put_data = {}
            let url = '/search'
            put_data.classification = ""
            put_data.keyWords = that.datas.search_content    
            put_data.min = ''
            put_data.max = ''
            put_data.start = '1'
    
            option.url = url
            option.data = put_data
            option.method = "POST"

            that.$http(option)
            .then((response) => {
                that.$nextTick(() => {
                    that.list_data = response.data.list
                    that.page_detail.all = response.data.allPageCount
                    if (that.page_detail.all > 1) {
                        that.pager_show = true
                    }
                })
            },(fileData) => { console.log(fileData)}
            )
        })
    }
}
</script>
<style lang="less"  type="text/less">
@import "../../common/less/index";
#shop_list{
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
    .sort{
        padding: 20px 0;
        .el-button-group{
            width: 70%;
            margin: 0 auto;
            display: block;
            .select{
                background: @main_color;
                color: #fff;
                border: 1px solid @main_color;
            }
            button{
                padding: 7px 12px;
                &:hover{
                    background: @main_color;
                    color: #fff;
                    border: 1px solid @main_color;
                    background: @main_color;
                }
            }
            .el-button:hover,.el-button:visited,.el-button:active,.el-button:link{
                background: @main_color;
                color: #fff;
                border: 1px solid @main_color;
                background: @main_color;
            }
            button:active{
                background: @main_color;
                color: #fff;
                border: 1px solid @main_color;
            }
        }
    }
    .content{
        position: relative;
        padding: 10px 0 40px 0;
        &.haspager{
            padding: 10px 0 60px 0;
        }
        ul{
            width: 70%;
            margin: 0 auto;
            li{
                display: inline-block;
                margin-right: @shop_item_GPA;
                &.no_margin{
                     margin-right: 0;
                }
            } 
        }
        .pager{
            position: absolute;
            bottom: 20px;
            right: 150px;
            text-align: center;
            li,button,span{
                line-height: 20px;
                height: 20px;
                min-width: 20px;
            }
            button{
                padding: 0;
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
}

</style>