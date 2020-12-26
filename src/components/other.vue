<template>
	<div>
		<!-- <el-table :data="tableData" border @selection-change="getRows">
			<el-table-column align="center" type="selection"></el-table-column>
			<el-table-column align="center" label="姓名" prop="name"></el-table-column>
			<el-table-column align="center" label="年龄" prop="age"></el-table-column>
			<el-table-column align="center" label="身高" prop="height"></el-table-column>
			<el-table-column align="center" label="体重" prop="weight"></el-table-column>
			<el-table-column align="center" label="性别" prop="sex"></el-table-column>
		</el-table> -->
		
		<!-- <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageInfo.pageIndex"
		      :page-sizes="[5, 10, 15, 20]"
		      :page-size="pageInfo.pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="pageInfo.total">
		    </el-pagination> -->
			
			<el-button @click="openDialog">打开dialog框</el-button>
			
			<el-dialog 
			 title="这是我的dialog框"
			 width="80%" :visible.sync="dialogVisible">
			 
				<el-row>
					<el-col :span="6">123</el-col>
					<el-col :span="6" :offset="12">123</el-col>
					
				</el-row>
			 
				<span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取消</el-button>
				    <el-button type="primary" @click="dialogVisible = false">确定</el-button>
				  </span>
				  
			 </el-dialog>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				dialogVisible:false,
				// pageInfo:{
					
				// 	pageIndex:1,
				// 	pageSize:5,
				// 	total:15
				// },
				// tableData:[
				// 	{name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
				// 	{name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
				// 	{name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
				// 	{name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
				// 	{name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
				// 	{name:'tom1',age:'10',height:'170',weight:'100',sex:'男'}
				// ]
			}
		},
		methods: {
			openDialog () {
				this.dialogVisible = true
			},
			// getRows (rows) {
			// 	console.log(rows)
			// },
			// handleSizeChange (val) {
			// 	console.log('每页'+val+'条数据')
			// },
			// handleCurrentChange (val) {
			// 	console.log('当前是第'+val+'页')
			// }
		}
	}
</script>

<style>
</style>
