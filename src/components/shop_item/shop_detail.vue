<template>
  <div id="shop_item">
     <div class="goods_wrapper">
        <slot>
            <div class="img_wrapper" @click="detail"><router-link  :to="{path: './shop_detail',query: {id: item_data.id}}"><img :src=item_data.imageUrl /></router-link></div>
         </slot>
         <div class="title">{{item_data.name}}</div>
         <div class="price">
             <span class="new">￥ {{item_data.price}}</span><span class="old">￥ {{item_data.originalPrice}}</span>
         </div>
     </div>
  </div>
</template> 

<script>
export default {
    props: ["datas","item_data"],
    methods: {
        detail() {
            this.datas.router_main = 1
        }
    }
    
}
</script>

<style lang="less"  type="text/less">
@import "../../common/less/index";
    #shop_item{
         display: inline-block;
         margin-bottom: 20px;
        .img_wrapper{
            border: 1px solid #CCCEDB;
            padding: 3px 4px;
            a{
                display: block;
                overflow: hidden;
                img{
                    display: inline-block;
                    width: 160px;
                    height: 210px;
                    overflow: hidden;
                    transition: all 0.9s ease-in-out;
                }
                img:hover{
                     transform: scale(1.4);
                     transition: all 0.9s ease-in-out;
                }
            }
        }
        .title{
            margin: 10px 0;
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            color: #5A5E66;
        }
        .price{
            text-align: center;
            .new{
                margin-right: 10px;
                color: @main_color;
                font-size: 13px;
                font-weight: bold;
            }
            .old{
                color: #CCCEDB;
                font-size: 12px;
                
                text-decoration:line-through;
            }
        }
        
    }
</style>