import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import main from "@/components/main/main.vue"
import user_center from "@/components/user_center/user_center.vue"
import shop_list from "@/components/shop_list/shop_list.vue"
import shop_detail from "@/components/shop_detail/shop_detail.vue"
import user_information from "@/components/user_information/user_information.vue"
import my_gooods from "@/components/shop_item_1/shop_item_1.vue"
import save from "@/components/save/save.vue"
import my_message from "@/components/my_message/my_message.vue"
import user_feedback from "@/components/user_feedback/user_feedback.vue"
import logIn from "@/components/logIn/log_in.vue"
import add_goods from "@/components/add_goods/add_goods.vue"
import all_main from "@/components/all_main/all_main.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      component: all_main,
      children: [
        {
          path: "user_center",
          component: user_center,
          children: [
            {
              path: 'user_information',
              component: user_information
            },
            {
              path: 'my_goods',
              component: my_gooods
            },
            {
              path: 'save',
              component: save
            },
            {
              path: 'my_message',
              component: my_message
            },
            {
              path: 'user_feedback',
              component: user_feedback
            },
            {
              path: 'add_goods',
              component: add_goods
            }
          ]
        },
        {
          path: "shop_list",
          component: shop_list
        },
        {
          path: "shop_detail",
          component: shop_detail,
          meta: {keepAlive: false}
        },
        {
          path: 'main1',
          component: main
        },
        {
          path: '',
          component: main
        }
      ]
    },
    { 
      path: '/',
      redirect: '/main/main1'
     },
     {
      path: '/logIn', 
      component: logIn
    }
  ],
  mode: 'history',
  scrollBehavior (to, from) {
    return { x: 0, y: 0 }
  }
})
