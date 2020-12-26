<template>
  <div>
bbbb
<el-button @click="getQueryData">获取query数据</el-button>
query数据：{{this.$route.query}}
<br>
params数据：{{this.$route.params}}
<br>
<!-- <el-button @click=""></el-button> -->
  </div>
</template>

<script>
  export default{
    data(){
      return{}
    },
    methods:{
      getQueryData(){
        console.log(this.$route.query)
      }
    }
  }
  //
</script>

<style>
</style>
