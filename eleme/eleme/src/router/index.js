import Vue from 'vue'
import Router from 'vue-router'
import Lyf_dizhi from '@/components/lyf/lyf_dizhi'
import Lyf_shouye from '@/components/lyf/lyf_shouye'
import Lyf_sousuo from '@/components/lyf/lyf_sousuo'
import Lyf_shopsousuo from '@/components/lyf/lyf_shopsousuo'
import Lyf_shoppai from '@/components/lyf/lyf_shoppai'
import Lyf_beizhu from '@/components/lyf/lyf_beizhu'
import Lyf_lishi from '@/components/lyf/lyf_lishi'
import Lyf_dingdan from '@/components/lyf/lyf_dingdan'
import City from '@/components/lys/city'
import Login from '@/components/lys/login'
import Password_reset from '@/components/lys/password_reset'
import Yve from '@/components/lys/min_yve'
import Yve_Shuoming from '@/components/lys/yve_shuoming'
import Yve_Jifen from '@/components/lys/min_jifen'
import Jifen_shuoming from '@/components/lys/jifen_shuoming'
import min_Shuoming from '@/components/lys/min_dingdan'
import Location from '@/components/lys/location'
import Fuwu from '@/components/lys/min_fuwu'
import Huiyuan from '@/components/lys/huiyuan'
import Huiyuan_Shuoming from '@/components/lys/huiyuan_shuoming'
import Pay from '@/components/lys/pay'
import Duihuan_huiyuan from '@/components/lys/duihuan_huiyuan'
import Buy_jilu from '@/components/lys/buy_jilu'
import Zhanghu from '@/components/lys/zhanghu'
import User_xiugai from '@/components/lys/user_xiugai'
import Address_bianji from '@/components/lys/address_bianji'
import Address_add from '@/components/lys/address_add'
import Youhui from '@/components/lys/youhui'
import Hongbao_shuoming from '@/components/lys/hongbao_shuoming'
import Hongbao from '@/components/lys/hongbao'
import Jinjuan from '@/components/lys/jinjuan'
import Jinjuan_shuoming from '@/components/lys/jinjuan_shuoming'
import Hongbao_history from '@/components/lys/hongbao_history'
import Hongbao_duihuan from '@/components/lys/hongbao_duihuan'
import Tuijian_jiang from '@/components/lys/tuijian_jiang'
import Fuwu_text from '@/components/lys/fuwu_text'
import Sousuo from '@/components/lys/sousuo'
// 云松页面
import Minindex from '@/components/lys/min_index'
// 秦倩倩页面
// 主页地址选择
// import HelloWorld from '@/components/HelloWorld'
import Qstore from '@/components/qqq/q_store'
import storeShop from '@/components/qqq/q_store_shop'
import storeEvaluate from '@/components/qqq/q_store_evaluate'
import storePay from '@/components/qqq/q_store_pay'
import chooseAds from '@/components/qqq/q_pay_chooseAds'
import addAddress from '@/components/qqq/q_add_address'
import adsSearch from '@/components/qqq/q_address_search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lyf_dizhi',
      component: Lyf_dizhi
    },
    {
      path: '/lyf_dizhi',
      name: 'Lyf_dizhi',
      component: Lyf_dizhi
    },
    {
      path: '/lyf_shouye',
      name: 'Lyf_shouye',
      component: Lyf_shouye
    },
    {
      path: '/lyf_sousuo',
      name: 'Lyf_sousuo',
      component: Lyf_sousuo
    },
    {
      path: '/lyf_shopsousuo',
      name: 'Lyf_shopsousuo',
      component: Lyf_shopsousuo
    },
    {
      path: '/lyf_shoppai',
      name: 'Lyf_shoppai',
      component: Lyf_shoppai
    },
    {
      path: '/lyf_beizhu',
      name: 'Lyf_beizhu',
      component: Lyf_beizhu
    },
    {
      path: '/lyf_lishi',
      name: 'Lyf_lishi',
      component: Lyf_lishi
    },
    {
      path: '/lyf_dingdan',
      name: 'Lyf_dingdan',
      component: Lyf_dingdan
    },
    // 李云松 -- 我的页面
    {
      path:'/minindex',
      name:'minindex',
      component:Minindex
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/passreset',
      name:'password_reset',
      component:Password_reset
    },
    {
      path:'/yve',
      name:'yve',
      component:Yve
    },
    {
      path:'/yve_shuoming',
      name:'yve_shuoming',
      component:Yve_Shuoming
    },
    {
      path:'/min_jifen',
      name:'min_jifen',
      component:Yve_Jifen
    },{
      path:'/jifen_shuoming',
      name:'jifen_shuoming',
      component:Jifen_shuoming
    },
    {
      path:'/min_dingdan',
      name:'min_dingdan',
      component:min_Shuoming
    },
    {
      path:'/location',
      name:'location',
      component:Location
    },
    {
      path:'/fuwu',
      name:'fuwu',
      component:Fuwu
    },
    {
      path:'/huiyuan',
      name:'huiyuan',
      component:Huiyuan
    },
    {
      path:'/huiyuan_shuoming',
      name:'huiyuan_shuoming',
      component:Huiyuan_Shuoming
    },
    {
      path:'/pay',
      name:'pay',
      component:Pay
    },
    {
      path:'/duihuan_huiyuan',
      name:'duihuan_huiyuan',
      component:Duihuan_huiyuan
    },
    {
      path:'/buy_jilu',
      name:'buy_jilu',
      component:Buy_jilu
    },
    {
      path:'/zhanghu',
      name:'zhanghu',
      component:Zhanghu
    },
    {
      path:'/user_xiugai',
      name:'user_xiugai',
      component:User_xiugai
    },
    {
      path:'/address_bianji',
      name:'address_bianji',
      component:Address_bianji
    },
    {
      path:'/address_add',
      name:'address_add',
      component:Address_add
    },
    {
      path:'/youhui',
      name:'youhui',
      component:Youhui,
      redirect:'/hongbao',
      children:[
        {
          path:'/hongbao',
          name:'hongbao',
          component:Hongbao
        },
        {
          path:'/jinjuan',
          name:'jinjuan',
          component:Jinjuan
        }
      ]
    },
    {
      path:'/hongbao_shuoming',
      name:"hongbao_shuoming",
      component:Hongbao_shuoming
    },
    {
      path:'/jinjuan_shuoming',
      name:'jinjuan_shuoming',
      component:Jinjuan_shuoming
    },
    {
      path:'/hongbao_history',
      name:'hongbao_history',
      component:Hongbao_history
    },
    {
      path:'/hongbao_duihuan',
      name:'hongbao_duihuan',
      component:Hongbao_duihuan
    },
    {
      path:'/tuijian_jiang',
      name:'tuijian_jiang',
      component:Tuijian_jiang
    },
    {
      path:'/fuwu_text',
      name:'fuwu_text',
      component:Fuwu_text
    },
    {
      path:'/sousuo',
      name:'sousuo',
      component:Sousuo
    },
    // 秦倩倩购物车部分
    {
      path: '/q_store',
      name: 'q_store',
      component: Qstore,
      redirect:"/q_store_shop",
      children:[
        {
          path: '/q_store_shop',
          name: 'q_store_shop',
          component: storeShop
        },
        {
          path: '/q_store_evaluate',
          name: 'q_store_evaluate',
          component: storeEvaluate
        },
      ]
    },
    {
      path: '/q_store_pay',
      name: 'q_store_pay',
      component: storePay
    },
    {
      path: '/q_pay_chooseAds',
      name: 'q_pay_chooseAds',
      component: chooseAds
    },
    {
      path: '/q_add_address',
      name: 'q_add_address',
      component: addAddress
    },
    {
      path: '/q_address_search',
      name: 'q_address_search',
      component: adsSearch
    },
  ]
})
