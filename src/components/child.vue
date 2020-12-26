<template>
  <div>
    <el-button @click="getParentValue">this is child component</el-button>
  </div>
</template>

<script>
  export default{
    props:{
      parentValue:{
        type:String
      }
    },
    data(){
      return{
        childValue:'this is child value'
      }

      },
      methods:{
        childFunc(){
          console.log(this.childValue+'123456')
        },
        getParentValue(){
          console.log(this.$parent.str)
          this.$parent.add()
        }
    }
  }
</script>

<style>
</style>
