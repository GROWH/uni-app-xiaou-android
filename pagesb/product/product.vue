<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input @click="_goSearch()" type="text" value="" placeholder="搜索商品" placeholder-class="placeholder" />
		</view>
		<view class="list">
			<view class="row" @click="_goDetail(item.id)" v-for="(item,index) in goods" :key="index">
			<!-- <view class="row"> -->
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>￥{{item.price}}</text>	
					<text>{{item.market_price}}</text>	
				</view>
			</view>
		</view>
		<!-- <view class="api">
			暂无商品数据！
		</view> -->
	</view>
</template>

<script>
import Api from '@/utils/api.js'
	export default {
		data() {
			return {
				id:'',
				page:1,
				goods:[],
				count:0
			}
		},
		onLoad(options){
			// console.log(options)
			// 根据cate_id获取分类下面所有的商品
			this.id=options.id
			this._getGoodsByCateId(1)
			
		},
		// 下拉刷新
		onPullDownRefresh:function(){
			this.page=1
			this._getGoodsByCateId(1)
		},
		// 上拉显示下一页  更多
		onReachBottom:function() {
			// console.log(22344)
			this.page=this.page+1
			if(this.page>this.count){
				uni.showToast({
					title:'没有更多数据了',
					icon:'none'
				})
				return
			}
			
			this._getGoodsByCateId(this.page)
		},
		methods: {
			// 点击搜索框跳转至搜索页面
		_goSearch:function(){
				uni.navigateTo({
					url:'../search/search'
				})
			},
			//进入商品详情
		_goDetail:function(id){
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			},
		_getGoodsByCateId:async function(page){
			uni.showLoading({
				title:'加载中'
			})
			let res = await Api.getGoodsByCateId({
				fid:this.id,
				page:page,
				size:10
			})
			this.count = res.data.list[0]
			// console.log(res)
			if(res.data.list[1]){
				this.goods=this.goods.concat(Api.imgUrl(res.data.list[1]))
			}
			uni.hideLoading()
		},
		}
		
	}
</script>

<style>
	.search{
		margin: 65rpx;
		height: 75rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
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
