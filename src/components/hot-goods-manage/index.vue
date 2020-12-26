<template>
	<div class="user-container">
		<el-form ref="searchForm" label-width="80px" :model="formData" inline>
				<el-form-item label="商品名称" prop="goodsName">
				<el-input v-model="formData.goodsName"></el-input>
				</el-form-item>
				<el-form-item label="商品编号" prop="goodsCode">
				<el-input v-model="formData.goodsCode"></el-input>
				</el-form-item>
				<el-button type="primary" @click="fetch">搜索</el-button>
				<el-button type="primary" @click="reset">重置</el-button>
		</el-form>

    <el-button type="primary" @click="openDialog">新增</el-button>
    <el-button type="primary" @click="openUpdateDialog">修改</el-button>
    <el-button type="primary" @click="deleteRows">删除</el-button>

    <div class="a1">
    <el-table :data="tableData" border @selection-change="getRows">
			<el-table-column align="center" type="selection"></el-table-column>
			<el-table-column align="center" label="排序" prop="hotRange"></el-table-column>
			<el-table-column align="center" label="账号" prop="goodsCode"></el-table-column>
			<el-table-column align="center" label="姓名" prop="goodsName"></el-table-column>
			<el-table-column align="center" label="商品价格" prop="goodsPrice"></el-table-column>
			<el-table-column align="center" label="商品介绍" prop="Instroduce"></el-table-column>
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
          <el-col :span="24">
            <el-form-item label="商品" prop="goodsName">
              <el-input v-model="dialogForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="热门位排序" prop="hotRange">
              <el-input v-model="dialogForm.hotRange"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

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
      formData: {
        goodsName: '',
        goodsCode: ''
      },
      dialogForm: {
				goodsName: '',
				hotRange: ''
      },
      pageInfo: {
				pageIndex: 1,
				pageSize: 5,
				total: 0
      },
      allTableData: [],
      tableData: [],
      currentRows: [],
      dialogType: ''
    }
  },
  methods: {
    fetch () {
      this.pageInfo.pageIndex = 1

      this.search()
    },
    search () {
      this.tableData = this.allTableData.filter(item => {
        return item.goodsName.includes(this.formData.goodsName) && item.goodsCode.includes(this.formData.goodsCode)
      }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)

      this.pageInfo.total = this.allTableData.length
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
      if (this.currentRows.length === 0) {
        this.$message({
          type: 'error',
          message: '请勾选要修改的数据'
        })

        return
			}

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
        let indexList = this.currentRows.map(item => {
          return item.id
        })

        indexList.forEach(indexItem => {
          //console.log(indexItem)
          let currentIndex = this.allTableData.findIndex(item => {
            return item.id === indexItem
          })

          //console.log('currentIndex', currentIndex)
          this.allTableData.splice(currentIndex, 1)
        })

        this.search()
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
        let newDialogForm = Object.assign({}, this.dialogForm, {
					id: new Date().getTime(),
					goodsCode: new Date().getTime().toString(),
					goodsPrice: parseFloat(Math.random() * 100).toFixed(2),
					Instroduce: '这是一段简单的商品介绍'
        })
				let index=this.allTableData.findIndex(item=>{
					return Number(item.hotRange)===Number(item.hotRange)
				})
				if (index>=0){
					this.allTableData.splice(index,0,newDialogForm)

				}else{
					this.allTableData.push(newDialogForm)
				}
        // 源数据
        this.allTableData=this.allTableData.map((item,index)=>{
					return Object.assign({},item,{
						hotRange:index+1
					})
				})

				//console.log(this.allTableData)
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
        //console.log(index)
      }
    },
    handleSizeChange (val) {
			//console.log(val)
			this.pageInfo.pageSize = val
      this.search()
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
  padding-top: 20px;
}
.a2{
  padding-top: 10px;
}
</style>
