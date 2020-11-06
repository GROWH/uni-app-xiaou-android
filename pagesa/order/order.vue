]<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffff" @confirm="search" @input="input" @cancel="cancel"></uni-search-bar>
		<view class="list" v-if="orders.length>0">
			<view class="row" v-for="(item,index) in orders" :key="index">
				<text class="dingdan">订单id:{{item.id}}</text>
				<view class="imagebox" v-for="(item1,index1) in item.child" >
					<image :src="item1.img" mode="widthFix" ></image>
					<view class="goodsname">商品名称:{{item1.goodsname}}</view>
				</view>
				<view class="info">
					<text  space="nbsp">总计{{item.countnumber}}商品  </text>  
					<text>应付金额 ￥:{{item.countmoney}}</text>
				</view>
			</view>
		</view>
		<view class="api" v-else>  
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'; 
	export default {
		components: {uniSearchBar},
		data() {
			return {
				orders:[],
				buffer:true,//页面显示开关,
			}
		},
		onShow(options){
			let token=uni.getStorageSync("token")||""
			if(token==""){
				uni.showToast({
					title:'重新登录',
					icon:'none'
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:'../send/send'
					})
				},2000)
			}
			this._getOrder()
			
		},
	
		methods: {
			_getOrder:async function(){
				let token = uni.getStorageSync("token") || ""
				let uid = uni.getStorageSync("uid") || ""
				
				let res = await Api.getOrder(token,{
					uid
				})
				// console.log(res)
				if(res.data.code==200){
					res.data.list.forEach(item=>{
						item.child = Api.imgUrl(item.child)
					})
					this.orders = res.data.list
				}else if(res.data.code==403){
					uni.showToast({
						title:'请重新登录',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../send/send'
						})
					},2000)
					
				}else{
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
			}
		}
		
	}
</script>

<style>

	.row{
		/* position: relative; */
		margin: 10rpx 20rpx;
		min-height: 240rpx;
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
		padding: 10rpx;
	}
	
	.imagebox{
	/* 	position: absolute;
		top: 10rpx;
		left:10rpx; */
		display: flex;
		align-items: center;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
	}
	.dingdan{
		margin-left: 40rpx;
		font-size: 30rpx;
	}
	.goodsname{
		margin-left: 40rpx;
		font-size: 28rpx;
	}
	.info{
	/* 	position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		width: 340rpx;
		margin: 10rpx 20rpx;
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
