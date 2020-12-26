<template>
  <div>
aaa
<el-button @click="toBcom">跳转到</el-button>
<el-button @click="toBcomName">跳到b组件-name</el-button>
<router-link to="/b">跳转到b组件</router-link>
<br>

  </div>
</template>

<script>
  export default{
    data(){
      return{}
    },
    methods:{
      toBcom(){
        //path+query跳转
        this.$router.push({
          path:'/b',
          query:{name:'tom',age:10}
        })
      },
      toBcomName(){
        //name+params
        this.$router.push({
          name:"b",
          params:{name:'tom',age:10}
        })
      }
    }
  }
</script>

<style>
</style>
