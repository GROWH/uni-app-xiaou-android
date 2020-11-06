<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="goods.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{goods.goodsname || ""}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{goods.price || 0}}</label>
			</view>			
		</view>
		
		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>市场价：<label class="manjian">{{goods.market_price}}</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
				  <label class="jian" @click="_decr()">-</label>
				  <label class="zhi">{{number}}</label>
				  <label class="jia" @click="_incr()">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label></label>
					<view class="bg" >{{goods.specsattr}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		 <view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<rich-text :nodes="goods.description"></rich-text>
		</view>
		
		<view class="productEval">
			<!-- 商品评价 无接口 死数据 -->
			<view class="eval">商品评价</view>  
			<view v-for="(item,index) in evals" :key="index">
				<label class="evalUsername">{{item.name}}</label>
				<label class="evalUsertitle">{{item.title}}</label>					
				<view class="evalImage">
					<image v-for="(i,ind) in item.img" :key="ind" :src="i">
				</view>
				<label class="evalTime">{{item.time}}</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="_addCart()">加入购物车</button>
			<button class="footbtn2" @click="_goOrder()">立即购买</button>
		</view>
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	export default {
		data() {
			return {
				bg:'threed3i1',//商品属性背景色
				productDetailImage:{
					detailImage:"../../static/detail/2.jpg"
				},
				evals: [{  //评价内容
					name: '小李白',
					title: '效果很好，物流到位，下次继续来',
				}],
				number:1,
				goods:{},
		
			}
		},
		onLoad: function (options) {
			this._getGoodsById(options.id)
		},
		onShow(){
			
		},
		
		methods: {
			// 添加购物车
			_addCart:async function(){
				// 先判断用户用没有登录
				let token=uni.getStorageSync("token") || ""
				if(token==""){
					uni.showToast({
						title:'请先登录'
					})
					setTimeout(()=>{
						// #ifdef MP-WEIXIN
							uni.navigateTo({
								// 小程序端判断登录还没有写
								url:'../../pagesa/login/login'
							})
			
						// #endif
						// #ifndef MP-WEIXIN
							uni.navigateTo({
								// 已经写了
								url:'../../pagesa/send/send'
							})
						// #endif
						
					},2000)
				}else{
					// console.log('调用加入购物车的接口')
					let uid = uni.getStorageSync("uid")
					let token = uni.getStorageSync("token")
					let res = await Api.addCart(token,{
						uid:uid,
						goodsid:this.goods.id,
						num:this.number
					})
					// console.log(res)
					if(res.data.code==200){
						uni.showToast({
							title:'添加成功',
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'../../pages/cart/cart'
							})
							// ../cart/cart
						},2000)
					}else if(res.data.code==403){
						uni.showToast({
							title:'登录已过期，请重新登录'
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'../../pagesa/send/send'
							})
					
						},2000)
						
					}else{
						uni.showToast({
							title:'网络开小差了',
							icon:'none'
						})
					}	
				}
			}, 
			// 减
			_decr:function(){
				if(this.number==1){
					return 
				}
				this.number=this.number-1
			},
			// 加
			_incr:function(){
				this.number=this.number+1
			},
			_getGoodsById:async function(id){
				uni.showLoading({
					title:'加载中'
				})
				let res = await Api.getGoodsById({id})
				// console.log(res)
				if(res.data.code==200){
					this.goods=Api.imgUrl(res.data.list)[0]
				}else{
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
				uni.hideLoading()
			},
			
		}
		
	}
</script>

<style>
	@import url("../../common/css/details.css");
</style>
