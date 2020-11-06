<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<!-- v-model双向数据绑定小程序不支持多层  -->
			<input @input="_inputPhone($event)" type="text" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="_sendMsg()">{{send.msg}}</text>
			</view>
			<input @input="_inputCode($event)" type="text" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<button :disabled="!isLogin" @click="_login()" type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view>
	</view>
</template>
 
<script>
     import Api from '@/utils/api.js'
	export default {
		data() {
			return {
				send:{
					msg:"获取验证码",
					// 状态值  判断是否在倒计时期间 0代表没有倒计时
					status:0
				},
				// 手机号  
				phone:{
					value:'',
					check:false,
				},
				// 验证码
				code:{
					value:'',
					check:false
				},
			}
			
		},
		onLoad() {
			
		},
		computed:{
			// 当手机号码和验证码都正确时 登录按钮才可以点击 否则就是disabled
			isLogin:function(){
				return this.phone.check && this.code.check
			}
		},
		methods: {
			// 登录
			_login:async function(){
				let res = await Api.login({
					phone:this.phone.value
				})
				// console.log(res)
				// 登录成功后会返回一个token值
				if(res.data.code==200){
					// 将token , uid ,存起来
					uni.setStorageSync("token",res.data.list.token)
					uni.setStorageSync("uid",res.data.list.uid)
					uni.setStorageSync("phone",res.data.list.phone)
					// 跳转  返回到上一页
					uni.navigateBack({
						delta:1
					})
				}else{
					uni.showToast({
						title:'网络开小差了',
						icon:'none'
					})
				}
				
			},
			// 一边输入 一边检测验证码是否正确
			_inputCode:function(e){
				this.code.value = e.detail.value
				// 如果用户输入为空
				if(this.code.value==""){
					this.code.check==false
					return 
				}
				// 如果用户输入和缓存中的值不一致
				let code = uni.getStorageSync("code") || ""
				if(this.code.value!=code){
					this.code.check==false
					return
				}
				this.code.check=true
			},
			// 获取输入框的电话
			_inputPhone:function(e){
				// console.log(e)
				// 获取值
				this.phone.value=e.detail.value
				// 正则表达式
				let reg =/^1[3456789]\d{9}$/
				// 还应该验证手机号码唯一性，判断是否注册过，这里没有判断
				// 匹配成功
				if(reg.test(this.phone.value)){
					// 检查通过
					this.phone.check=true
				}else{
					this.phone.check=true
				}
			},
			// 发送验证码
			_sendMsg:async function(){
				// 1代表正在倒计时中，不能再次点击 
				if(this.send.status==1)  return 
				if(this.phone.check){
					// 发送短信，调取接口
					this.send.status=1
					let res = await Api.sendMsg({
						phone:this.phone.value,
					})
					// console.log(res)
					if(res.data.code==200){
						// 1--把验证码存起来
						uni.setStorageSync("code",res.data.list.code)
						// 开始60s倒计时
						let s = 60
						let timer = setInterval(()=>{
							if(s<=1){
								clearInterval(timer)
								this.send.msg="获取验证码"
								s=60
								this.send.status=0
								// 2---倒计时结束，验证码失效
								uni.removeStorageSync("code")
								return 
							}
							s--;
							this.send.msg="重新发送("+s+")"
						},1000)
					}else{
						uni.showToast({
							title:'网络开小差了',
							icon:'none'
						})
					}	
				}else{
					uni.showToast({
						title:'手机格式不正确',
						icon:'none'
					})
				}
			},
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	
</style>
