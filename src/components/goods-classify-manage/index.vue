<template>
	<div>
    <div class="menu-box">
      <div class="menu-box-left">
        <div class="header">
          <el-button type="primary" @click="openDialog">新增</el-button>
          <el-button type="primary" @click="updateMenu">修改</el-button>
          <el-button type="primary" @click="deleteMenu">删除</el-button>
          <el-button type="primary">刷新</el-button>
        </div>

        <div class="list-content">
            <el-tree
							:expand-on-click-node="false"
							:data="treeData"
							:props="defaultProps"
							@node-click="handleNodeClick">
						</el-tree>
        </div>
      </div>
      <div class="menu-box-right">
        <div class="header">菜单详情</div>

        <div class="form-content">
          <el-row>
            <el-form :model="formData" ref="formData" label-width="80px">
              <el-col :span="12">
                <el-form-item label="分类名称" prop="label">
                  <el-input v-model="formData.label" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="formData.remark" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog
      title="新增菜单"
      :visible.sync="dialogVisible"
      width="50%">

      <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
        <el-form-item label="名称" prop="classifyName">
          <el-input v-model="dialogForm.classifyName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dialogForm.remark"></el-input>
        </el-form-item>
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
			treeData: [
				{label: '一级1-1', id: '1', children: [{label: '一级1-2', id: '1-2', children: []}]},
				{label: '二级2-1', id: '2', children: [{label: '二级2-2', id: '2-2', children: []}]},
				{label: '三级3-1', id: '3', children: [{label: '三级3-2', id: '3-2', children: []}]}
			],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
      dialogVisible: false,
      formData: {},
      dialogForm: {
				classifyName: '',
				remark: ''
			},
			currentData: {},
			currentNode: {}
    }
  },
  methods: {
		// 点击节点方法
		handleNodeClick (data, node) {
			this.currentData = data
			this.currentNode = node

			this.formData = Object.assign({}, data)
		},
    openDialog () {
			if (!Object.keys(this.currentData).length) {
				this.$message({
					type: 'error',
					message: '请先勾选父级节点'
				})

				return
			}

      this.dialogVisible = true
    },
    dialogConfirm () {
			let newDialogFrom = Object.assign({}, this.dialogForm, {
				label: this.dialogForm.classifyName,
				id: new Date().getTime().toString(),
				children: []
			})

			this.currentData.children.push(newDialogFrom)
			this.$refs.dialogForm.resetFields()
			this.currentData = {}
			this.dialogVisible = false

			this.$message({
				type: 'success',
				message: '新增成功'
			})
    },
    deleteMenu () {
			if (!Object.keys(this.currentData).length) {
				this.$message({
					type: 'error',
					message: '请先勾选要删除的节点'
				})

				return
			}

			if (this.currentNode.level === 1) {
				this.$message({
					type: 'error',
					message: '该节点为根节点，不允许被删除'
				})

				return
			}

			this.$confirm('确定要删除该节点吗').then(() => {
				let index = this.currentNode.parent.data.children.findIndex(item => {
					return item.id === this.currentNode.data.id
				})
	
				this.currentNode.parent.data.children.splice(index, 1)
	
				this.currentNode = {}

				this.$refs.formData.resetFields()
			})
    },
    updateMenu () {
      // this.$set(this.menuList, this.currentMenuIndex, this.formData)
      // this.menuList.splice(this.currentMenuIndex, 1, this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-box {
  display: flex;
  padding: 20px;

  .menu-box-left {
    width: 400px;
    height: 500px;
    border: 1px solid #ddd;

    .header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ddd;
      padding-left: 20px;
      box-sizing: border-box;
    }

    .list-content {
      ul {
        list-style: none;
        height: 40px;
        line-height: 40px;
        padding: 5px 10px;
        margin: 0;

        li {
          cursor: pointer;
          padding-left: 10px;
        }

        li:hover {
          color: #409EFF;
          background: rgb(236, 245, 255);
        }

        li.active {
          color: #409EFF !important;
          background: rgb(236, 245, 255);
        }
      }
    }
  }

  .menu-box-right {
    width: 500px;
    height: 500px;
    border: 1px solid #ddd;

    .header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ddd;
      padding-left: 20px;
      box-sizing: border-box;
    }

    .form-content {
      padding: 10px;
    }
  }
}
</style>