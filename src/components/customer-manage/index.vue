<template>
	<div class="user-container">
    <el-row>
      <el-form ref="searchForm" label-width="80px" :model="formData" inline>
        <el-col :span="6">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="formData.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号" prop="account">
            <el-input v-model="formData.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-table border :data="tableData" >
      <el-table-column algin="center" label="客户账号" prop="account"></el-table-column>
      <el-table-column algin="center" label="姓名" prop="userName"></el-table-column>
      <el-table-column algin="center" label="性别" prop="sex"></el-table-column>
      <el-table-column algin="center" label="手机" prop="phone"></el-table-column>
      <el-table-column algin="center" label="客户邮箱" prop="email"></el-table-column>
      <el-table-column algin="center" label="身份证" prop="idCard"></el-table-column>
    </el-table>

    <div class="a2"></div>
		<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
    </div>


	</div>
</template>

<script>

export default {
	data () {
    return {
      // dialogVisible: false,
       tableData:[
      	{account:'0001',userName:'Tom',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'1111',userName:'James',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'aaa1',userName:'Kobe',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'aa01',userName:'Tom',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'aa01',userName:'Tom',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'b001',userName:'Tom',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'}
      ],
      allTableData:[
      	{account:'0001',userName:'Tom',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'1111',userName:'James',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'aaa1',userName:'Kobe',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'aa01',userName:'Tom',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'aa01',userName:'Tom',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'},
      	{account:'b001',userName:'Tom',sex:'男',phone:'19999999999',email:'156@qq.com',idCard:'43759273598659869235965'}
      ],
      formData: {
        userName: '',
        account: ''
      },
      pageInfo: {
				pageIndex: 1,
				pageSize: 5,
				total: 15
      }
    }
  },
  methods: {
    search () {
      this.tableData = this.allTableData.filter(item => {
        return item.userName.includes(this.formData.userName) && item.account.includes(this.formData.account)
      })

    },
    reset () {
      this.$refs.searchForm.resetFields()
    },
    handleSizeChange (val) {

    },
    handleCurrentChange (val) {

    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
}
.a2{
  padding-top: 10px;
}
</style>
