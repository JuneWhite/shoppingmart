import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/index/Home'
import Login from '@/view/user/Login'
import Logout from '@/view/user/Logout'
import Register from '@/view/user/Register'
import List from '@/view/list'
import Search from '@/view/list/Search'
import Detail from '@/view/detail'
import Member from '@/view/member'
import Order from '@/view/order'
import Payment from '@/view/payment'
import Success from '@/view/payment/Success'
import Cart from '@/view/member/Cart'
import Orders from '@/view/member/Orders'
import Money from '@/view/member/Money'
import Recharge from '@/view/member/Recharge'
import Addmsg from '@/view/member/Addmsg'
import MemberIndex from '@/view/member/Member'
import Repass from '@/view/member/Repassword'
import Error from '@/view/public/Error'
import Yiyun from '@/view/public/yiyun'

import store from '../store'
import {Message} from 'element-ui'

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Home,
      meta:{
        title:'首页-中山商城'
      }
    },
    {
      path:'/login',
      name:'login',
      component:Login,
      meta:{
        title:'登录-中山商城'
      }
    },
    {
      path:'/logout',
      name:'logout',
      component:Logout,
      meta:{
        title:'退出-中山商城'
      }
    },
    {
      path:'/register',
      name:'register',
      component:Register,
      meta:{
        title:'注册-中山商城'
      }
    },
    {
      path:'/p/:id',
      name:'list',
      component:List,
      meta:{
        title:'产品列表-中山商城'
      }
    },
    {
      path:'/search',
      name:'search',
      component:Search,
      meta:{
        title:'产品搜索-中山商城'
      }
    },
    {
      path:'/d/:id',
      name:'detail',
      component:Detail,
      meta:{
        title:'产品详情-中山商城'
      }
    },
    {
      path:'/member',
      name:'',
      component:Member,
      meta:{
        authentication:true,
        title:'会员中心-中山商城'
      },
      children:[
        {
          path:'',
          name:'member-index',
          component:MemberIndex,
          meta:{
            authentication:true,
            title:'会员中心-中山商城'
          }
        },
        {
          path:'cart',
          name:'cart',
          component:Cart,
          meta:{
            authentication:true,
            title:'我的购物车-中山商城'
          }
        },
        {
          path:'orders',
          name:'orders',
          component:Orders,
          meta:{
            authentication:true,
            title:'我的订单-中山商城'
          }
        },
        {
          path:'money',
          name:'money',
          component:Money,
          meta:{
            authentication:true,
            title:'我的流水-中山商城'
          }
        },
        {
          path:'recharge',
          name:'recharge',
          component:Recharge,
          meta:{
            authentication:true,
            title:'账户充值-中山商城'
          }
        },
        {
          path:'addmsg',
          name:'addmsg',
          component:Addmsg,
          meta:{
            authentication:true,
            title:'完善信息-中山商城'
          }
        },
        {
          path:'repass',
          name:'repass',
          component:Repass,
          meta:{
            authentication:true,
            title:'修改密码-中山商城'
          }
        }
      ]
    },
    {
      path:'/order/:id',
      name:'order',
      component:Order,
      meta:{
        title:'订单页-中山商城'
      }
    },
    {
      path:'/payment',
      name:'payment',
      component:Payment,
      meta:{
        title:'支付页-中山商城'
      }
    },
    {
      path:'/success',
      name:'success',
      component:Success,
      meta:{
        authentication:true,
        title:'支付成功-中山商城'
      }
    },
    {
      path:'/help',
      name:'yiyun',
      component:Yiyun,
      meta:{
        title:'链接-中山商城'
      }
    },
    {
      path:'*',
      name:'error',
      component:Error,
      meta:{
        title:'页面不存在-中山商城'
      }
    }
  ]
})
// 全局路由卫士
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  if(to.meta&&to.meta.authentication&&to.meta.authentication==true){
    if(!store.state.user.userData.id){
      console.log(this)
      Message({
        message: '请先登录',
        type: 'warning'
      });
      next('/login')
    }    
  }
  next()
})

export default router