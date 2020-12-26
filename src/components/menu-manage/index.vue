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
          <ul>
            <li
              :class="{active: currentMenuIndex === index}"
              :style="{color: item.isMenu === '0' ? 'red' : '#000'}"
              v-for="(item, index) in menuList"
              @click="handlerCurrentMenu(index)"
              :key="index">
                {{item.menuName}}
              </li>
          </ul>
        </div>
      </div>
      <div class="menu-box-right">
        <div class="header">菜单详情</div>

        <div class="form-content">
          <el-row>
            <el-form :model="formData" ref="formData" label-width="80px">
              <el-col :span="12">
                <el-form-item label="菜单名称" prop="menuName">
                  <el-input v-model="formData.menuName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="菜单路由" prop="menuPath">
                  <el-input v-model="formData.menuPath" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否菜单" prop="isMenu">
                  <el-select v-model="formData.isMenu">
                    <el-option label="菜单" value="1"></el-option>
                    <el-option label="目录" value="0"></el-option>
                  </el-select>
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
    <!-- {{menuList}}
    当前下标：{{currentMenuIndex}} -->
    <el-dialog
      title="新增菜单"
      :visible.sync="dialogVisible"
      width="50%">

      <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
        <el-form-item label="名称" prop="menuName">
          <el-input v-model="dialogForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单路由" prop="menuPath">
          <el-input v-model="dialogForm.menuPath"></el-input>
        </el-form-item>
        <el-form-item label="是否菜单" prop="isMenu">
          <el-select v-model="dialogForm.isMenu">
            <el-option label="菜单" value="1"></el-option>
            <el-option label="目录" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dialogForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>

      <!-- {{dialogForm}} -->
    </el-dialog>
	</div>
</template>

<script>

export default {
	data () {
    return {
      dialogVisible: false,
      formData: {},
      dialogForm: {},
      menuList: [
        {menuName: '测试菜单', menuPath: '/path', isMenu: '0', remark: '测试备注'}
      ],
      currentMenuIndex: -1
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    dialogConfirm () {
      let newDialogFrom = Object.assign({}, this.dialogForm)
      this.menuList.push(newDialogFrom)

      this.$refs.dialogForm.resetFields()

      this.dialogVisible = false
    },
    deleteMenu () {
      if (this.currentMenuIndex < 0) {
        this.$message({
          type: 'error',
          message: '请选择需要删除的菜单'
        })

        return
      }

      this.$confirm('是否要删除当前选中的菜单').then(() => {


        this.menuList.splice(this.currentMenuIndex, 1)
        this.$refs.formData.resetFields()
        this.currentMenuIndex = -1
      })
    },
    updateMenu () {
      this.$set(this.menuList, this.currentMenuIndex, this.formData)

      // this.menuList.splice(this.currentMenuIndex, 1, this.formData)
      // this.menuList[this.currentMenuIndex] = this.formData

      console.log(this.menuList)
    },
    handlerCurrentMenu (index) {
      this.currentMenuIndex = index

      this.formData = Object.assign({}, this.menuList[index])
    }
  },
  computed: {

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
