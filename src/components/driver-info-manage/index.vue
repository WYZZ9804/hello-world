<template>
	<div>
		<h1>{{$store.state.msgList}}</h1>

		<input v-model="inpValue" type="text">
		<button @click="handlerArr">push</button>

		<ul>
			<li v-for="(item, index) in arr" :key="index">
				{{item}}
				<button @click="deleteItem(index)">delete</button>
			</li>
		</ul>

		<ul class="page-info">
			<li
				v-for="(item) in Math.ceil($store.state.msgList.length/this.pageSize)"
				:key="item"
				@click="handlerPageIndex(item)"
				:class="{active: pageIndex === item}">
					{{item}}
			</li>
		</ul>

		<button @click="handlerPageSize">click</button>

		<el-button @click="changeStore">修改store数据</el-button>
	</div>
</template>

<script>

export default {
	data () {
		return {

			allArr: [],
			inpValue: '',
			activeVisible: true,
			pageIndex: 1,
			pageSize: 3
		}
	},
	computed: {
		arr () {
			// this.allArr  this.pageIndex  this.pageSize
			// 所有已定义的变量变动都会重新触发计算属性的计算
			return this.$store.state.msgList.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
		}
	},
	methods: {
		changeStore () {
			this.$store.commit('increment')
		},
		handlerArr () {
			// 将input的值添加到arr中
			// this.$store.state.msgList.push(this.inpValue)
			this.$store.commit('handlerMsgList', this.inpValue)
			// 清空input的值
			this.inpValue = ''
		},
		deleteItem (index) {
			// this.allArr.splice(index, 1)
			this.$store.commit('deleteMsgList', index)
		},
		changeActive () {
			this.activeVisible = !this.activeVisible
		},
		handlerPageIndex (currentIndex) {
			// console.log(currentIndex)
			this.pageIndex = currentIndex

			// console.log(this.pageIndex)

			// this.arr = this.allArr.slice((this.pageIndex - 1) * 3, this.pageIndex * 3)
		},
		handlerPageSize () {
			this.pageSize = this.pageSize + 1
		}
		// handlerArr () {
		// 	this.arr.push(Math.random() * 100)
		// },
		// handlerInpValue () {
		// 	this.inpValue = this.inpValue + Math.random() * 10
		// },
		// btnClick () {
		// 	// console.log(this)
		// 	// console.log(123)
		// 	console.log(this.test)
		// 	console.log(this.titleVal)
		// }
	}
}
</script>

<style lang="scss" scoped>
.active {
	color: red;
	font-size: 20px;
}

.page-info {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;

	li {
		width: 40px;
		height: 40px;
		background: #ddd;
		text-align: center;
		line-height: 40px;
		margin: 0 5px;
	}

	li.active {
		color: #fff;
		background: red;
	}
}
</style>
