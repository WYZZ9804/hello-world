<!-- <template>
  <div>
    <el-button @click="add">click</el-button>
    <el-button type="primary">click</el-button>
    <el-button type="success">click</el-button>
    <el-button type="danger">click</el-button>
    <el-button type="warning">click</el-button>
    <el-button type="info">click</el-button>
    <br>
    <el-radio v-model="radioValue" :label="0">选项1</el-radio>
    <el-radio v-model="radioValue" :disabled="true" :label="1">选项2</el-radio>
    <el-radio v-model="radioValue" :label="2">选项3</el-radio>

    {{radioValue}}
    <br>
    <el-checkbox-group v-model="checkboxList">
    <el-checkbox label="a">多选项1</el-checkbox>
    <el-checkbox label="b">多选项2</el-checkbox>
    <el-checkbox label="c">多选项3</el-checkbox>


    </el-checkbox-group>
     {{checkboxList}}
     <el-input v-model="inpValue"></el-input>
     <el-input v-model="inpValue" type="password" show-password></el-input>
     {{inpValue.split('').reverse().join('')}}
     <br />
     <el-select filterable v-model="selectvalue" placeholder="请选择">
         <el-option
       v-for="item in optionList"
      :key="item.value"
      :label="item.label"
      :value="item.value"></el-option>
       </el-select>
       {{selectvalue}}
       <br />
       <el-date-picker v-model="dateValue"></el-date-picker>
       {{dateValue && dateValue.getFullYear()}} {{dateValue && dateValue.getMonth()}} {{dateValue && dateValue.getDate()}}

  </div>
</template>

<script>

export default {
  data () {
    return {
      radioValue:0,
      checkboxList:[],
      inpValue:'',
      selectvalue:'',
      optionList:[
        {label:'选项1',value:0},
        {label:'选项2',value:1},
        {label:'选项3',value:2},
        {label:'选项4',value:3}
      ],
      dateValue:''
    }
  },
  methods: {
    add(){
      console.log(11)
    }
  },
  computed: {

  },
}
</script>

<style>

</style>
 -->


 <!-- <template>
   <div class="box">
     <el-form ref="abc" :model="formData" label-width="80px">
       <el-form-item label="账号:">
         <el-input v-model="formData.userName"></el-input>
       </el-form-item>
       <el-form-item label="密码:">
         <el-input v-model="formData.password"></el-input>
       </el-form-item>
       <el-form-item label="性别:">
         <el-radio v-model="formData.sex" label="1">男</el-radio>
         <el-radio v-model="formData.sex" label="0">女</el-radio>
       </el-form-item>
       <el-form-item label="爱好:">
         <el-checkbox-group v-model="formData.loves">
           <el-checkbox label="0">篮球</el-checkbox>
           <el-checkbox label="1">足球</el-checkbox>
           <el-checkbox label="2">羽毛球</el-checkbox>
         </el-checkbox-group>
       </el-form-item>
       <el-form-item label="时间:">
         <el-date-picker v-model="formData.dateValue"></el-date-picker>
       </el-form-item>
       <el-form-item label="操作">
         <el-button type="primary">提交</el-button>
         <el-button>重置</el-button>
       </el-form-item>
     </el-form>

     {{formData}}
 </el-form>
 </template>
 <script>
   export default {
     data(){
       return{
         formData: {
           userName: '',
           password: '',
           sex: '',
           loves: [],
           dateValue: ''
         }

     }
   },
   methods: {

     },
     computed: {

     }
   }

 </script>
 <style>

 </style>
 -->








<template>
  <div>
<!--    <div class="box">
      <el-form ref="formData" :model="formData" label-width="80px" :rules="rules" class="demo-formData">
        <el-form-item label="账号:" prop="user">
          <el-input v-model="formData.user"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio v-model="formData.sex" label="1">男</el-radio>
          <el-radio v-model="formData.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="爱好:" prop="loves">
          <el-checkbox-group v-model="formData.loves">
            <el-checkbox label="0">篮球</el-checkbox>
            <el-checkbox label="1">足球</el-checkbox>
            <el-checkbox label="2">羽毛球</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="时间:" prop="dateValue">
          <el-date-picker v-model="formData.dateValue"></el-date-picker>
        </el-form-item>
        <el-form-item label="操作">
          <el-button type="primary" @click="submitForm('formData')">提交</el-button>
          <el-button @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>

      {{formData}}
    </div> -->

    <child ref="child" :parentValue="str"></child>
<el-button @click="getChild">child</el-button>
  </div>
</template>

<script>
  import Child from './child.vue'

export default {
  components:{
    Child
  },
  data () {
    return {
      str:'123',

      // formData: {
      //   user: '',
      //   password: '',
      //   sex: '',
      //   loves: [],
      //   dateValue: ''
      // },
      // rules: {
      //           user: [
      //             { required: true, message: '请输入账号', trigger: 'blur' },
      //             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //           ],
      //           password: [
      //             { required: true, message: '请输入密码', trigger: 'change' }
      //           ],
      //           sex: [
      //             { type: 'array', required: true, message: '请选择性别', trigger: 'change' }
      //           ],
      //           loves: [
      //             { required: true, message: '请选择爱好', trigger: 'change' }
      //           ],
      //           dateValue: [
      //             { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      //           ]
      //         }
    };
  },
  methods: {

    add(){
      console.log(11)
    },
    // submitForm(formName) {
    //         this.$refs[formName].validate((valid) => {
    //           if (valid) {
    //             alert('submit!');
    //           } else {
    //             console.log('error submit!!');
    //             return false;
    //           }
    //         });
    //       },
          // resetForm(formName) {
          //   this.$refs[formName].resetFields();
          // }
   getChild(){
     console.log(this.$refs.child.childValue)
     this.$refs.child.childFunc()
   },

    }

  }

</script>

<style>
.box {
  width: 400px;
}
</style>
