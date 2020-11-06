<template>
	<view>
		<uniSearchBar  :radius="100" bgColor="#ffff" @confirm="_search()" @input="_input($event)"></uniSearchBar>
		<view class="list" v-if="goods.length>0">
			<view class="row" v-for="(item,index) in goods" :key="index" @click="_goDetail(item.id)">
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>￥{{item.price}}</text>	
					<text>￥{{item.market_price}}</text>	 
				</view>
			</view>
		</view>
		<view class="api" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import Api from "@/utils/api.js"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	export default {
		components: {uniSearchBar},
		data() {
			return {
				keyword:',',
				goods:[]
			}
		},
		onLoad(options){
			
		},
	
		methods: {
			// 跳转到详情页面
			_goDetail:function(id){
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			},
			
			// 获取输入框的值
			_input:function(e){
				// console.log(e)
				this.keyword=e.value
			},
			// 搜索框点击搜索
			_search:async function(){
				if(this.keyword==''){
					uni.showToast({
						title:'关键字不能为空',
						icon:'none'
					})
					return 
				}
				uni.showLoading({
					title:'加载中'
				})
				let res = await Api.search({
					keywords:this.keyword
				})
				// console.log(res)
				if(res.data.code==200){
					this.goods=Api.imgUrl(res.data.list)
				}else{
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
				uni.hideLoading()
			},
		},
		
	}
</script>

<style>

	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.api{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
