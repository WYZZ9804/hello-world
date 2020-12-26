<template>
  <div class="container">
    <div class="header">
      <div class="a1">行走书店管理系统</div>
      <div class="a2">
        <img src="../assets/imgs/u18.jpg" />
        <span>admin</span>
      </div>
    </div>
    <div class="box">
    <div class="aside">
      <div :class="{active: $route.path===item.path}"
      v-for="(item,index) in menuList"
      :key="index"
      @click="toPage(item)">
      {{item.name}}
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        menuList:[
        {path: '/user-manage', name: '用户管理'},
        {path: '/menu-manage', name: '菜单管理'},
        {path: '/goods-manage', name: '商品管理'},
        {path: '/home-img-manage', name: '首页轮播图管理'},
        {path: '/goods-classify-manage', name: '商品分类管理'},
        {path: '/customer-manage', name: '客户管理'},
        {path: '/order-manage', name: '订单管理'},
        {path: '/hot-goods-manage', name: '热门位商品管理'},
       // {path: '/shop-info-manage', name: '门店信息管理'},
        //{path: '/driver-info-manage', name: '司机信息管理'},
        ]
      }
    },
    methods:{
      toPage(item){
        if(this.$route.path===item.path){
          return
        }
        this.$router.push({
          path: item.path
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .container{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
  .header{
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    height: 60px;
    background: rgb(242,242,242);
  }
  .a1{
    font-size: 30px;
    color: #409eff;
  }
  .a2 {
    display: flex;
    height: 60px;
    align-items: center;
  }
  .a2 img{
    margin-right: 20px;
  }
  .box{
    flex: 1;
    display: flex;
    width: 100%;
    background: #ddd;

  }
  .aside{
    width: 200px;
    height: 100%;
    background: white;
    border-right: 1px solid #ddd;
   >div{
      height: 50px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
  }
>div:hover{
  background: rgb(236,245,255);
}
  }
.active{
  color: #409eff;
  background: rgb(236,245,255);
  font-size: 20px;
}
// @media (max-width:454px){
//   a1{
//     font-size: 2px;
//     color: #ff0000;
//   }
// }
  .content{
    flex: 1;
    background: white;
  }

</style>
