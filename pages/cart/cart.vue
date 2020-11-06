<template>
	<view class="container" v-if="cart.length>0">
		<view class="top">
			<scroll-view v-for="(item,index) in cart" :key="index" class="scroll-view_H" scroll-x="true" :scroll-left="scrollLeft" >
				<view class="cartInfo" id="demo1">
					<!-- 明日来写购物车基本信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" @change="_check($event,index)" :checked="item.checked"  />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="item.img" mode="widthFix"></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label style="font-size: 24rpx; color: #ccc;">规格：不错的商品</label>
							<label style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label @click="_editCart(index,1)">-</label>
								<label>{{item.num}}</label>
								<label @click="_editCart(index,2)">+</label>
							</view>
						</view>
					</view>

				</view>
				<view class="cartDel" id="demo2" @click="_delCart(index)">
					<label for="">删除</label>
				</view>
			</scroll-view>
		</view>
		
		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" @change="_checkAll" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">总计：<label style="color: red;">{{sumPrice}}</label></view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="_goConfirm">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{sumNum}}件)</label>
			</view>
		</view>

	</view>
	<view v-else>
		<image src="/static/kk.jpg" mode="widthFix"></image>
	</view>
</template>

<script>
	import Api from '@/utils/api.js'
	export default {
		data() {
			return {
				scrollLeft: 0, //默认横向滚动 0,
				buffer: true, //检测购物车是否有数据
				cart:[]
			}
		},
		// 页面显示时
		onShow() {
			// 判断是否登录
			let token = uni.getStorageSync("token") || ""
			// 如果token没有的话
			if(token==""){
				uni.showToast({
					title:'请先登录',
					icon:'none'
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:'../../pagesa/send/send'
					})
				},2000)
				return
			}else{
				// 获取用户信息
				this._getCart()
			}
		},
		computed:{
			sumPrice:function(){
				let sum = 0
				this.cart.forEach(item=>{
					if(item.checked){
						sum=sum+item.num*item.price
					}
				})
				return sum
			},
			sumNum:function(){
				let num = 0
				this.cart.forEach(item=>{
					if(item.checked){
						num=num+item.num
					}
				})
				return num
			}
		},
		methods: {
			// 去结算  跳到收货地址页面（收银台页面）
			_goConfirm:function(){
				// 过滤出勾选过的商品
				let goods = this.cart.filter(item=>{
					return item.checked
				})
				// console.log(goods)
				// 判断 如果没有进行勾选 则不能跳转
				if(goods.length==0){
					uni.showToast({
						title:'请选择商品',
						icon:'none'
					})
					return 
				}
				// 将选中的商品存入缓存中
				uni.setStorageSync("cart",goods)
				uni.navigateTo({
					url:'../../pagesa/confirm/confirm'
				})
			},
			// 删除
			_delCart:async function(index){
				let token = uni.getStorageSync("token") || ""
				let res = await Api.delCart(token,{
					id:this.cart[index].id
				})
				
				if(res.data.code==200){
					this.cart.splice(index,1)
				}else if(res.data.code==403){
					uni.showToast({
						title:'请重新登录',
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
			},
			// 修改 加还是减
			_editCart:async function(index,type){
				let token = uni.getStorageSync("token") || ""
				let res = await Api.editCart(token,{
					id:this.cart[index].id,
					type,
				})
				if(res.data.code==200){
					if(type==1){
						if(this.cart[index].num==1){
							return 
						}
							this.cart[index].num--
						
					}
					if(type==2){
						this.cart[index].num++
					}
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
			},
			// 选择单个商品，计算对应的价钱
			_check:function(e,index){
				this.cart[index].checked = e.detail.value
			},
			// 全选控制按钮
			_checkAll:function(e){
				// console.log(e)
				this.cart.forEach(item=>{
					// 全选按钮的状态等于每一个选框（实现全选全不选）
					item.checked = e.detail.value
				
					
				})
				
				
			
			},
		_getCart:async function(){
			let token = uni.getStorageSync("token") || ""
			let uid = uni.getStorageSync("uid") || ""
			let res = await Api.getCart(token,{
				uid
			})
			// console.log(res)
			if(res.data.code==200){
				if(!res.data.list) return
				let cart=Api.imgUrl(res.data.list)
				cart.forEach(item=>{
					item.checked=false
				})
				this.cart = cart
				// console.log(this.cart)
				setTimeout(()=>{
					uni.switchTab({
						url:'../cart/cart'
					})
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
		}
	}
</script>

<style>
	@import url("../../common/css/cart.css");

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
