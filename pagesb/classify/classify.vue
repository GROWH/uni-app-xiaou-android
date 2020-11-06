<template>
	<view class="container">
		<!-- left左侧一级分类列表 -->
		<scroll-view scroll-y class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" @click="_switchTab(index)" :class="activeIndex == index ? 'activeList' : ''" v-for="(item,index) in cate" :key="index" >
				<label for="">{{ item.catename }}</label>
			</view>
		</scroll-view>
		<!-- right右侧二级分类详情 -->
		<scroll-view scroll-y class="right">
			<view class="row">
				<view @click="_goCateList(item.id)" class="row_list" v-for="(item,index) in sonCate" :key="index">
					<image :src="item.img" mode="widthFix"></image>
					<text>{{item.catename}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	export default {
		data(){
			return {
				activeIndex:0,
				cate:[]
				
			}
		},
		onLoad() {
			this._getCates()
		},
		computed:{
			// 二级分类使用计算属性
			sonCate:function(){
				let index = this.activeIndex
				if(this.cate[index]){
					return Api.imgUrl(this.cate[index].children ||[])
				}else{
					return []
				}
				
			}
		},
		methods:{
			_goCateList:function(id){
				uni.navigateTo({
					url:'../product/product?id='+id
				})
			},
			_switchTab:function(index){
				this.activeIndex=index
			},
			
			_getCates:async function(){
				let res = await Api.getCates()
				// console.log(res)
				if(res.data.code==200){
					this.cate=res.data.list
				}
				if(res.data.code==500){
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
			},
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
