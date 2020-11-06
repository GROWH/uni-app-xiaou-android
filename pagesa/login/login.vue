<template>
	<view class="box">
		<!-- logo -->
		<image class="logo" mode="widthFix" src="../../static/index/logo.jpg" alt="" />
		<view class="login" hover-class="change">
			<!-- 注意个人开发者不允许获取用户的手机号 -->
			<button type="default" style="background-color: orangered;color: white;width: 100%;" open-type="getUserInfo"
			 @getuserinfo="_getUserInfo">微信用户一键登录</button>
			<text  @click="send">手机号验证注册/登录</text>
		</view>
		<view class="foot">
			<text>我已阅读并同意
				<text class="bikan"> 服务协议 </text>及
				<text class="bikan"> 隐私政策 </text>
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {},
		methods: {
			// 获取用户信息
			_getUserInfo:function(e){
				// 1---通过wx.login() 获得微信openid
				// 2---调用后台给我们的接口，也能获取到一个token值
				// 3---将token存起来
			},
			send() {
				uni.navigateTo({
					url: '../send/send'
				})
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.logo {
		width: 240rpx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 200rpx auto;
	}

	.login {
		position: absolute;
		margin: 40rpx;
		top: 350rpx;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		/* 		border: 1rpx solid red; */

	}

	.login text {
		color: #006699;
		font-size: 25rpx;
		margin-top: 30rpx;
	}

	.foot {
		position: fixed;
		bottom: 50rpx;
		left: 0;
		right: 0;
		text-align: center;
		font-size: 25rpx;
	}

	.bikan {
		color: #006699;
	}
</style>
