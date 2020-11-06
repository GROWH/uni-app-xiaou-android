<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{ information.name }}</label>	
				<label for="">{{ information.phone }}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{ information.address }}</label>
			</view>
		</view>
		
		<!-- 商品信息 -->
		<view class="carts">
			<view class="cartsInfo" v-for="(item,index) in goods" :key="index">
				<!-- 70px -->
				<view class="carts_detail"> 
					<image :src="item.img" mode="widthFix" style="width:500rpx;"></image>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:不错的商品</view>
					</view>
					<view class="carts_price">
						<label for="">￥{{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" >-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" >+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>			
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>
		
		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use" >
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分"/>
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>
		
		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{sumPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{sumPrice}}</label>
		</view>
		
		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="_order">提交订单</button>
		</view>
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	export default {
		data() {
			return {
				information: {
					name: '赵欢',
					phone: '17691058102',
					address: '陕西省西安市未央区未央路未央街道未央大厦A'
				},
				goods:[]
			}
		},
		onLoad(option){
			this._getGoods()
		},
		computed:{
			sumPrice:function(){
				let sum = 0
				this.goods.forEach(item=>{
					sum =sum+item.num*item.price
				})
				return sum 
			},
			sumNum:function(){
				let sum = 0
				this.goods.forEach(item=>{
					sum =sum+item.num
				})
				return sum 
			}
		},
		methods: {
			_getGoods:function(){
				let goods = uni.getStorageSync("cart") || []
				if(goods.length==0){
					uni.showToast({
						title:'请选择商品',
						icon:'none'
					})
					uni.navigateBack({
						delta:1
					})
					return 
				}
				// 调用接口检查要结算商品的库存是否充足，还有价格
				this.goods=goods
			},
			_order:async function(){
				// 判断是否登录
				let token = uni.getStorageSync("token") || ""
				let cart = uni.getStorageSync("cart") || ""
				let ids = cart.map(item=>{
					return item.id
				})
				//调用订单的接口
				
				let res = await Api.order(token,{
					idstr:ids.join(","),
					params:{
						uid:uni.getStorageSync("uid")||"",
						username:this.information.name,
						userphone:this.information.phone,
						address:this.information.address,
						countmoney:this.sumPrice,
						countnumber:this.sumNum,
						addtime:Api.dateFormat(),
					}
				})
				// console.log(res)
				if(res.data.code==200){
				//跳转到支付页面,个人没有办法做
				//跳转个人中心
					uni.switchTab({
						url:'../../pages/mine/mine'
					})
				}else if(res.data.code==403){
					uni.showToast({
						title:'重新登录',
						icon:'none'
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
		}
		
	}
</script>

<style>
	@import url("../../common/css/confirm.css");
</style>
