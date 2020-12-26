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
          <el-form-item label="角色" prop="role">
            <el-select v-model="formData.role" clearable>
              <el-option label="管理员" value="0"></el-option>
              <el-option label="店长" value="1"></el-option>
              <el-option label="司机" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="fetch">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-col>
      </el-form>
    </el-row>

    <el-button type="primary" @click="openDialog">新增</el-button>
    <el-button type="primary" @click="openUpdateDialog">修改</el-button>
    <el-button type="primary" @click="deleteRows">删除</el-button>

    <div class="a1">
    <el-table :data="tableData" border @selection-change="getRows">
			<el-table-column align="center" type="selection"></el-table-column>
			<el-table-column align="center" label="账号" prop="account"></el-table-column>
			<el-table-column align="center" label="姓名" prop="userName"></el-table-column>
			<el-table-column align="center" label="角色" prop="role">
        <template slot-scope="scope">
          <span>{{scope.row.role === '0' ? '管理员' : scope.row.role === '1' ? '店长' : scope.row.role === '2' ? '司机' : ''}}</span>
        </template>
      </el-table-column>
			<el-table-column align="center" label="性别" prop="sex"></el-table-column>
			<el-table-column align="center" label="手机" prop="phone"></el-table-column>
			<el-table-column align="center" label="邮箱" prop="email"></el-table-column>
			<el-table-column align="center" label="身份证" prop="idCard"></el-table-column>
		</el-table>
    </div>

    <div class="a2">
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


    <el-dialog :visible.sync="dialogVisible" width="60%" title="新增">
      <el-row>
        <el-form ref="dialogForm" :model="dialogForm" label-width="100px" inline>
          <el-col :span="12">
            <el-form-item label="用户账号" prop="account">
              <el-input v-model="dialogForm.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户姓名" prop="userName">
              <el-input v-model="dialogForm.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别" prop="sex">
              <el-input v-model="dialogForm.sex"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="dialogForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户邮箱" prop="email">
              <el-input v-model="dialogForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="dialogForm.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password">
              <el-input v-model="dialogForm.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户角色" prop="role">
              <el-select v-model="dialogForm.role">
                <el-option label="管理员" value="0"></el-option>
                <el-option label="店长" value="1"></el-option>
                <el-option label="司机" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- {{allTableData}} -->
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data () {
    return {
      dialogVisible: false,
      formData: {
        userName: '',
        account: '',
        role: ''
      },
      dialogForm: {
        account: '',
        userName: '',
        role: '',
        sex: '',
        phone: '',
        email: '',
        idCard: '',
        password: ''
      },
      pageInfo: {
				pageIndex: 1,
				pageSize: 5,
				total: 15
      },
      allTableData: [],
      tableData: [],
      currentRows: [],
      dialogType: ''
    }
  },
  mounted(){
    console.log(axios)
  },
  methods: {
		fetch(){
			this.pageInfo.pageIndex=1
			this.search()
		},
    search () {
      axios({
         url:'http://localhost:3000/userManage/getTableData',
      method:'get',
      params:{
        pageIndex:this.pageInfo.pageIndex,
        pageSize:this.pageInfo.pageSize,
        userName:this.formData.userName,
        account:this.formData.account,
        role:this.formData.role,
         }
      }).then(result=>{
        this.tableData=result.data.data
        this.pageInfo.pageIndex=result.data.pageIndex
        this.pageInfo.pageSize=result.data.pageSize
        this.pageInfo.total=result.data.total
        console.log('result',result)
      })


      // this.tableData = this.allTableData.filter(item => {
      //   return item.userName.includes(this.formData.userName) && item.account.includes(this.formData.account) && item.role.includes(this.formData.role)
      // }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)
      // this.pageInfo.total = this.allTableData.length
    },
    reset () {
      this.$refs.searchForm.resetFields()

      this.fetch()
    },
    openDialog () {
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    openUpdateDialog () {
      if (this.currentRows.length > 1) {
        this.$message({
          type: 'error',
          message: '只能勾选一条数据'
        })

        return
      }
      this.dialogVisible = true
      this.dialogType = 'set'
      this.dialogForm = Object.assign({}, this.currentRows[0])
    },
    deleteRows () {
      if (!this.currentRows.length) {
        this.$message({
          type: 'error',
          message: '请勾选数据'
        })
        return
      }
      this.$confirm('确定要删除选中数据吗？').then(() => {
        let idList = this.currentRows.map(item => {
          return item.id
        })

        // indexList.forEach(indexItem => {
        //   console.log(indexItem)
        //   let currentIndex = this.allTableData.findIndex(item => {
        //     return item.id === indexItem
        //   })

        //   console.log('currentIndex', currentIndex)
        //   this.allTableData.splice(currentIndex, 1)
        // })
        axios({
          url:'http://localhost:3000/userManage/deleteUser',
          method:'POST',
          data:{ids:idList.toString()}
        }).then(result=>{
          this.search()
          console.log(result)
        })

        //this.search()
      })
      // console.log('currentIndex', currentIndex)
      // console.log(indexList)
    },
    getRows (rows) {
      console.log('rows', rows)
      this.currentRows = rows
    },
    dialogConfirm () {
      if (this.dialogType === 'add') {
        // let newDialogForm = Object.assign({}, this.dialogForm, {
        //   id: new Date().getTime()
        // })
        // // 源数据
        // this.allTableData.push(newDialogForm)
        axios({
          url:'http://localhost:3000/userManage/addUser',
          method:'POST',
          data:this.dialogForm
        }).then(result=>{
          this.search()
          console.log(result)
          this.$refs.dialogForm.resetFields()
          this.dialogVisible=false
        })

        // this.search()

        // this.$refs.dialogForm.resetFields()

        // this.dialogVisible = false
      } else if (this.dialogType === 'set') {
        axios({
          url:'http://127.0.0.1:3000/userManage/updateUser',
          method:'POST',
          data:this.dialogForm
        }).then(result=>{
          this.search()
          console.log(result)
          this.$refs.dialogForm.resetFields()
          this.dialogVisible=false
        })


        // let index = this.allTableData.findIndex(item => {
        //   return item.id === this.dialogForm.id
        // })

        // let newFormData = Object.assign({}, this.dialogForm)

        // this.allTableData.splice(index, 1, newFormData)

        // this.$refs.dialogForm.resetFields()

        // this.dialogVisible = false

        // this.search()
        // console.log(index)
      }
    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      this.pageInfo.pageIndex = val
      this.search()
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
.a1{
  padding-top: 10px;
}
.a2{
  padding-top: 10px;
}
</style>
