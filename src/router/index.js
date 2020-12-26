import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import A from '@/components/a.vue'
import B from '@/components/b.vue'
import Parent from '@/components/parent.vue'
import ErrorPage from '@/components/error.vue'
import Other from '@/components/other.vue'
import Login from '@/components/login.vue'
//用户管理
import UserManage from '@/components/user-manage/index.vue'
//菜单管理
import MenuManage from '@/components/menu-manage/index.vue'
//商品管理
import GoodsManage from '@/components/goods-manage/index.vue'
//首页轮播图管理
import HomeimgManage from '@/components/home-img-manage/index.vue'
//商品分类管理
import GoodsClassifyManage from '@/components/goods-classify-manage/index.vue'
//客户管理
import CustomerManage from '@/components/customer-manage/index.vue'
//订单管理
import OrderManage from '@/components/order-manage/index.vue'
//热门位商品管理
import HotGoodsManage from '@/components/hot-goods-manage/index.vue'
//门店信息管理
//import ShopInfoManage from '@/components/shop-info-manage/index.vue'
//司机信息管理
//import DriverInfoManage from '@/components/driver-info-manage/index.vue'

Vue.use(Router)
   //单页面跳转
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
	{
	  path: '*',
	  name: 'error',
	  component: ErrorPage
	},
	{
		path: '/parent',
		name: 'parent',
		component: Parent,
		children:[
			{
			  path: '/user-manage',
			  name: 'user-manage',
			  component: UserManage
			},
			{
			  path: '/menu-manage',
			  name: 'menu-manage',
			  component: MenuManage
			},
			{
			  path: '/goods-manage',
			  name: 'goods-manage',
			  component: GoodsManage
			},
			{
			  path: '/home-img-manage',
			  name: 'home-img-manage',
			  component: HomeimgManage
			},
			{
			  path: '/goods-classify-manage',
			  name: 'goods-classify-manage',
			  component: GoodsClassifyManage
			},
			{
			  path: '/customer-manage',
			  name: 'customer-manage',
			  component: CustomerManage
			},
			{
			  path: '/order-manage',
			  name: 'order-manage',
			  component: OrderManage
			},
			{
			  path: '/hot-goods-manage',
			  name: 'hot-goods-manage',
			  component: HotGoodsManage
			},
			// {
			//   path: '/shop-info-manage',
			//   name: 'shop-info-manage',
			//   component: ShopInfoManage
			// },
			// {
			//   path: '/driver-info-manage',
			//   name: 'driver-info-manage',
			//   component: DriverInfoManage
			// },
			{
		path: '/a',
		name: 'a',
		component: A
	},
	// {
	// 	path: '/b',
	// 	name: 'b',
	// 	component: B
	// }
		]
	},
	{
	  path: '/other',
	  name: 'other',
	  component: Other
	},


  ]
})
