<template>
	<div class="user-container">
    <el-form ref="searchForm" label-width="80px" :model="formData" inline>

      <el-form-item label="状态" prop="state">
        <el-select v-model="formData.state" clearable>
          <el-option
            v-for="(item, index) in stateOptions" :key="index" :label="item.label" :value="item.value">
          </el-option>

        </el-select>
      </el-form-item>

      <el-button type="primary" @click="fetch">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>

    </el-form>
    <div class="btn">
      <el-button type="primary" @click="openDialog">新增</el-button>
    <el-button type="primary" @click="openUpdateDialog">修改</el-button>
    <el-button type="primary" @click="enable">启用</el-button>
    <el-button type="primary" @click="disable">禁用</el-button>
    </div>

    <div class="a1">
    <el-table :data="tableData" border @selection-change="getRows">
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" label="排序" prop="theSorting"></el-table-column>
      <el-table-column align="center" label="商品名称" prop="goodsName"></el-table-column>
      <el-table-column align="center" label="状态" prop="state">
        <template slot-scope="scope">
          <span>{{getGoodsStatusLabel(scope.row.state)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="有效期起" prop="startValidity"></el-table-column>
      <el-table-column align="center" label="有效期止" prop="endValidity"></el-table-column>
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

    <el-dialog :visible.sync="dialogVisible" width="40%" title="新增轮播图">
      <el-form ref="dialogForm" :model="dialogForm" label-width="100px" inline>
      <el-row>
        <el-col :span="12">
          <el-form-item label="排序" prop="theSorting">
            <el-input v-model="dialogForm.theSorting"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="dialogForm.goodsName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="有效期起" prop="startValidity">
            <el-date-picker
                 v-model="dialogForm.startValidity"
                 type="date"
                 placeholder="选择日期">
               </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="有效期止" prop="endValidity">
             <el-date-picker
                  v-model="dialogForm.endValidity"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

	</div>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        pageInfo: {
        	pageIndex: 1,
        	pageSize: 5,
        	total: 0
        },
        formData:{
          state:''
        },
        dialogForm:{
          theSorting:'',
          startValidity:'',
          endValidity:'',
          goodsName:''
        },
        stateOptions:[
          {label:'启用',value:'0'},
          {label:'禁止',value:'1'}
        ],
        tableData:[],
        allTableData:[],
        currentRows: [],
        dialogType: ''
      }
    },
    methods:{
      fetch () {
        this.search()
      },
      search () {
        this.tableData = this.allTableData.filter(item => {
          return item.state.includes(this.formData.state)
        })
      },
      reset () {},
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
      enable () {
        if (this.currentRows.length === 0) {
          this.$message({
            type: 'error',
            message: '请勾选需要操作的数据'
          })

          return
        }

        let indexList = this.currentRows.map(item => {
          return item.id
        })

        indexList.forEach(indexItem => {
          let currentIndex = this.allTableData.findIndex(item => {
            return item.id === indexItem
          })

          let newFormData = Object.assign({}, this.allTableData[currentIndex], {
            state: '0'
          })

          this.allTableData.splice(currentIndex, 1, newFormData)
          this.search()
        })
      },
      disable () {
        if (this.currentRows.length === 0) {
          this.$message({
            type: 'error',
            message: '请勾选需要操作的数据'
          })

          return
        }

        let indexList = this.currentRows.map(item => {
          return item.id
        })

        indexList.forEach(indexItem => {
          let currentIndex = this.allTableData.findIndex(item => {
            return item.id === indexItem
          })

          let newFormData = Object.assign({}, this.allTableData[currentIndex], {
            state: '1'
          })
          console.log(this.allTableData)

          this.allTableData.splice(currentIndex, 1, newFormData)
          this.search()
        })
      },
      getRows (rows) {
        this.currentRows = rows
      },
      momentDate (date) {
        if (!date) {
          return ''
        }

        let year = new Date(date).getFullYear()
        let month = new Date(date).getMonth() + 1
        let day = new Date(date).getDate()

        return year + '-' + month + '-' + day
      },
      dialogConfirm () {
        if (this.dialogType === 'add') {
          let newDialogForm = Object.assign({}, this.dialogForm, {
            id: new Date().getTime(),
            state: '0',
            startValidity:this.momentDate(this.dialogForm.startValidity),
            endValidity:this.momentDate(this.dialogForm.endValidity)
          })
          // 源数据
          //this.allTableData.push(newDialogForm)

          let index = this.allTableData.findIndex(item => {
          	return Number(item.theSorting) === Number(newDialogForm.theSorting)
          })

          if (index >= 0) {
          	this.allTableData.splice(index, 0, newDialogForm)
          } else {
          	// 源数据
          	this.allTableData.push(newDialogForm)
          }

          this.allTableData = this.allTableData.map((item, index) => {
          	return Object.assign({}, item, {
          		theSorting: index + 1
          	})
          })

          this.allTableData = this.allTableData.sort((prev, next) => {
          	return Number(prev.theSorting) - Number(next.theSorting)
          })

          this.search()

          this.$refs.dialogForm.resetFields()

          this.dialogVisible = false
        } else if (this.dialogType === 'set') {
          let index = this.allTableData.findIndex(item => {
            return item.id === this.dialogForm.id
          })

          let newFormData = Object.assign({}, this.dialogForm)

          this.allTableData.splice(index, 1, newFormData)

          this.$refs.dialogForm.resetFields()

          this.dialogVisible = false

          this.search()
          }
      },
      getGoodsStatusLabel (value) {
        let currentObj = this.stateOptions.filter(item => {
          return value === item.value
        })[0]

        return currentObj.label
      },
      handleSizeChange () {},
      handleCurrentChange () {},

    }
  }
</script>

<style lang="scss" scoped>
.user-container {
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
}
.btn{
  margin:10px 20px;
}
.a1{
  padding-top: 10px;
}
.a2{
  padding-top: 10px;
}
</style>
